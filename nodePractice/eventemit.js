/*Getting eachline at a time from the file 'India2011' located at the disc or external server
 *using event emitters: readline('readline') and filesystem('fs')*/

const readLine = require('readline');
const fileSystem = require('fs');
const readEachLine = readLine.createInterface({
    input: fileSystem.createReadStream('India2011.csv')
});

/*Declaring necessary Map objects and variables required*/

let ageWise = new Map();
let stateWise = new Map();
let literacyWise = new Map();

let indexAge, indexLiteracy, indexState, indexMaleGrad, indexFemaleGrad, maleGrad, femaleGrad;

let flag = true;

let headerArray = [];

let lineArray = [];

/* Registering the listener for 'line' event on event emitter readEachLine*/

readEachLine.on('line',(line)=> {
    if (true === flag) {
        let initialValue = 0;
        headerArray = line.split(',');
        indexAge = headerArray.indexOf('Age-group');
        indexLiteracy = headerArray.indexOf('Literate - Persons');
        indexState = headerArray.indexOf('Area Name');
        indexMaleGrad = headerArray.indexOf('Literate - Males');
        indexFemaleGrad = headerArray.indexOf('Literate - Females');
        for (let value in headerArray) {
            if (headerArray[value].startsWith('Educational level') && headerArray[value].endsWith('Persons')) {
                literacyWise.set(headerArray[value], initialValue);
            }
        }
        flag = false;
    } else {
        lineArray = line.split(',');
        if ('All ages' === lineArray[indexAge]) {
            let state = lineArray[indexState];
            if (stateWise.has(state)) {
                let stateWiseDetails = stateWise.get(state);
                stateWiseDetails.maleGrad = parseInt(stateWiseDetails.maleGrad) + parseInt(lineArray[indexMaleGrad]);
                stateWiseDetails.femaleGrad = parseInt(stateWiseDetails.femaleGrad) + parseInt(lineArray[indexFemaleGrad]);
                stateWise.set(state, stateWiseDetails);
            } else {
                let stateWiseDetails = {};
                stateWiseDetails.state = lineArray[indexState];
                stateWiseDetails.maleGrad = lineArray[indexMaleGrad];
                stateWiseDetails.femaleGrad = lineArray[indexFemaleGrad];
                stateWise.set(state, stateWiseDetails);
            }
            literacyWise.forEach(function(value, key, map) {
                this.key = key;
                this.value = value;
                for (let each in lineArray) {
                    if (parseInt(each) === headerArray.indexOf(key)) {

                        value = value + parseInt(lineArray[each]);
                        literacyWise.set(key, value);
                    }
                }
            });
        } else {

            let key = lineArray[indexAge];
            let value = lineArray[indexLiteracy];

            if (ageWise.has(key)) {
                let presentValue = ageWise.get(key);
                presentValue = parseInt(presentValue) + parseInt(lineArray[indexLiteracy]);

                ageWise.set(key, presentValue);

            } else {
                ageWise.set(key, value);

            }
        }
    }
});


/* Registering the listener for 'close' event on event emitter readEachLine*/

readEachLine.on('close', ()=> {
	let ageResultString, stateResultString, literacyResultString;

	let ageWiseArray = [];
	let stateWiseArray = []; 
	let literacyWiseArray = [];

	ageWise.forEach(function(value,key,map){
		let ageObect = {};
		ageObect.age = key;
		ageObect.literacy = ageWise.get(key); 
		ageWiseArray.push(ageObect);
	});
	//add a function idiot!!!!!!!!!

	ageResultString = JSON.stringify(ageWiseArray);
	fileSystem.writeFileSync('age.json',ageResultString);
	console.log("Copied to JSON file");

	stateWise.forEach(function(value,key,map){
		stateWiseArray.push(stateWise.get(key));
	});

	stateResultString = JSON.stringify(stateWiseArray);
	fileSystem.writeFileSync('state.json',stateResultString);
	console.log("Copied to JSON file");

	literacyWise.forEach(function(value,key,map){
		let literacyObject = {};
		literacyObject.educlevel = key;
		literacyObject.totalpops = literacyWise.get(key); 
		literacyWiseArray.push(literacyObject);
	});

	literacyResultString = JSON.stringify(literacyWiseArray);
	fileSystem.writeFileSync('literacy.json',literacyResultString);
	console.log("Copied to JSON file");
});
