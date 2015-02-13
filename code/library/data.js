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
