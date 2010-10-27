var model;
if (window.name) {
	model = JSON.parse(window.name);
} else {
	model = {
		customers : [ [ 1, 'Baranowski', 'Christian' ],
				[ 2, 'Tester', 'Christian' ] ],
		gewinn: 0
	};
}

window.onload = function() {

	var parentHtmlElement = document.getElementById('customerTable');

	var demoTable = new FlexTable(parentHtmlElement, [ 'Nr.', 'Last Name',
			'First Name' ], model.customers);
	demoTable.onEditClick = function(rowIndex) {
		window.location.href = 'customer-edit.html?customerId=' + rowIndex;
	};
	demoTable.onRemoveClick = function(rowIndex){
		window.name = JSON.stringify(model);
	};
	var newCustomerButton = document.getElementById('newCustomerButton');
	newCustomerButton.addEventListener('click', function() {
		window.location.href = 'customer-edit.html';
	}, true);
	demoTable.setVisible(true);

};