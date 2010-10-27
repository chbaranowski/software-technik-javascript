function FlexTable(parent, columns, model) {
    this.model = model;
    this.parent = parent;
    this.columns = columns;
};

FlexTable.prototype.setVisible = function(visible) {
    this.visible = visible;
    if (visible == true) {
        this._renderTable();
    }
    else {
        this._hideTable();
    }
};

FlexTable.prototype._renderTable = function() {
    if (!this._htmlTable) {
        this._htmlTable = document.createElement('table');
        this._renderHeader();
        this.renderContent();
    }
    this.parent.appendChild(this._htmlTable);
};

FlexTable.prototype._hideTable = function() {
    if (this._htmlTable) {
        this.parent.removeChild(this._htmlTable);
    }
};

FlexTable.prototype._renderHeader = function() {
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    for (var i = 0; i < this.columns.length; i++) {
        this._appendTextColumn(tr, this.columns[i]);
    }
    this._appendTextColumn(tr, '');
    thead.appendChild(tr);
    this._htmlTable.appendChild(thead);
};

FlexTable.prototype._appendTextColumn = function(tr, text) {
    var td = document.createElement('td');
    var columnTextNode = document.createTextNode(text);
    td.appendChild(columnTextNode);
    tr.appendChild(td);
};

FlexTable.prototype.renderContent = function() {
    var tbody = document.createElement('tbody');
    for (var row = 0; row < this.model.length; row++) {
        var rowModel = this.model[row];
        var tr = document.createElement('tr');
        for (var i = 0; i < this.columns.length; i++) {
            this._appendTextColumn(tr, rowModel[i]);
        }
        this._appendLinks(tbody, tr, row);
        tbody.appendChild(tr);
    }
    if (this._htmlTBody) {
        this._htmlTable.replaceChild(tbody, this._htmlTBody);
    } else {
        this._htmlTable.appendChild(tbody);
    }
    this._htmlTBody = tbody;
};

FlexTable.prototype._appendLinks = function(tbody, tr, rowIndex) {
    var that = this;
    var td = document.createElement('td');
    if(that.onEditClick){
	    var editLink = this._createLink(td, 'editLinkClass', 'Edit');
	    var whiteSpaceTextNode = document.createTextNode(' ');
	    td.appendChild(whiteSpaceTextNode);
	    addEvent(editLink, 'click', function() {
	        that.onEditClick(rowIndex);
	    });
    }
    if(that.onRemoveClick){
	    var removeLink = this._createLink(td, 'removeLinkClass', 'Remove');
	    tr.appendChild(td);
	    addEvent(removeLink, 'click', function() {
	        var model = that.model.splice(rowIndex, 1);
	        that.renderContent();
	        that.onRemoveClick(rowIndex, model[0]);
	    });
    }
};

FlexTable.prototype._createLink = function(parent, cssClass, text) {
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', cssClass);
    var aTextNode = document.createTextNode(text);
    a.appendChild(aTextNode);
    parent.appendChild(a);
    return a;
};

