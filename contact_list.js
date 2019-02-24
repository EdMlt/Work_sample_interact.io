window.addEventListener("load", function(event) { //event listener on the loading to get the response of interact.io
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			var response = JSON.parse(this.responseText);
			update_contact_list(response);
		}
	};
	request.open("GET", "/contacts");
	request.send();
});

function update_contact_list(response){ //function to display the response on the html page
	for(i=0;i<=response.count-1;i++){
		if (response.data[i].displayName!=null) {var Name=response.data[i].displayName;}
		else{Name="";}

		if (response.data[i].emails!=null) {var Email=response.data[i].emails[0].email;}
		else{Email="";}

		if (response.data[i].websites!=null) {var Website=response.data[i].websites;}
		else{Website="";}

		if (response.data[i].phoneNumbers!=null) {var Phonenumber=response.data[i].phoneNumbers[0].number;}
		else{Phonenumber="";}

		document.getElementById('contacts_info').innerHTML+='<td>'+Name+'</td>'+'<td>'+Email+'</td>'+'<td>'+Website+'</td>'+'<td>'+Phonenumber+'</td>'; 

	}
}