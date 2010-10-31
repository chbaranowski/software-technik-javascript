// statt window onload nutzen wir hier die JQuery Abstraktion
$(document).ready(function() {
	// Die Implementierung des Objekts finden Sie in der JavaScript Datei core.js
	var application = new Application();
	var customers = application.getCustomers();
	
	// Für jeden Kunden wird eine Tabelle Zeile ausgeben mit einem Link zum bearbeiten 
	// und löschen.
	for ( var i = 0; i < customers.length; i++) {
		function appendRow(customer){
			// Tabellenzeile für den Kunden wird erstellt
			var row = $('<tr>');
			
			// Via JQuery werden die Zellen für den Customer erstellt.
			row.append($('<td>' + customer.basarNumber + '</td>'
			  + '<td>' + customer.firstName + '</td>'
			  + '<td>' + customer.lastName + '</td>'));
			
			// Zelle für den bearbeiten und löschen Link.
			var linksCell = $('<td>');
			row.append(linksCell);
			
			// Der Link zum bearbeiten wird erstellt und an die Linkzelle angehängt.
			linksCell.append(
				$('<a href="customer-edit.html?customerId='
						+customer.basarNumber +'">Edit</a>'));
				
			// Der Link zum löschen wird erzeugt und es wird ein click handler registiert.
			linksCell.append($('<a>',{
				id: 'removeLink:'+customer.basarNumber,
				text: 'Remove',
				href: '#',
				click: function(){
					// Die Zeile wird aus dem gelöscht via JQuery.
					$(row).remove();
					application.removeCustomer(customer);
				}
			}));
			
			// Die dynamisch erzeugte Zeile wird an das HTML Element 
			// mit der ID customerTable angehängt.
			row.appendTo('#customerTable');
		}
		// Die Methode appendRow erstellt eine neue Tabellezeilen für den Kunden.
		appendRow(customers[i]);
	}
	
	$('#newCustomerButton').click(function() {
		window.location.href = 'customer-edit.html';
	});
});