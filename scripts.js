//Global Variables
//The Logged In User is tracked in usr
//var usr = "";


// SCRIPTS FOR LOGIN
	
	function pswds() {
		alert("Admins: ervtod, hirchr, jorass, saskru, svetor Users(examples): aamsta, anddar, ankov");
	}
function loginusr() {
	var usrname = document.getElementById("login").value;
	var pswd = document.getElementById("password").value;
	//alert("usr"+usrname+"pswd"+pswd);
	var admins = ['ervtod', 'hirchr', 'jorass', 'saskru', 'svetor'];
	var users = ['aamsta', 'anddar', 'ankov', 'aqulyn'];
	var correct_login = false;
	var usr = "";
	for (var i = 0; i < admins.length; i++) {
		//alert("testar mot "+admins[i]+" pswd "+pswd);
		if (pswd === admins[i]) {
			correct_login = true;
			usr = admins[i];
			//alert("login as " + usr);
		}
	}
	if (correct_login == true) {
		//alert("du loggas in som " + usr);
		sessionStorage.myvar = usr;
		window.open("Bartender.html" , "_self");
	} else {
		for (var i = 0; i < users.length; i++) {
			if (pswd === users[i]) {
				correct_login = true;
				usr = users[i];
				//alert("login as " + usr);
			}
		}
		if (correct_login == true) {
			//alert("du loggas in som " + usr);
			sessionStorage.myvar = usr;
			window.open("Customer.html" , "_self");
		}

	}
}


	//Alerts for credit and cash payment
	function paycash(){
		alert("Cash register opened");
	}
	function paycard(){
		alert("Please Insert card");
	}
	function paycredit(){
		 //document.getElementById("userscredit").style.display = 'none';
		var payinguser = document.getElementById("userscredit").value;
		alert("denna payar " +payinguser);
	}
	/*function usercredit(){
		var array = ['user1', 'user2'];
		var output='<select size="20" name="decision2" style="width: 600px;" onchange="changeFunc(value);">';
		array.sort();
		for(i=0; i<array.length; i++){
		output += '<option value='+ array[i][3]+'>';
		for(k=0; k<array[i].length-1; k++){
			output += " " + array[i][k];

		}
		output += '</option>'+'</br>';
	}
	alert("listan" + output)
	output += '</select>'
	document.getElementById("paycredit").innerHTML = output;
	}*/
	function createusr(){
		
		var newusr = document.getElementById("newusr").value;
		var newpswd = document.getElementById("newpswd").value;
		var firstname = document.getElementById("firstname").value;
		var lastname = document.getElementById("lastname").value;
		var mail = document.getElementById("mail").value;
		var phone = document.getElementById("phone").value;
		//alert(""+usr);
		var url='http://pub.jamaica-inn.net/fpdb/api.php?username='+usr+'&'+usr+'=ervtod&action=user_edit&new_username='+newusr+'&new_password='+newpswd+'&first_name='+firstname+'&last_name='+lastname+'&email='+mail+'&phone='+phone;
		//alert("hej" + url);
		JSON.parse(Get(url));
		alert("New User Created");
		window.open("Bartender.html" , "_self");
	}



	//ONLOAD FOR BOTH BARTENDER AND CUSTOMER TO GET THE USERNAME LATER USED 
	function onloading(){
		usr = sessionStorage.myvar;
		//alert(""+usr);
		document.getElementById("header").innerHTML = ("Logged in as: " + usr);
		//beer_table();
		beer_stocklist();
		beer_toplist();
		//document.getElementById("paycredit").style.display = '';
		var creditslist = JSON.parse(Get("http://pub.jamaica-inn.net/fpdb/api.php?username="+usr+"&password="+usr+"&action=iou_get"));
//alert ("creditslist<"+creditslist.payload[0].assets+">");
		var credits_temp = creditslist.payload[0].assets;
//alert ("credits_temp<"+credits_temp+">");
		var credits = parseInt(credits_temp, 10);

		}

//Beer Listbox
function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;

}
var spinner;
//creates a main_array with array in it. The array has the values [namn, namn2, pub_price + "sek", beer_id]
function beer_list(){
	spinner_start();
	alert('spinner only works if this alert is used...');
	var data_beer = JSON.parse(Get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get"));
	var i;
	var main_array= [];
	var array = [];

//data_beer.payload.length
	for(i=0; i<30; i++) {
		if (data_beer.payload[i].namn != "") {
			array[array.length] = data_beer.payload[i].namn;
			array[array.length] = data_beer.payload[i].namn2;
			array[array.length] = data_beer.payload[i].pub_price;
			array[array.length] = data_beer.payload[i].beer_id;

			main_array[main_array.length] = array;

			array = [];

		}
	}
	//beer_box(main_array)
	return main_array;

}
//is beverage a beer, wine or cider
function if_beer_or_wine(beer_id_temp){
	var url='http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id="'+beer_id_temp+'"';
	var beer_info = JSON.parse(Get(url));
	var beverage;
	var cider="cider";

	beverage = beer_info.payload[0].varugrupp;

	if(beverage.toLowerCase().match("öl")){
		return true;
	}
	else if(beverage.toLowerCase().match("vin")){
		return false;
	}
	else return cider;
}
//Creates a table with the all the beers
function beer_table(){

	var array = beer_list();
	alert();
	array.sort();
	var outPut='<table border="thick"><thead><tr><th>Beer</th><th>Name</th><th>Price</th></tr></thead><tbody>';
	for(i=0; i<array.length; i++){
		if(if_beer_or_wine(array[i][3])==true) {


			outPut += '<tr  draggable="true"; onmouseover="ChangeColor(this, true);"onmouseout="ChangeColor(this, false);"onclick="DoNav(' + array[i][3]+','+ array[i][2] + ');">';
			//output += '<option value='+ array[i][3]+'>';
			for (k = 0; k < array[i].length - 1; k++) {
				outPut += '<td>' + array[i][k] + '</td>';

			}

			outPut += '</tr>';
		}
	}
	spinner.stop();
	//alert("listan" + output)
	outPut += '</tbody></table>';
	document.getElementById("beerTable").innerHTML = outPut;
	document.getElementById("selected_beverage").innerHTML= '<img src="bottle.jpg" width="185" height="272" alt="beer" />';

}
////Creates a table with the all the wines
function wine_table(){
	var array = beer_list();
	array.sort();
	var outPut='<table border="thi' +
		'ck"><thead><tr><th>Wine</th><th>Name</th><th>Price</th></tr></thead><tbody>';
	for(i=0; i<array.length; i++){
		if(if_beer_or_wine(array[i][3])==false) {

			outPut += '<tr onmouseover="ChangeColor(this, true); "onmouseout="ChangeColor(this, false);"onclick="DoNav(' + array[i][3] +','+ array[i][2] + ');">';
			//output += '<option value='+ array[i][3]+'>';
			for (k = 0; k < array[i].length - 1; k++) {
				outPut += '<td>' + array[i][k] + '</td>';

			}

			outPut += '</tr>';
		}
	}
	spinner.stop();
	//alert("listan" + output)
	outPut += '</tbody></table>';
	document.getElementById("beerTable").innerHTML = outPut;
	document.getElementById("selected_beverage").innerHTML= '<img src="wine.jpg" width="185" height="272" alt="beer" />';

}

////Creates a table with the cider and all the non-alcoholic beverage
function other_table(){
	var array = beer_list();
	array.sort();
	var outPut='<table border="thick"><thead><tr><th>Beverage</th><th>Name</th><th>Price</th></tr></thead><tbody>';
	for(i=0; i<array.length; i++){
		if(if_beer_or_wine(array[i][3])=="cider") {

			outPut += '<tr onmouseover="ChangeColor(this, true); "onmouseout="ChangeColor(this, false);"onclick="DoNav(' + array[i][3] +','+ array[i][2] + ');">';
			//output += '<option value='+ array[i][3]+'>';
			for (k = 0; k < array[i].length - 1; k++) {
				outPut += '<td>' + array[i][k] + '</td>';

			}

			outPut += '</tr>';
		}
	}
	spinner.stop();
	//alert("listan" + output)
	outPut += '</tbody></table>';
	document.getElementById("beerTable").innerHTML = outPut;
	document.getElementById("selected_beverage").innerHTML= '<img src="cider.jpg" width="185" height="272" alt="beer" />';

}

//change the color when hovering over the beer_table
function ChangeColor(tableRow, highLight){
	if (highLight)
	{
		tableRow.style.backgroundColor = '#dcfac9';
	}
	else
	{
		tableRow.style.backgroundColor = 'white';
	}
}
//list for statistics
function beer_stocklist(){
	spinner_start();
	alert('spinner only works if this alert is used...');
	var data_beer = JSON.parse(Get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get"));
	var i;
	var main_array= [];
	var array = [];


	for(i=0; i<data_beer.payload.length; i++) {
		if (data_beer.payload[i].namn != "") {
			array[array.length] = data_beer.payload[i].namn;
			array[array.length] = data_beer.payload[i].namn2;
			array[array.length] = data_beer.payload[i].count;
			array[array.length] = data_beer.payload[i].beer_id;

			main_array[main_array.length] = array;

			array = [];

		}
	}
	//beer_box(main_array)
	return main_array;

}
//Creates a table for the statistics
function beer_stocktable(){
	var array = beer_stocklist();
	array.sort();
	var outPut='<table border="thick"><thead><tr><th>Beer</th><th>Name</th><th>Remaining</th><th>ID</th></tr></thead><tbody>';
	for(i=0; i<array.length; i++){
		if(parseInt(array[i][2])>5) {


			outPut += '<tr  draggable="true"; onmouseover="ChangeColor(this, true);"onmouseout="ChangeColor(this, false);"onclick="DoNav(' + array[i][3] + ');">';
			//output += '<option value='+ array[i][3]+'>';
			for (k = 0; k < array[i].length - 1; k++) {
				outPut += '<td>' + array[i][k] + '</td>';

			}

			outPut += '</tr>';
		}
	}
	spinner.stop();
	//alert("listan" + output)
	outPut += '</tbody></table>';
	document.getElementById("stockTable").innerHTML = outPut;
	document.getElementById("selected_beverage").innerHTML= '<img src="bottle.jpg" width="185" height="272" alt="beer" />';

}
//toplist for most sold beers
function beer_toplist(){
	spinner_start();
	alert('spinner only works if this alert is used...');
	var data_beer = JSON.parse(Get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get"));
	var i;
	var main_array= [];
	var array = [];


	for(i=0; i<data_beer.payload.length; i++) {
		if (data_beer.payload[i].namn != "") {
			array[array.length] = data_beer.payload[i].namn;
			array[array.length] = data_beer.payload[i].namn2;
			array[array.length] = data_beer.payload[i].count;
			array[array.length] = data_beer.payload[i].beer_id;

			main_array[main_array.length] = array;

			array = [];

		}
	}
	//beer_box(main_array)
	return main_array;

//Creates a table for the toplist
function beer_toptable() {
	var array = beer_toplist();
	array.sort();
	var outPut = '<table border="thick"><thead><tr><th>Beer</th><th>Name</th><th>Price</th></tr></thead><tbody>';
	for (i = 0; i < array.length; i++) {
		if (parseInt(array[i][2]) < 5) {


			outPut += '<tr  draggable="true"; onmouseover="ChangeColor(this, true);"onmouseout="ChangeColor(this, false);"onclick="DoNav(' + array[i][3] + ');">';
			//output += '<option value='+ array[i][3]+'>';
			for (k = 0; k < array[i].length - 1; k++) {
				outPut += '<td>' + array[i][k] + '</td>';

			}

			outPut += '</tr>';
		}
	}
	spinner.stop();
	//alert("listan" + output)
	outPut += '</tbody></table>';
	document.getElementById("topTable").innerHTML = outPut;
	document.getElementById("selected_beverage").innerHTML = '<img src="bottle.jpg" width="185" height="272" alt="beer" />';
}
//Displays the beverage with more information from the table and with different pictures
var beer_id;
var price;
function DoNav(beer_id_temp, price_temp)
{
	var beer;
	var url='http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id="'+beer_id_temp+'"';
	beer_id = beer_id_temp;
	price = price_temp;
	var beer_info = JSON.parse(Get(url));
	document.getElementById("the_selected_beer").innerHTML=beer_info.payload[0].namn;
	document.getElementById("beer_info").innerHTML=beer_info.payload[0].namn + "-- " + beer_info.payload[0].namn2+"--"+ beer_info.payload[0].leverantor+ " -- Type:  "+ beer_info.payload[0].varugrupp ;


	var beverage;
	beverage = beer_info.payload[0].varugrupp;

	if(beverage.toLowerCase().match("öl") && parseInt(beer_id)<170000){
		beer='bottle.jpg';
	}
	else if(beverage.toLowerCase().match("öl")&& parseInt(beer_id)>170000){
		beer='beer_glass.jpg';
	}
	else if(beverage.toLowerCase().match("vin")){
		beer='wine.jpg';
	}
	else beer='cider.jpg';

	document.getElementById("selected_beverage").innerHTML= '<img src='+beer+' width="185" height="272" alt="beer" />';
}


// displays the choosen beer with more information
function changeFunc(list){
	var array = list;
	alert(array.length);
	alert(array[0]);
	var url='http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id="'+array[0]+'"';
	beer_id = array[0];
	price=array[1];
	var beer_info = JSON.parse(Get(url));
	document.getElementById("the_selected_beer").innerHTML=beer_info.payload[0].namn;
	document.getElementById("beer_info").innerHTML=beer_info.payload[0].namn + "-- " + beer_info.payload[0].namn2+"--"+ beer_info.payload[0].leverantor;
	var beverage;
	beverage = beer_info.payload[0].varugrupp;

	if(beverage.toLowerCase().match("öl") && parseInt(beer_id)<170000){
		beer='bottle.jpg';
	}
	else if(beverage.toLowerCase().match("öl")&& parseInt(beer_id)>170000){
		beer='beer_glass.jpg';
	}
	else if(beverage.toLowerCase().match("vin")){
		beer='wine.jpg';
	}
	else beer='cider.jpg';

	document.getElementById("selected_beverage").innerHTML= '<img src='+beer+' width="185" height="272" alt="beer" />';
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
		result += '<option value='+ [list[i][3],list[i][2]]+'>';
		for(k=0; k<list[i].length-1; k++){
			result += " " + list[i][k];

		}
		result += '</option>'+'</br>';
	}
	//alert("listan" + output)
	result += '</select>'
	document.getElementById("search_result").innerHTML = result;

	list=[];
	spinner.stop();

}

//////////////////////////////////////////////////////
// Beginning of the tab management
/////////////////////////////////////////////////////
// This function should create the Tab for a costumer
var ListTab=[];
var cost;
function createTab(){
	//ListTab[ListTab.length] = [];
	cost = 0;
}
// Add a beer to the tab
function addBeerTab(){
	//alert(beer_id);
	var id = ListTab.length;
	//var length=ListTab[id].length;
	var url='http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id="'+beer_id+'"';
	var beer_info = JSON.parse(Get(url));
	var array = [];
	array[0] = beer_info.payload[0].namn;
	array[1] = price;

	ListTab[id]=array;

	updateCost();
	tab_box();
	array = [];
}
function removeBeer(cmd_id){
	ListTab.remove(cmd_id);
	updateCost();
}
function updateCost(){
	var sum = 0;
	for(ii=0;ii<ListTab.length;ii++){
		sum += parseInt(ListTab[ii][1]);
		alert(ListTab[ii][1]);
	}
	cost = sum;
	alert(cost);
};
//Creates a listbox with all the beers in the tab.
function tab_box(){
	ListTab.sort();
	var output='<select size="20" name="decision2" style="width: 600px;" onchange="changeFunc(value);">';
	for(i=0; i<ListTab.length; i++){
		output += '<option value='+ i +'>';

			output += " " + ListTab[i][0];
		output += '</option>'+'</br>';
	}
//alert("listan" + output)
	output += '</select>'
	document.getElementById("tab").innerHTML = output;
}
//////////////////////////////////////////////////////
// End of the tab management
//////////////////////////////////////////////////////


function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

function onClick() {
	var temp = document.getElementById("creditsbox").value;
	var addvalue = parseInt(temp, 10);
	credits += addvalue;
	//alert ("addvalue<"+addvalue+">");
	document.getElementById("credits").innerHTML = credits;
};

function logout(){
	sessionStorage.myvar = "";
}

//////////////////////////////////////////////////////
// start of the spinwheel
//////////////////////////////////////////////////////
/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */
var opts = {
	lines: 11, // The number of lines to draw
	length: 26, // The length of each line
	width: 13, // The line thickness
	radius: 30, // The radius of the inner circle
	corners: 1, // Corner roundness (0..1)
	rotate: 8, // The rotation offset
	direction: 1, // 1: clockwise, -1: counterclockwise
	color: '#000', // #rgb or #rrggbb or array of colors
	speed: 0.9, // Rounds per second
	trail: 44, // Afterglow percentage
	shadow: false, // Whether to render a shadow
	hwaccel: false, // Whether to use hardware acceleration
	className: 'spinner', // The CSS class to assign to the spinner
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	top: '50%', // Top position relative to parent
	left: '50%' // Left position relative to parent
};



(function(root, factory) {

	/* CommonJS */
	if (typeof exports == 'object')  module.exports = factory()

	/* AMD module */
	else if (typeof define == 'function' && define.amd) define(factory)

	/* Browser global */
	else root.Spinner = factory()
}
(this, function() {
	"use strict";

	var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
		, animations = {} /* Animation rules keyed by their name */
		, useCssAnimations /* Whether to use CSS animations or setTimeout */

	/**
	 * Utility function to create elements. If no tag name is given,
	 * a DIV is created. Optionally properties can be passed.
	 */
	function createEl(tag, prop) {
		var el = document.createElement(tag || 'div')
			, n

		for(n in prop) el[n] = prop[n]
		return el
	}

	/**
	 * Appends children and returns the parent.
	 */
	function ins(parent /* child1, child2, ...*/) {
		for (var i=1, n=arguments.length; i<n; i++)
			parent.appendChild(arguments[i])

		return parent
	}

	/**
	 * Insert a new stylesheet to hold the @keyframe or VML rules.
	 */
	var sheet = (function() {
		var el = createEl('style', {type : 'text/css'})
		ins(document.getElementsByTagName('head')[0], el)
		return el.sheet || el.styleSheet
	}())

	/**
	 * Creates an opacity keyframe animation rule and returns its name.
	 * Since most mobile Webkits have timing issues with animation-delay,
	 * we create separate rules for each line/segment.
	 */
	function addAnimation(alpha, trail, i, lines) {
		var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
			, start = 0.01 + i/lines * 100
			, z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
			, prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
			, pre = prefix && '-' + prefix + '-' || ''

		if (!animations[name]) {
			sheet.insertRule(
				'@' + pre + 'keyframes ' + name + '{' +
				'0%{opacity:' + z + '}' +
				start + '%{opacity:' + alpha + '}' +
				(start+0.01) + '%{opacity:1}' +
				(start+trail) % 100 + '%{opacity:' + alpha + '}' +
				'100%{opacity:' + z + '}' +
				'}', sheet.cssRules.length)

			animations[name] = 1
		}

		return name
	}

	/**
	 * Tries various vendor prefixes and returns the first supported property.
	 */
	function vendor(el, prop) {
		var s = el.style
			, pp
			, i

		prop = prop.charAt(0).toUpperCase() + prop.slice(1)
		for(i=0; i<prefixes.length; i++) {
			pp = prefixes[i]+prop
			if(s[pp] !== undefined) return pp
		}
		if(s[prop] !== undefined) return prop
	}

	/**
	 * Sets multiple style properties at once.
	 */
	function css(el, prop) {
		for (var n in prop)
			el.style[vendor(el, n)||n] = prop[n]

		return el
	}

	/**
	 * Fills in default values.
	 */
	function merge(obj) {
		for (var i=1; i < arguments.length; i++) {
			var def = arguments[i]
			for (var n in def)
				if (obj[n] === undefined) obj[n] = def[n]
		}
		return obj
	}

	/**
	 * Returns the absolute page-offset of the given element.
	 */
	function pos(el) {
		var o = { x:el.offsetLeft, y:el.offsetTop }
		while((el = el.offsetParent))
			o.x+=el.offsetLeft, o.y+=el.offsetTop

		return o
	}

	/**
	 * Returns the line color from the given string or array.
	 */
	function getColor(color, idx) {
		return typeof color == 'string' ? color : color[idx % color.length]
	}

	// Built-in defaults

	var defaults = {
		lines: 12,            // The number of lines to draw
		length: 7,            // The length of each line
		width: 5,             // The line thickness
		radius: 10,           // The radius of the inner circle
		rotate: 0,            // Rotation offset
		corners: 1,           // Roundness (0..1)
		color: '#000',        // #rgb or #rrggbb
		direction: 1,         // 1: clockwise, -1: counterclockwise
		speed: 1,             // Rounds per second
		trail: 100,           // Afterglow percentage
		opacity: 1/4,         // Opacity of the lines
		fps: 20,              // Frames per second when using setTimeout()
		zIndex: 2e9,          // Use a high z-index by default
		className: 'spinner', // CSS class to assign to the element
		top: '50%',           // center vertically
		left: '50%',          // center horizontally
		position: 'absolute'  // element position
	}

	/** The constructor */
	function Spinner(o) {
		this.opts = merge(o || {}, Spinner.defaults, defaults)
	}

	// Global defaults that override the built-ins:
	Spinner.defaults = {}

	merge(Spinner.prototype, {

		/**
		 * Adds the spinner to the given target element. If this instance is already
		 * spinning, it is automatically removed from its previous target b calling
		 * stop() internally.
		 */
		spin: function(target) {
			this.stop()

			var self = this
				, o = self.opts
				, el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
				, mid = o.radius+o.length+o.width

			css(el, {
				left: o.left,
				top: o.top
			})

			if (target) {
				target.insertBefore(el, target.firstChild||null)
			}

			el.setAttribute('role', 'progressbar')
			self.lines(el, self.opts)

			if (!useCssAnimations) {
				// No CSS animation support, use setTimeout() instead
				var i = 0
					, start = (o.lines - 1) * (1 - o.direction) / 2
					, alpha
					, fps = o.fps
					, f = fps/o.speed
					, ostep = (1-o.opacity) / (f*o.trail / 100)
					, astep = f/o.lines

					;(function anim() {
					i++;
					for (var j = 0; j < o.lines; j++) {
						alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

						self.opacity(el, j * o.direction + start, alpha, o)
					}
					self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
				})()
			}
			return self
		},

		/**
		 * Stops and removes the Spinner.
		 */
		stop: function() {
			var el = this.el
			if (el) {
				clearTimeout(this.timeout)
				if (el.parentNode) el.parentNode.removeChild(el)
				this.el = undefined
			}
			return this
		},

		/**
		 * Internal method that draws the individual lines. Will be overwritten
		 * in VML fallback mode below.
		 */
		lines: function(el, o) {
			var i = 0
				, start = (o.lines - 1) * (1 - o.direction) / 2
				, seg

			function fill(color, shadow) {
				return css(createEl(), {
					position: 'absolute',
					width: (o.length+o.width) + 'px',
					height: o.width + 'px',
					background: color,
					boxShadow: shadow,
					transformOrigin: 'left',
					transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
					borderRadius: (o.corners * o.width>>1) + 'px'
				})
			}

			for (; i < o.lines; i++) {
				seg = css(createEl(), {
					position: 'absolute',
					top: 1+~(o.width/2) + 'px',
					transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
					opacity: o.opacity,
					animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
				})

				if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))
				ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
			}
			return el
		},

		/**
		 * Internal method that adjusts the opacity of a single line.
		 * Will be overwritten in VML fallback mode below.
		 */
		opacity: function(el, i, val) {
			if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
		}

	})


	function initVML() {

		/* Utility function to create a VML tag */
		function vml(tag, attr) {
			return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
		}

		// No CSS transforms but VML support, add a CSS rule for VML elements:
		sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

		Spinner.prototype.lines = function(el, o) {
			var r = o.length+o.width
				, s = 2*r

			function grp() {
				return css(
					vml('group', {
						coordsize: s + ' ' + s,
						coordorigin: -r + ' ' + -r
					}),
					{ width: s, height: s }
				)
			}

			var margin = -(o.width+o.length)*2 + 'px'
				, g = css(grp(), {position: 'absolute', top: margin, left: margin})
				, i

			function seg(i, dx, filter) {
				ins(g,
					ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
						ins(css(vml('roundrect', {arcsize: o.corners}), {
								width: r,
								height: o.width,
								left: o.radius,
								top: -o.width>>1,
								filter: filter
							}),
							vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
							vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
						)
					)
				)
			}

			if (o.shadow)
				for (i = 1; i <= o.lines; i++)
					seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

			for (i = 1; i <= o.lines; i++) seg(i)
			return ins(el, g)
		}

		Spinner.prototype.opacity = function(el, i, val, o) {
			var c = el.firstChild
			o = o.shadow && o.lines || 0
			if (c && i+o < c.childNodes.length) {
				c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
				if (c) c.opacity = val
			}
		}
	}

	var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

	if (!vendor(probe, 'transform') && probe.adj) initVML()
	else useCssAnimations = vendor(probe, 'animation')

	return Spinner

}));

function spinner_start(){
	var target = document.getElementById('foo');
	spinner = new Spinner(opts).spin(target);
}
