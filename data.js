

xhrButton.addEventListener('click', () => {
	let xhr = new XMLHttpRequest();

	xhr.addEventListener('readystatechange', () => {
		if(xhr.readyState === 4 && xhr.status === 200) {
			let res = JSON.parse(xhr.responseText);
			showNames(res);
			createTable(res);
			addRowHandler(res);
		}
	});

	xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
	xhr.send(null);

});

function showNames(res) {
	let list = document.createElement('ul');

    res.forEach(item => {
        let listItem = document.createElement('li');
        listItem.innerText = item.name + '*' + item.username + '*' + item.email + '*' + item.website;
        list.appendChild(listItem);
    });

    document.getElementById('result').insertAdjacentElement('afterbegin', list);

}

let table = {};

function createTable(res){
table = document.createElement("table");
const header = document.createElement("tr");
const keys = Object.keys(res[0])
for(var key of keys){
    if(key === 'name' || key === 'username' || key === 'email' || key === 'website') {
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(key));
        header.appendChild(th);
    }
    
}
table.appendChild(header);
for(const row of res) {	
    const tr = document.createElement("tr");
    for(const key of keys){
        if(key === 'name' || key === 'username' || key === 'email' || key === 'website') {
            const td = document.createElement("td");
            const content = row[key] || '';
            td.appendChild(document.createTextNode(content));
            tr.appendChild(td);
            delete row[key]
        }
        
    }
    table.appendChild(tr);
}
document.body.appendChild(table);
}

function addRowHandler(res) {

	let address = '';
	for(const row of res) {
		adds = row.address;
		const keys = Object.keys(adds);
		for(const key of keys) {
			
			switch(key) {
				case 'street': address += ' STREET: ' + adds[key];
				break;

				case 'city': address += ' CITY: ' + adds[key];
				break;

				case 'zipcode': address += ' ZIPCODE: ' + adds[key] + '\n';
				break;

				default: 
				break;

			}
			
		}
	}
	
	const rows = table.getElementsByTagName('tr');
	for(let i = 1; i <= rows.length; i++) {
		let currentRow = table.rows[i];
		let createClickHandler = function() {
			alert(address);
		}
		currentRow.addEventListener('click', createClickHandler);
	}
}

