// SCRIPTS FOR LOGIN
	
	function pswds() {
		alert("Admins: ervtod, hirchr, jorass, saskru, svetor Users(examples): aamsta, anddar, ankov");
	}
	function loginusr() {
	var usrname = document.getElementById("login").value;
	var pswd = document.getElementById("password").value;
	//alert("usr"+usrname+"pswd"+pswd);
	var admins = ['ervtod', 'hirchr', 'jorass', 'saskru', 'svetor'];
	var correct_login  = false;
	var usr = "";
	for (var i = 0; i < admins.length; i++){
		//alert("testar mot "+admins[i]+" pswd "+pswd);
		if (pswd === admins[i]){
			correct_login = true;
			usr = admins[i];
			//alert("login as " + usr);
		}
	}
	if (correct_login == true) {
		alert("du loggas in som " + usr);
		sessionStorage.myvar = usr;
		window.open("Bartender.html");
	}
	//var test = document.getElementByID("fas2");
	//var test2 = test.value;
	//alert(" " + test);
	}
	
	
	
	//ONLOAD FOR BOTH BARTENDER AND CUSTOMER TO GET THE USERNAME LATER USED 
	//function onloading(){
	//	var usr = sessionStorage.myvar;

	//	alert(" hej " + usr);
	//	}

//Beer Listbox
function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;

}

/*function beer_list_box() {
	var data_beer = JSON.parse(Get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get"));
	var i;
	var out='<select size="20" name="decision2" style="width: 600px;">';
	for(i=2; i<60; i++){
	out +='<option>' + data_beer.payload[i].namn + " "
	+ data_beer.payload[i].namn2 + " -- " + data_beer.payload[i].pub_price + "sek" + '</option>' +'<br>';
		}
	out+='</select>'
	document.getElementById("test").innerHTML = out;

}*/

//creates a main_array with array in it. The array has the values [namn, namn2, pub_price + "sek", beer_id]
function beer_list(){
	var data_beer = JSON.parse(Get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get"));
	var i;
	var main_array= [];
	var array = [];


	for(i=2; i<data_beer.payload.length; i++){
		array[array.length] = data_beer.payload[i].namn;
		array[array.length] = data_beer.payload[i].namn2;
		array[array.length] = data_beer.payload[i].pub_price +" sek";
		array[array.length] = data_beer.payload[i].beer_id;

		main_array[main_array.length] = array;


		array = [];

	}
	//beer_box(main_array)
	return main_array;

}

//Creates a listbox with all the beers, order by name.
function beer_box(){
	var array = beer_list();
	var output='<select size="20" name="decision2" style="width: 600px;" onchange="changeFunc(value);">';
	array.sort();
	for(i=0; i<array.length; i++){
		output += '<option value='+ array[i][3]+'>';
		for(k=0; k<array[i].length-1; k++){
			output += " " + array[i][k];

		}
		output += '</option>'+'</br>';
	}
	//alert("listan" + output)
	output += '</select>'
	document.getElementById("test").innerHTML = output;
}

// displays the choosen beer with more information

function changeFunc(beer_id){
	var url='http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id="'+beer_id+'"';

	var beer_info = JSON.parse(Get(url));
	document.getElementById("the_selected_beer").innerHTML=beer_info.payload[0].namn;
	document.getElementById("beer_info").innerHTML=beer_info.payload[0].namn + "-- " + beer_info.payload[0].namn2+"--"+ beer_info.payload[0].leverantor;
}

//Search for beer
function search_beer(){
	var array = beer_list();
	var search_name = document.getElementById("Search").value;
	var list = [];
	var result='<select size="5" name="decision2" style="width: 400px;" onchange="changeFunc(value);">';

	for(i=0; i<array.length; i++){
		for(k=0; k<array[i].length-1; k++){
			if(array[i][k].toLowerCase().match(search_name.toLowerCase())){
				list[list.length]= array[i];
			}
		}
	}

	for(i=0; i<list.length; i++){
		result += '<option value='+ list[i][3]+'>';
		for(k=0; k<list[i].length-1; k++){
			result += " " + list[i][k];

		}
		result += '</option>'+'</br>';
	}
	//alert("listan" + output)
	result += '</select>'
	document.getElementById("search_result").innerHTML = result;

	list=[];

}
