/* Extension using the JavaScript localStorage API */
/* By djdolphin */

(function() {
	if (!localStorage.cookieVars) localStorage.cookieVars = '{}';
	var projectID = Scratch.INIT_DATA.PROJECT.model.id,
		cookieVars = JSON.parse(localStorage.cookieVars)[projectID] || {},
		editor = Scratch.FlashApp.ASobj;
	
	function DescriptorBuilder(descriptor) {
		this.descriptor = descriptor;
	}
	DescriptorBuilder.prototype.addBlock = function(type, label, op, defaultArgs) {
		if (!this.descriptor.blocks) this.descriptor.blocks = [];
		var block = [type, label, op];
		if (defaultArgs instanceof Array) for (var i = 0; i < defaultArgs.length; i++) block.push(defaultArgs[i]);
		this.descriptor.blocks.push(block);
	};
	DescriptorBuilder.prototype.addButton = function(label, action) {
		if (!this.descriptor.blocks) this.descriptor.blocks = [];
		this.descriptor.blocks.push([null, label, action]);
	}
	DescriptorBuilder.prototype.addSpace = function(height) {
		if (!this.descriptor.blocks) this.descriptor.blocks = [];
		if (height === undefined) height = 1;
		var s = '';
		for (var i = 0; i < height; i++) s += '-';
		this.descriptor.blocks.push([s]);
	};
	DescriptorBuilder.prototype.addMenu = function(name, menu) {
		if (!this.descriptor.menus) this.descriptor.menus = {};
		this.descriptor.menus[name] = menu;
	}
	var extBase = {};
	extBase._shutdown = function() {
		var cookieVarBank = JSON.parse(localStorage.cookieVars);
		cookieVarBank[projectID] = cookieVars;
		localStorage.cookieVars = JSON.stringify(cookieVarBank);
	};
	extBase._getStatus = function() {
		return {status: 2, msg: 'Ready'};
	};
	extBase.makeCookieVar = function() {
		var name = new Dialog.Field('Variable name:');
		var d = new Dialog('New Cookie Variable', Dialog.content(
			name.el,
			Dialog.buttons(
				['OK', function() {d.commit()}],
				['Cancel', function() {d.hide()}]
			)
		));
		d.oncommit = function() {
			if (name.value in cookieVars) Dialog.alert('Cannot Add', 'That name is already in use.').show(editor)
			else {
				cookieVars[name.value] = '';
				reloadExtension();
			}
		};
		d.show(editor);
	};
	extBase.deleteCookieVar = function() {
		var name = new Dialog.Field('Variable name:');
		var d = new Dialog('Delete a Cookie Variable', Dialog.content(
			name.el,
			Dialog.buttons(
				['OK', function() {d.commit()}],
				['Cancel', function() {d.hide()}]
			)
		));
		d.oncommit = function() {
			if (!(name.value in cookieVars)) Dialog.alert('Cannot Delete', 'A variable with that name does not exist.').show(editor)
			else {
				delete cookieVars[name.value];
				reloadExtension();
			}
		};
		d.show(editor);
	};
	extBase.setCookieVar = function(varName, value) {
		var shouldReload = false;
		if (!(varName in cookieVars)) shouldReload = true;
		varName = varName.substr(3);
		cookieVars[varName] = value;
		if (shouldReload) reloadExtension();
	}
	extBase.changeCookieVar = function(varName, amount) {
		var shouldReload = false;
		if (!(varName in cookieVars)) shouldReload = true;
		varName = varName.substr(3);
		cookieVars[varName] = (Number(cookieVars[varName]) || 0) + amount;
		if (shouldReload) reloadExtension();
	}
	function loadExtension() {
		var ext = Object.create(extBase),
			varNames = Object.getOwnPropertyNames(cookieVars),
			descriptor = {};
		var db = new DescriptorBuilder(descriptor);
		db.addButton('Make a Cookie Variable', 'makeCookieVar');
		if (varNames.length > 0) {
			var defaultVar = '\ud83c\udf6a ' + varNames[varNames.length - 1],
				varName, escapedVarName;
			db.addButton('Delete a Cookie Variable', 'deleteCookieVar');
			db.addSpace();
			for (var i = 0; i < varNames.length; i++) {
				varName = varNames[i];
				escapedVarName = varName.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g, '\\n');
				db.addBlock('r', '\ud83c\udf6a ' + varName, 'getCookieVar:' + varName);
				ext['getCookieVar:' + varName] = (new Function("return this['" + escapedVarName + "']")).bind(cookieVars);
			}
			db.addSpace();
			db.addBlock(' ', 'set %m.cookieVar to %s', 'setCookieVar', [defaultVar, 0]);
			db.addBlock(' ', 'change %m.cookieVar by %n', 'changeCookieVar', [defaultVar, 1]);
			var cookieVarMenu = [];
			for (i = 0; i < varNames.length; i++) cookieVarMenu.push('\ud83c\udf6a ' + varNames[i]);
			db.addMenu('cookieVar', cookieVarMenu);
		}
		scratchext.install('Data', descriptor, ext);
	}
	
	function reloadExtension() {
		ScratchExtensions.unregister('Data');
		loadExtension();
	}
	loadExtension();
})();
