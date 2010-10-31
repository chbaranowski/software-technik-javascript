$(document).ready(function() {
	var application = new Application();
	var customerId = $.getURLParam("customerId");
	if (customerId) {
		var customer = application.getCustomerbyId(customerId);
	} else {
		var customer = application.createCustomer();
	}
	$('#nrInputField').val(customer.basarNumber);
	$('#firstnameInputField').val(customer.firstName);
	$('#lastnameInputField').val(customer.lastName);
	$('#saveButton').click(function() {
		customer.basarNumber = $('#nrInputField').val();
		customer.firstName = $('#firstnameInputField').val();
		customer.lastName = $('#lastnameInputField').val();
		application.saveCustomer(customer);
		window.location.href = 'customer-overview.html';
	});
});