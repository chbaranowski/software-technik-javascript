// statt window onload nutzen wir hier die JQuery Abstraktion
$(document).ready(function() {
	
	// Die Implementierung des Objekts finden Sie in der JavaScript Datei core.js
	var application = new Application();
	
	// der URL Parameter ist gesetzt wenn ein Kunde bearbeitet werden soll.
	// die ID muss der Basarnummer des Kunden entsprechen!
	var customerId = $.getURLParam("customerId");
	
	// Wenn eine Basarnummer als URL Parameter Ÿbergeben wurde wird dieser geladen.
	if (customerId) {
		var customer = application.getCustomerbyId(customerId);
	} else {
		var customer = application.createCustomer();
	}
	
	// Via JQuery werden die Werte der Eingabefelder auf die Werte des aktuellen
	// Kunden Objekts gesetzt.
	$('#nrInputField').val(customer.basarNumber);
	$('#firstnameInputField').val(customer.firstName);
	$('#lastnameInputField').val(customer.lastName);
	
	// Via JQuery wird der Click Handler registriert.
	$('#saveButton').click(function() {
		
		// Wenn auf Speichern geklickt wird werden die aktuellen Werte aus
		// den Eingabefeldern via JQuery gelesen.
		customer.basarNumber = $('#nrInputField').val();
		customer.firstName = $('#firstnameInputField').val();
		customer.lastName = $('#lastnameInputField').val();
		application.saveCustomer(customer);
		window.location.href = 'customer-overview.html';
	
	});
});