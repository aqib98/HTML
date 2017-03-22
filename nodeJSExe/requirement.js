function removeduplicates(arr) {
  var uniqarr = [];
  for (var i=0; i< arr.length; i++) {
    if(uniqarr.indexOf(arr[i]) == -1) {
      uniqarr.push(arr[i]);
    }
  }
  return uniqarr;
}

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({  
 input: fs.createReadStream('India2011.csv')
});

var arrayOfLines=[];


rl.on('line', (line) => {
arrayOfLines.push(line);

});

literates=[];
ages=[];

rl.on('close', function(){

tempArr=arrayOfLines[0].split(",");
ageIndex=0;
totalIndex=0;
for(j=0;j<tempArr.length;j++)
    {
        if(tempArr[j]==='Age-group')
        {
            ageIndex=j;
        }
        if(tempArr[j]==='Literate - Persons')
        {
            totalIndex=j;

        }
        if(tempArr[j]==='Area Name')
        {
            areaIndex=j;
        }
        if(tempArr[j]==='Educational level - Graduate & above - Males')
        {
            maleGradIndex=j;
        }
        if(tempArr[j]==='Educational level - Graduate & above - Females')
        {
            femaleGradIndex=j;
        }
        if(tempArr[j]==='Educational level - Literate without educational level - Persons')
        {
            eduLitIndex=j;
        }
        

    }
//console.log("here: "+ ageIndex+" here: "+totalIndex);

for(let i=1;i<arrayOfLines.length;i++)
{
    tempArr=arrayOfLines[i].split(",");
    if(tempArr[ageIndex]!=='All ages')
    ages.push(tempArr[ageIndex]);
}

ages=removeduplicates(ages);

    for(let j=0;j<ages.length;j++)
    {
        literates[j]=0;
        for(let i=1;i<arrayOfLines.length;i++)
        {
            tempArr=arrayOfLines[i].split(",");
            if(ages[j]===tempArr[ageIndex])
            {
                literates[j]=parseInt(literates[j])+parseInt(tempArr[totalIndex]);
            }
        }
    }    
    resultArr=[];

    for(i=0;i<ages.length;i++)
    {    
        resultArr[i]={};

        resultArr[i].age=ages[i];
        resultArr[i].literacy=literates[i];
    }
    
var resultStr = JSON.stringify(resultArr);
fs.writeFileSync('jsonFile.json',resultStr);
console.log("Copied to JSON file");

//second requirement

states=[];
malegrad=[];
femalegrad=[];
for(let i=1;i<arrayOfLines.length;i++)
{
    tempArr=arrayOfLines[i].split(",");
    str=tempArr[areaIndex];
    str2=str.slice(8,str.length);
    states.push(str2);
}
states=removeduplicates(states);
for(let j=0;j<states.length;j++)
    {
        malegrad[j]=0;
        femalegrad[j]=0;
        for(let i=1;i<arrayOfLines.length;i++)
        {
            tempArr=arrayOfLines[i].split(",");
            stri=tempArr[areaIndex];
            stri2=stri.slice(8,stri.length);

            if(states[j]===stri2)
            {
                malegrad[j]=parseInt(malegrad[j])+parseInt(tempArr[maleGradIndex]);
                femalegrad[j]=parseInt(femalegrad[j])+parseInt(tempArr[femaleGradIndex]);
            }
        }
    }    

    resultArr=[];

    for(i=0;i<states.length;i++)
    {    
        resultArr[i]={};

        resultArr[i].state=states[i];
        resultArr[i].malegrad=malegrad[i];
        resultArr[i].femalegrad=femalegrad[i];
    }
    
var resultStr = JSON.stringify(resultArr);
fs.writeFileSync('jsonFile2.json',resultStr);
console.log("Copied to JSON file");

//third requirement

edulevel=[];
totalpop=[];
for(let i=0;i<10;i++)
{
    totalpop[i]=0;
}
tempArr=arrayOfLines[0].split(",");
j=0;
for(i=eduLitIndex;i<tempArr.length;i+=3)
{

    str=tempArr[i];
    str2=str.slice(20,str.length);

    edulevel[j]=str2;
    j++;
}
for(j=0,k=eduLitIndex;j<edulevel.length,k<tempArr.length;j++,k+=3)
{
    count=0;
    for(i=1;i<arrayOfLines.length;i++)
    {    
        tempArr=arrayOfLines[i].split(",");
        totalpop[j]=totalpop[j]+parseInt(tempArr[k]);    
    }
}
    resultArr=[];
    for(i=0;i<edulevel.length;i++)
    {    
        resultArr[i]={};
        resultArr[i].educlevel=edulevel[i].substring(0,edulevel[i].lastIndexOf('-'));
        resultArr[i].totalpops=totalpop[i];
    }
var resultStr = JSON.stringify(resultArr);
fs.writeFileSync('jsonFile3.json',resultStr);
console.log("Copied to JSON file");

});