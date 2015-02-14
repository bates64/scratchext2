// variables and functions for use with extensions
var scratchext = {
    username: Scratch.INIT_DATA.LOGGED_IN_USER.model.username,
    creator: Scratch.INIT_DATA.PROJECT.model.creator,
    author: Scratch.INIT_DATA.LOGGED_IN_USER.model.username === Scratch.INIT_DATA.PROJECT.model.creator,
    installed: [],
    isShared: Scratch.FlashApp.model.attributes.isPublished,
    id: Scratch.INIT_DATA.PROJECT.model.id,
    libraries: {},
    root: 'http://scratchextproxy.x10.mx/?p=',
    
    css_root: 'http://scratchextproxy.x10.mx/?mime=text/css&p=',
    
    banner: {},
    settingsOpen: false
};

$.getScript(scratchext.root + 'font.js');

scratchext.getWiki = function(lib) {
    return 'http://grannycookies.github.io/scratchext2/help/' + lib + '/';
};

scratchext.projectJSON = function(id, callback) {
    $.get("http://projects.scratch.mit.edu/internalapi/project/"+id.toString()+"/get/", function(data) {
        callback(data);
    });
}

scratchext.projectJSON(scratchext.id, function(data) {
    try {
        scratchext.projectExtensions = data.info.savedExtensions.map(function(e){return e.extensionName}); //This tells which extensions were installed at the moment the project was last saved
    } catch(e) {
        scratchext.projectExtensions = []; //In case the project doesn't use any extensions.
    }
});

scratchext.editMode = function() {
    return Scratch.FlashApp.isEditMode;
};

scratchext.notes = function() {
    var notes;
    if(scratchext.username === scratchext.creator) {
        // the current user made this project
        notes = $('textarea[name=description]').text().replace(/\s/g, "").toUpperCase();
    } else {
        // project was not shared by the current user
        notes = $('.overview:eq(1)').text().replace(/\s/g, "").toUpperCase();
    }

    return notes;
};

scratchext.install = function(name, descriptor, extension) {
	scratchext.installed.push(name);
	scratchext.log('Installed extension "'+name+'"!');
	ScratchExtensions.register(name, descriptor, extension);
};

scratchext.log = function(string, color) {
    if(color===undefined)
        color = '#4A9EE2';

    // filter out MSU etc to only allow "debug" to be shown in js console
    console.debug('%c[%cScratchExt%c] %c'+string, 'color: white;', 'color: #986fe6;', 'color: white;', 'color: '+color+';');
}

scratchext.addCSS = function(url) {
    var link = window.document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.getElementsByTagName("HEAD")[0].appendChild(link);
};

// show/hide scratchext editor button if in editor or not
scratchext.editShow = function() {
    if(scratchext.editMode()) {
        $('.editorOnly').show();
        $('.playerOnly').hide();
    } else {
        $('.editorOnly').hide();
        $('.playerOnly').show();
    }
    
    setTimeout(scratchext.editShow, 100);
};

// from pixie.js- scratch-style prompts
$('head').append('<style type="text/css">.cookievars-no-select{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.cookievars-dialog{position:fixed;left:0;top:0;z-index:9999;color:#5c5d5f;text-align:center;border-radius:7px 7px 0 0;box-shadow:3px 3px 8px rgba(51,51,51,.75);text-shadow:none}.cookievars-dialog-title{display:block;border:1px solid #b0b0b0;border-radius:7px 7px 0 0;background:linear-gradient(#e0e0e0,#d0d0d0);font-size:14px;height:30px;line-height:30px;padding:0 14px;cursor:default}.cookievars-dialog-content{background:#fff;padding:14px;border:1px solid #b0b0b0;border-top:0;font-size:14px;line-height:normal}.cookievars-dialog .iframeshim{border-radius:7px 7px 0 0}.cookievars-dialog-label{display:block;margin-bottom:14px;font-size:inherit;line-height:inherit;color:inherit}.cookievars-dialog-buttons{margin-top:14px}button.cookievars-ui-button{min-width:51px;margin:0 5px;border:1px solid #d0d1d2;border-radius:6px;padding:0 7px 1px;height:26px;background:linear-gradient(#fff,#e6e8e8);color:#5c5d5f;font:inherit;font-size:12px;white-space:nowrap;box-shadow:none;transition:none;text-shadow:none;cursor:default}button.cookievars-ui-button:hover{background:#179fd7;color:#fff;font-weight:400}.cookievars-dialog-field{margin:0 0 0 8px;padding:4px 1px;border:1px solid #d0d1d2;border-radius:0;background:#fff;font:inherit;font-size:12px;outline:0;-webkit-appearance:none;display:inline-block;width:auto;height:auto;box-shadow:none}</style>');
function el(tagName, className) {
	var d = document.createElement(className ? tagName : 'div');
	d.className = className || tagName || '';
	return d;
}
scratchext.dialog = {
	Dialog: function(title, content) {
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
};

/*this.Dialog.defineProperty = function(Dialog.prototype, 'title', {
	get: function() {return this._title},
	set: function(value) {this._title = this.elTitle.textContent = value}
});*/
scratchext.dialog.Dialog.prototype.padding = 4;
scratchext.dialog.Dialog.prototype.moveTo = function(x, y) {
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
scratchext.dialog.Dialog.prototype.show = function(editor) {
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
scratchext.dialog.Dialog.prototype.focusFirst = function(el) {
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
scratchext.dialog.Dialog.prototype.hide = function() {
	if (this.editor) {
		document.body.removeChild(this.el);
		this.editor = null;
	}
	return this;
};
scratchext.dialog.Dialog.prototype.commit = function() {
	if (this.oncommit) this.oncommit();
	this.hide();
	return this;
};
scratchext.dialog.Dialog.prototype.cancel = function() {
	if (this.oncancel) this.oncancel();
	this.hide();
	return this;
};
scratchext.dialog.Dialog.alert = function(title, text, button, fn, context) {
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
scratchext.dialog.Dialog.label = function(text) {
	var div = el('cookievars-dialog-label');
	div.textContent = text;
	return div;
};
scratchext.dialog.Dialog.Field = function(label, value) {
	this.value = '';
	this.el = el('label', 'cookievars-dialog-label');
	this.el.textContent = label;
	this.field = el('input', 'cookievars-dialog-field');
	if (value != null) this.field.value = value;
	this.field.addEventListener('input', this.change.bind(this));
	this.el.appendChild(this.field);
};
scratchext.dialog.Dialog.Field.prototype.change = function() {
	this.value = this.field.value;
};
scratchext.dialog.Dialog.content = function() {
	var div = el('');
	var a = [].slice.call(arguments);
	for (var i = 0, l = a.length; i < l; i++) {
		div.appendChild(a[i]);
	}
	return div;
};
scratchext.dialog.Dialog.buttons = function() {
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
scratchext.dialog.Dialog.prototype.keyDown = function(e) {
	if (e.keyCode === 13) {
		this.commit();
	}
	if (e.keyCode === 27) {
		this.cancel();
	}
};
scratchext.dialog.Dialog.prototype.mouseDown = function(e) {
	if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT' || e.target.tagName === 'LABEL') return;
	this.dragX = this.x - e.clientX;
	this.dragY = this.y - e.clientY;
	document.addEventListener('mousemove', this.mouseMove);
	document.addEventListener('mouseup', this.mouseUp);
};
scratchext.dialog.Dialog.prototype.mouseMove = function(e) {
	this.moveTo(this.dragX + e.clientX, this.dragY + e.clientY);
};
scratchext.dialog.Dialog.prototype.mouseUp = function(e) {
	this.moveTo(this.dragX + e.clientX, this.dragY + e.clientY);
	document.removeEventListener('mousemove', this.mouseMove);
	document.removeEventListener('mouseup', this.mouseUp);
};

scratchext.editShow();
// tell other file that scratchext has loaded
go();
