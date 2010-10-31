var Application = function(){
	
	var Customer = function(basarNumber, firstName, lastName){
		this.basarNumber = basarNumber;
		this.firstName = firstName;
		this.lastName = lastName;
	};
	
	var model = createModel();
	
	function createModel(){
		if (window.name) {
			return $.evalJSON(window.name);
		} else {
			return {
				nextCustomerId: 3,
				customers : {
				   '1': new Customer( 1, 'Baranowski', 'Christian' ),
				   '2': new Customer( 2, 'Tester', 'Christian')
				}
			};
		}
	}
	
	function saveModel(){
		window.name = $.toJSON(model);
	}
	
	this.getCustomerbyId = function(customerId){
		return model.customers[customerId];
	};

	this.createCustomer = function(){
		return new Customer(model.nextCustomerId++, '', '');
	};
	
	this.getCustomers = function(){
		var customers = [];
		for(var customer in model.customers){
			customers.push(model.customers[customer]);
		}
		return customers;
	};
	
	this.saveCustomer = function(customer){
		model.customers[customer.basarNumber] = customer;
		saveModel();
	};
	
	this.removeCustomer = function(customer){
		delete model.customers[customer.basarNumber];
		saveModel();
	};
	
};
