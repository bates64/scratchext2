/* Extension using the JavaScript localStorage API */
/* By djdolphin */

(function() {
	if (!localStorage.cookieVars) localStorage.cookieVars = '{}';
	var projectID = Scratch.INIT_DATA.PROJECT.model.id,
		cookieVars = JSON.parse(localStorage.cookieVars)[projectID] || {},
		editor = Scratch.FlashApp.ASobj;
	$('head').append('<style type="text/css">.cookievars-no-select{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.cookievars-dialog{position:fixed;left:0;top:0;z-index:9999;color:#5c5d5f;text-align:center;border-radius:7px 7px 0 0;box-shadow:3px 3px 8px rgba(51,51,51,.75);text-shadow:none}.cookievars-dialog-title{display:block;border:1px solid #b0b0b0;border-radius:7px 7px 0 0;background:linear-gradient(#e0e0e0,#d0d0d0);font-size:14px;height:30px;line-height:30px;padding:0 14px;cursor:default}.cookievars-dialog-content{background:#fff;padding:14px;border:1px solid #b0b0b0;border-top:0;font-size:14px;line-height:normal}.cookievars-dialog .iframeshim{border-radius:7px 7px 0 0}.cookievars-dialog-label{display:block;margin-bottom:14px;font-size:inherit;line-height:inherit;color:inherit}.cookievars-dialog-buttons{margin-top:14px}button.cookievars-ui-button{min-width:51px;margin:0 5px;border:1px solid #d0d1d2;border-radius:6px;padding:0 7px 1px;height:26px;background:linear-gradient(#fff,#e6e8e8);color:#5c5d5f;font:inherit;font-size:12px;white-space:nowrap;box-shadow:none;transition:none;text-shadow:none;cursor:default}button.cookievars-ui-button:hover{background:#179fd7;color:#fff;font-weight:400}.cookievars-dialog-field{margin:0 0 0 8px;padding:4px 1px;border:1px solid #d0d1d2;border-radius:0;background:#fff;font:inherit;font-size:12px;outline:0;-webkit-appearance:none;display:inline-block;width:auto;height:auto;box-shadow:none}</style>');
	function el(tagName, className) {
		var d = document.createElement(className ? tagName : 'div');
		d.className = className || tagName || '';
		return d;
	}
	function Dialog(title, content) {
		this.el = el('cookievars-dialog cookievars-no-select');
		this.el.appendChild(this.elTitle = el('cookievars-dialog-title'));
		this.el.appendChild(this.elContent = content || el('cookievars-dialog-content'));
		if (content) content.classList.add('cookievars-dialog-content');
		this.el.addEventListener('keydown', this.keyDown.bind(this));
		this.el.addEventListener('mousedown', this.mouseDown.bind(this));
		this.mouseMove = this.mouseMove.bind(this);
		this.mouseUp = this.mouseUp.bind(this);
		this.title = title;
		this.x = 0;
		this.y = 0;
	}
	Object.defineProperty(Dialog.prototype, 'title', {
		get: function() {return this._title},
		set: function(value) {this._title = this.elTitle.textContent = value}
	});
	Dialog.prototype.padding = 4;
	Dialog.prototype.moveTo = function(x, y) {
		var p = this.padding; // NS
		var bb = this.el.getBoundingClientRect();
		x = Math.max(p, Math.min(innerWidth - bb.width - p, x));
		y = Math.max(p, Math.min(innerHeight - bb.height - p, y));
		if (this.x === x && this.y === y) return;
		this.x = x;
		this.y = y;
		this.el.style.WebkitTransform =
		this.el.style.MozTransform =
		this.el.style.msTransform =
		this.el.style.OTransform =
		this.el.style.transform = 'translate('+(x|0)+'px,'+(y|0)+'px)';
	};
	Dialog.prototype.show = function(editor) {
		this.editor = editor;
		document.body.appendChild(this.el);
		var ebb = editor.getBoundingClientRect();
		var tbb = this.el.getBoundingClientRect();
		this.width = tbb.width | 0;
		this.height = tbb.height | 0;
		this.moveTo(Math.floor((Math.max(0, ebb.left) + Math.min(innerWidth, ebb.right) - tbb.width) / 2), Math.floor((Math.max(0, ebb.top) + Math.min(innerHeight, ebb.bottom) - tbb.height) / 2));
		this.focusFirst(this.elContent);
		return this;
	};
	Dialog.prototype.focusFirst = function(el) {
		if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'BUTTON') {
			el.focus();
			return true;
		}
		var c = el.childNodes;
		for (var i = 0, l = c.length; i < l; i++) {
			if (this.focusFirst(c[i])) return true;
		}
		return false;
	};
	Dialog.prototype.hide = function() {
		if (this.editor) {
			document.body.removeChild(this.el);
			this.editor = null;
		}
		return this;
	};
	Dialog.prototype.commit = function() {
		if (this.oncommit) this.oncommit();
		this.hide();
		return this;
	};
	Dialog.prototype.cancel = function() {
		if (this.oncancel) this.oncancel();
		this.hide();
		return this;
	};
	Dialog.alert = function(title, text, button, fn, context) {
		if (typeof button === 'function' || button == null) {
			context = fn;
			fn = button;
			button = 'OK';
		}
		var d = new Dialog(title, Dialog.content(
			Dialog.label(text),
			Dialog.buttons(
				[button, function() {d.commit()}])));
		if (fn) d.oncommit = fn.bind(context);
		return d;
	};
	Dialog.label = function(text) {
		var div = el('cookievars-dialog-label');
		div.textContent = text;
		return div;
	};
	Dialog.Field = function(label, value) {
		this.value = '';
		this.el = el('label', 'cookievars-dialog-label');
		this.el.textContent = label;
		this.field = el('input', 'cookievars-dialog-field');
		if (value != null) this.field.value = value;
		this.field.addEventListener('input', this.change.bind(this));
		this.el.appendChild(this.field);
	};
	Dialog.Field.prototype.change = function() {
		this.value = this.field.value;
	};
	Dialog.content = function() {
		var div = el('');
		var a = [].slice.call(arguments);
		for (var i = 0, l = a.length; i < l; i++) {
			div.appendChild(a[i]);
		}
		return div;
	};
	Dialog.buttons = function() {
		var div = el('cookievars-dialog-buttons');
		var a = [].slice.call(arguments);
		for (var i = 0, l = a.length; i < l; i++) {
			var b = a[i];
			if (typeof b !== 'object') b = [b, b];
			var button = el('button', 'cookievars-ui-button');
			button.textContent = b[0];
			div.appendChild(button);
			if (b[1]) button.addEventListener('click', b[1]);
		}
		return div;
	};
	Dialog.prototype.keyDown = function(e) {
		if (e.keyCode === 13) {
			this.commit();
		}
		if (e.keyCode === 27) {
			this.cancel();
		}
	};
	Dialog.prototype.mouseDown = function(e) {
		if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT' || e.target.tagName === 'LABEL') return;
		this.dragX = this.x - e.clientX;
		this.dragY = this.y - e.clientY;
		document.addEventListener('mousemove', this.mouseMove);
		document.addEventListener('mouseup', this.mouseUp);
	};
	Dialog.prototype.mouseMove = function(e) {
		this.moveTo(this.dragX + e.clientX, this.dragY + e.clientY);
	};
	Dialog.prototype.mouseUp = function(e) {
		this.moveTo(this.dragX + e.clientX, this.dragY + e.clientY);
		document.removeEventListener('mousemove', this.mouseMove);
		document.removeEventListener('mouseup', this.mouseUp);
	};
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
		ScratchExtensions.register('Cookie Variables', descriptor, ext);
	}
	
	function reloadExtension() {
		ScratchExtensions.unregister('Cookie Variables');
		loadExtension();
	}
	loadExtension();
})();
