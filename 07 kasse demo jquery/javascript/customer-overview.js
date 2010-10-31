$(document).ready(function() {
	var application = new Application();
	var customers = application.getCustomers();
	for ( var i = 0; i < customers.length; i++) {
		function appendRow(customer){
			var linksColumn = $('<td>');
			var content = $('<tr>'
					+ '<td>' + customer.basarNumber + '</td>'
					+ '<td>' + customer.firstName + '</td>'
					+ '<td>' + customer.lastName + '</td>').append(linksColumn);
			linksColumn.append(
				$('<a href="customer-edit.html?customerId='
						+customer.basarNumber 
						+'">Edit</a>'));
			linksColumn.append(' ');
			linksColumn.append($('<a>',{
				id: 'removeLink:'+customer.basarNumber,
				text: 'Remove',
				href: '#',
				click: function(){
					$(content).remove();
					application.removeCustomer(customer);
				}
			}));
			content.appendTo('#customerTable');
		}
		appendRow(customers[i]);
	}
	$('#newCustomerButton').click(function() {
		window.location.href = 'customer-edit.html';
	});
});