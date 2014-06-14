function displayInputBox(){
	$("#terimainput").append("Masukkan maksimum n dalam (x+y)<sup>n</sup>: <input id='inputN' type='text'> <input type='submit' onclick='getInput()'>");
	return;
}

function getInput(){
	var inN = $("#inputN").val();
	if (isNaN(inN) || inN < 0){toastr.error("Input harus berupa bilangan bulat positif.");}
	else{
		displayToggleHide();
		sp = generatePascal(inN);
		xy = generateXY(sp);
		if(hide){
			displayD(sp);
		} else {
			displayD(xy);
		}
		
	}
	return;
}

function displayToggleHide(){
	var teks = '';
	if (hide){
		teks = "Penggunaan koefisien dalam (x+y)<sup>n</sup> disembunyikan.";
	} else {
		teks = "Penggunaan koefisien dalam (x+y)<sup>n</sup> ditampilkan.";
	}
	$("#togglehidexy").html(teks+' <button type="submit" name="submitButton" value="submit" onclick="toggleHide()">Toggle</button>');
	return;
}

function toggleHide(){
	hide = !hide;
	displayToggleHide();
	getInput();
	return;
}

function generatePascal(n){
	var segitiga = [];
	for (var r = 0; r <= n; r++){
		segitiga.push([]);
		for (var c = 0; c <= r; c++){
			segitiga[r].push([]);
		}
	}
	for (var r = 0; r <= n; r++){
		for (var c = 0; c <= r; c++){
			if ( c === 0 || c === segitiga[r].length-1){
				segitiga[r][c] = 1;
			} else {
				segitiga[r][c] = segitiga[r-1][c-1] + segitiga[r-1][c];
			}
		}
	}
	return segitiga;
}

function generateXY(spIn){
	var res = JSON.parse(JSON.stringify(spIn)); 
	for (var r = 0; r < spIn.length; r++){
		for (var c = 0; c <= r; c++){
			var k = spIn[r][c];
			var py = c;
			var px = spIn[r].length-c-1;
			res[r][c] = k+"x<sup>"+px+"</sup>y<sup>"+py+"</sup>";
		}
	}
	return res;
}

function displayD(D){
	$("#segitiga").html("");
	$("#segitiga").append("<table>");
	for (var r = 0; r < D.length; r++){
		$("#segitiga").append("<tr>"); 
		for (var i = 0; i < (D.length-r); i++){ 
			$("#segitiga").append("<td></td>");
		} 
		for (var c = 0; c <= r; c++){
			$("#segitiga").append("<td>"+D[r][c]+"</td><td></td>");
		}
		for (var i = 0; i < (D.length-r-1); i++){
			$("#segitiga").append("<td></td>");
		} 
		$("#segitiga").append("</tr>");
	}
	$("#segitiga").append("</table>");
	return;
}
