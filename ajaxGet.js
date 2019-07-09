
window.onload = function() {
	document.getElementById('shop_ip').onclick = function() {

		ajaxGet('https://alexandr-paleev.github.io/', function(data) {
			document.getElementById('myip').innerHTML = data;
		});

		ajaxGet('https://jsonplaceholder.typicode.com/users', function(data) {
			console.log(data);
		});

	}
}

function ajaxGet(url, callback) {
	const f = callback || function(data) {};

	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {
			f(xhr.responseText);
		}
	}

	xhr.open('GET', url);
	xhr.send();
}