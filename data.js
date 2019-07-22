(function() {

	fetchButton.addEventListener('click', () => {
		fetch("https://jsonplaceholder.typicode.com/users")
		.then(response => {
			if (response.ok ? response : Promise.reject()) {
				return response.json();
			}else{
				return reject();
			}
		}).then(data => {
			return createTable(data);		
		}).then(data => {
			return addRowHandler(data);
		}).then(result => {
			return collumnSort(result);
		}).catch(() => {
			alert('Error: Not-found');
		});
	}, {once : true});


	function createTable(data){
		const table = document.createElement("table");
		const header = document.createElement("tr");
		const keys = Object.keys(data[0])
		for(var key of keys){
		    if(key === 'name' || key === 'username' || key === 'email' || key === 'website') {
		        const th = document.createElement("th");
		        th.appendChild(document.createTextNode(key));
		        header.appendChild(th);
		    }
		    
		}
		table.appendChild(header);

		for(const row of data) {	
		    const tr = document.createElement("tr");
		    tr.id = row.id;
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
		result.appendChild(table);
	}

	function addRowHandler(data) {
		const currentRow = [...(document.getElementsByTagName('tr'))];

		for(let i = 1; i < currentRow.length; i++) {

			currentRow[i].addEventListener('click', (e) => {
				fetch("https://jsonplaceholder.typicode.com/users")
				.then(response => {
					if (response.ok) {
						return response.json();
					}
				}).then(data => {
					for(let obj of data) {
						if (obj.id === i) {
							alert(`street : ${obj.address.street}\ncity : ${obj.address.city}\nzipcode : ${obj.address.zipcode}`);
						}
					}
				});
			});
		}

	}

	function collumnSort(result) {

		const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

		const compare = (idx, abc) => (a, b) => ((v1, v2) => 
		    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
		    )(getCellValue(abc ? a : b, idx), getCellValue(abc ? b : a, idx));

		document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
		    result = th.closest('table');
		    Array.from(result.querySelectorAll('tr:nth-child(n+2)'))
		        .sort(compare(Array.from(th.parentNode.children).indexOf(th), this.abc = !this.abc))
		        .forEach(tr => result.appendChild(tr) );
		})));
	}

})();
