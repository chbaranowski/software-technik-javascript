window.onload = function() {
	var model;
	if (window.name) {
		model = JSON.parse(window.name);
	} else {
		model = {
			customers : [ [ 1, 'Baranowski', 'Christian' ],
					[ 2, 'Tester', 'Christian' ] ]
		};
	}
	;
	var parameters = window.location.search;
	var index = getUrlParam('customerId');
	var customer;
	if (index) {
		customer = model.customers[index];
	} else {
		customer = [ 0, '', '' ];
	}

	var nrInputField = document.getElementById('nrInputField');
	nrInputField.value = customer[0];

	var firstnameInputField = document.getElementById('firstnameInputField');
	firstnameInputField.value = customer[1];

	var lastnameInputField = document.getElementById('lastnameInputField');
	lastnameInputField.value = customer[2];

	var saveButton = document.getElementById('saveButton');
	addEvent(saveButton, 'click', function(event) {
		customer[0] = nrInputField.value;
		customer[1] = firstnameInputField.value;
		customer[2] = lastnameInputField.value;
		if (!index) {
			model.customers.push(customer);
		}
		window.name = JSON.stringify(model);
		window.location.href = 'customer-overview.html';
	});

	var cancelButton = document.getElementById('cancelButton');
	addEvent(cancelButton, 'click', function(event) {
		window.location.href = 'customer-overview.html';
	});
};
