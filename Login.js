const logbut=document.getElementById('login_button');

const password = document.getElementById('password');


//function toalert the user if his logs aren't good
email.addEventListener('change', function(event) { 
	var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
	if (expressionReguliere.test(document.getElementById('email').value))
	{
	document.getElementById('email').style.color = 'green';
	const email = document.getElementById('email');
	}
	else
	{
	alert('Invalid email address');
	document.getElementById('email').style.color = 'red';
	}

});


password.addEventListener('change', function(event) {
	var expressionReguliere = (/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\d]).*$/);
	if (expressionReguliere.test(document.getElementById('password').value))
	{
	document.getElementById('password').style.color = 'green';
	}
	else
	{
	alert('Invalid password, it must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character');
	document.getElementById('password').style.color = 'red';
	}

});

