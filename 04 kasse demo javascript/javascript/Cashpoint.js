
window.onload = function() {

	var model;
	if (window.name) {
		model = JSON.parse(window.name);
		model.artikel = [];
		model.aktuelleSumme = 0;
	} else {
		model = {
			customers : [ [ 1, 'Baranowski', 'Christian' ],
					[ 2, 'Tester', 'Christian' ] ],
			artikel : [],
			aktuelleSumme : 0,
			gewinn: 0
		};
		window.name = JSON.stringify(model);
	}

	var gewinn = document.getElementById('gewinn');
	gewinn.childNodes[0].nodeValue = model.gewinn;
	var betrag = document.getElementById('betrag');
	betrag.childNodes[0].nodeValue = model.aktuelleSumme;
	var umsatz = document.getElementById('umsatz');
	umsatz.childNodes[0].nodeValue = ((model.gewinn / 100) * 20);

	var parentHtmlElement = document.getElementById('artikelTabelle');

	var demoTable = new FlexTable(parentHtmlElement, [ 'Nr.', 'Basar Nummer',
			'Betrag', 'Beschreibung' ], model.artikel);
	demoTable.onRemoveClick = function(rowIndex, artikel) {
		model.aktuelleSumme -= artikel[2];
		var betrag = document.getElementById('betrag');
		betrag.childNodes[0].nodeValue = model.aktuelleSumme;
	};
	demoTable.setVisible(true);

	var hinzuButton = document.getElementById('hinzuButton');
	addEvent(hinzuButton, 'click', function() {
		var basarNumberTextField = document
				.getElementById('basarNumberTextField');
		var betragTextField = document.getElementById('betragTextField');
		var beschreibungTextField = document
				.getElementById('beschreibungTextField');
		var artikel = [];
		artikel[0] = model.artikel.length + 1;
		artikel[1] = basarNumberTextField.value;

		artikel[3] = beschreibungTextField.value;
		var isValidBasanummer = false;
		var customers = model.customers;
		for ( var row = 0; row < customers.length; row++) {
			if (customers[row][0] == artikel[1]) {
				isValidBasanummer = true;
				break;
			}
		}
		if (!isValidBasanummer) {
			basarNumberTextField.setAttribute('class', 'textFieldNotValid');
			basarNumberTextField.focus();
		} else if (isNaN(betragTextField.value) || betragTextField.value == '') {
			betragTextField.setAttribute('class', 'textFieldNotValid');
			betragTextField.focus();
		} else {
			artikel[2] = parseFloat(betragTextField.value);
			basarNumberTextField.setAttribute('class', 'textField');
			betragTextField.setAttribute('class', 'textField');
			model.artikel.push(artikel);
			demoTable.renderContent();
			model.aktuelleSumme += artikel[2];
			var betrag = document.getElementById('betrag');
			betrag.childNodes[0].nodeValue = model.aktuelleSumme;
			basarNumberTextField.value = '';
			betragTextField.value = '';
			beschreibungTextField.value = '';
		}
	});

	var bezahlenButton = document.getElementById('bezahlenButton');
	addEvent(bezahlenButton, 'click', function() {
		model.gewinn += model.aktuelleSumme;
		model.aktuelleSumme = 0;
		model.artikel = [];
		demoTable.model = model.artikel;
		demoTable.renderContent();
		var gewinn = document.getElementById('gewinn');
		gewinn.childNodes[0].nodeValue = model.gewinn;
		var betrag = document.getElementById('betrag');
		betrag.childNodes[0].nodeValue = model.aktuelleSumme;
		var umsatz = document.getElementById('umsatz');
		umsatz.childNodes[0].nodeValue = ((model.gewinn / 100) * 20);
		window.name = JSON.stringify(model);
	});

};