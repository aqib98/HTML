
Array.matrix = function(m, n, initial) {
    var a, i, j, mat = [];

    for (i = 1; i <= m; i += 1) {
        a = [];
        for (j = 1; j <= n; j += 1) {
            a[j] = initial;
        }

        mat[i] = a;
    }
    return mat;

}


function gimmeNum(num)
{
	if(num%2!=0)
	{
		if(num==1){
		   return 'Dont be a miser';
		}
		else{
			return odd(Array.matrix(num,num,0),num,1);
		}

	}
	else 
	{
		if(num==2){
			return 'just one thing where magic cant happen';
		}
		else if(num%4==0){
			return doublyE(num);
		}
		
		else{
			return singlyE(num);
		}

	}
}

console.log(gimmeNum(3)); //give any number here except 1 and 2 and 0


function singlyE(u) {  // for non-multiples of 4
    var magic = fill(u);
    var k = (u - 2) / 4;
    var kl = k - 1;
    var mid = u / 2;
    for (var j = 1; j <= k; j++) {
        for (var i = 1; i <= magic.length / 2; i++) {
            var temp;
            if (i == (mid + 1) / 2) {
                temp = magic[i][j + 1];
                magic[i][j + 1] = magic[i + mid][j + 1];
                magic[i + mid][j + 1] = temp;
            } else {
                temp = magic[i][j];
                magic[i][j] = magic[i + mid][j];
                magic[i + mid][j] = temp;
            }
        }
    }
    if ((u + 2 - k) <= u) {
        var temp;
        for (var j = u; j >= (u + 2 - k); j--) {
            for (var i = 1; i < magic.length / 2; i++) {
                temp = magic[i][j];
                magic[i][j] = magic[i + mid][j];
                magic[i + mid][j] = temp;
            }
        }
    }
    return magic;
}



function fill(u) {
    var chunk = u / 2
    var even = Array.matrix(u, u, 0)
    even = chFill(even, odd(Array.matrix(chunk, chunk, 0), chunk, 1), 1, 1);
    even = chFill(even, odd(Array.matrix(chunk, chunk, 0), chunk, 1 + (chunk * chunk) * 2), 1, chunk + 1);
    even = chFill(even, odd(Array.matrix(chunk, chunk, 0), chunk, 1 + (chunk * chunk) * 3), chunk + 1, 1);
    even = chFill(even, odd(Array.matrix(chunk, chunk, 0), chunk, 1 + (chunk * chunk)), chunk + 1, chunk + 1);

    return even;

}








function chFill(u, y, r, c) {
    for (i = r, j = 1; i < u.length, j < y.length; i++, j++) {
        for (k = c, l = 1; k < u.length, l < y.length; k++, l++) {
            u[i][k] = y[j][l];

        }

    }
    return u;
}


function doublyE(u) { //for multiples of 4
    var magic = Array.matrix(u, u, 0);
    var temp = 1;
    var n = u / 2;
    for (var i = 1; i < magic.length; i++) {
        for (var j = 1; j < magic.length; j++) {
            var rev = temp++;
            var offset = (u * u) + 1;

            if (
                (i <= n / 2 && j <= n / 2) || (i >= (3 * n + 2) / 2 && j >= (3 * n + 2) / 2) || (i <= n / 2 && j >= (3 * n + 2) / 2) || (i >= (3 * n + 2) / 2 && j <= n / 2) || (i >= (n + 2) / 2 && j >= (n + 2) / 2 && i <= (3*n/2) && j <= (3*n/2))

            ) {
                magic[i][j] = rev;
            	
            } else {

                magic[i][j] = (offset- rev);
                
            }

        }
    }
    return magic;
}


function odd(x, n, temp) {


    var r = 1;
    var c = (n + 1) / 2;

    var tr = 0;
    var tc = 0;

    for (var i = 0; i < n * n; i++) {

        if (r < 1) {
            r = r + n;
        }



        if (c > n) {
            c = c - n;
        }

        if (x[r][c] == 0) {
            x[r][c] = temp++;
        } else {
            r = tr + 1;
            c = tc;

            x[r][c] = temp++;
        }


        tr = r;
        tc = c;

        r = r - 1;
        c = c + 1;

    }
    return x;
}
