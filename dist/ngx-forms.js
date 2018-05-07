(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("reflect-metadata"), require("@angular/common"), require("ngx-quill"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "reflect-metadata", "@angular/common", "ngx-quill"], factory);
	else if(typeof exports === 'object')
		exports["ngxForms"] = factory(require("@angular/core"), require("@angular/forms"), require("reflect-metadata"), require("@angular/common"), require("ngx-quill"));
	else
		root["ngxForms"] = factory(root["@angular/core"], root["@angular/forms"], root["reflect-metadata"], root["@angular/common"], root["ngx-quill"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@angular/forms");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var FormButtonComponent = /** @class */ (function () {
    function FormButtonComponent() {
    }
    FormButtonComponent = __decorate([
        core_1.Component({
            selector: 'form-button',
            template: __webpack_require__(14)
        })
    ], FormButtonComponent);
    return FormButtonComponent;
}());
exports.FormButtonComponent = FormButtonComponent;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var FormInputComponent = /** @class */ (function () {
    function FormInputComponent() {
    }
    FormInputComponent = __decorate([
        core_1.Component({
            selector: 'form-input',
            template: __webpack_require__(15)
        })
    ], FormInputComponent);
    return FormInputComponent;
}());
exports.FormInputComponent = FormInputComponent;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var FormSelectComponent = /** @class */ (function () {
    function FormSelectComponent() {
    }
    FormSelectComponent = __decorate([
        core_1.Component({
            selector: 'form-select',
            template: __webpack_require__(16)
        })
    ], FormSelectComponent);
    return FormSelectComponent;
}());
exports.FormSelectComponent = FormSelectComponent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var FormTextEditorComponent = /** @class */ (function () {
    function FormTextEditorComponent() {
        this.quillToolbar = {
            toolbar: ['bold', 'italic', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }, { 'list': 'ordered' }, { 'list': 'bullet' }, 'blockquote', 'code-block', 'link']
        };
    }
    FormTextEditorComponent = __decorate([
        core_1.Component({
            selector: 'form-text-editor',
            template: __webpack_require__(17),
            styles: [__webpack_require__(18).toString()]
        })
    ], FormTextEditorComponent);
    return FormTextEditorComponent;
}());
exports.FormTextEditorComponent = FormTextEditorComponent;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var FormTextareaComponent = /** @class */ (function () {
    function FormTextareaComponent() {
    }
    FormTextareaComponent = __decorate([
        core_1.Component({
            selector: 'form-textarea',
            template: __webpack_require__(23)
        })
    ], FormTextareaComponent);
    return FormTextareaComponent;
}());
exports.FormTextareaComponent = FormTextareaComponent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var FormInputHidden = /** @class */ (function () {
    function FormInputHidden() {
    }
    FormInputHidden = __decorate([
        core_1.Component({
            selector: 'form-hidden',
            template: __webpack_require__(24)
        })
    ], FormInputHidden);
    return FormInputHidden;
}());
exports.FormInputHidden = FormInputHidden;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Shim for class decorators
__webpack_require__(9);
// Public API
__export(__webpack_require__(10));


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(11);
var forms_1 = __webpack_require__(1);
var ngx_quill_1 = __webpack_require__(12);
var dynamic_field_directive_1 = __webpack_require__(13);
var dynamic_form_component_1 = __webpack_require__(25);
var form_button_component_1 = __webpack_require__(2);
var form_input_component_1 = __webpack_require__(3);
var form_select_component_1 = __webpack_require__(4);
var form_textarea_component_1 = __webpack_require__(6);
var form_text_editor_component_1 = __webpack_require__(5);
var form_hidden_component_1 = __webpack_require__(7);
var NgxFormModule = /** @class */ (function () {
    function NgxFormModule() {
    }
    NgxFormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                ngx_quill_1.QuillModule
            ],
            declarations: [
                form_hidden_component_1.FormInputHidden,
                form_text_editor_component_1.FormTextEditorComponent,
                dynamic_field_directive_1.DynamicFieldDirective,
                dynamic_form_component_1.DynamicFormComponent,
                form_button_component_1.FormButtonComponent,
                form_input_component_1.FormInputComponent,
                form_select_component_1.FormSelectComponent,
                form_textarea_component_1.FormTextareaComponent
            ],
            exports: [
                dynamic_form_component_1.DynamicFormComponent
            ],
            entryComponents: [
                form_hidden_component_1.FormInputHidden,
                form_button_component_1.FormButtonComponent,
                form_input_component_1.FormInputComponent,
                form_select_component_1.FormSelectComponent,
                form_text_editor_component_1.FormTextEditorComponent,
                form_textarea_component_1.FormTextareaComponent
            ]
        })
    ], NgxFormModule);
    return NgxFormModule;
}());
exports.NgxFormModule = NgxFormModule;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("ngx-quill");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(1);
var form_button_component_1 = __webpack_require__(2);
var form_input_component_1 = __webpack_require__(3);
var form_select_component_1 = __webpack_require__(4);
var form_text_editor_component_1 = __webpack_require__(5);
var field_config_interface_1 = __webpack_require__(22);
var form_textarea_component_1 = __webpack_require__(6);
var form_hidden_component_1 = __webpack_require__(7);
var components = {
    button: form_button_component_1.FormButtonComponent,
    text: form_input_component_1.FormInputComponent,
    select: form_select_component_1.FormSelectComponent,
    editor: form_text_editor_component_1.FormTextEditorComponent,
    textarea: form_textarea_component_1.FormTextareaComponent,
    hidden: form_hidden_component_1.FormInputHidden
};
var DynamicFieldDirective = /** @class */ (function () {
    function DynamicFieldDirective(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    DynamicFieldDirective.prototype.ngOnChanges = function () {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    };
    DynamicFieldDirective.prototype.ngOnInit = function () {
        if (!components[this.config.type]) {
            var supportedTypes = Object.keys(components).join(', ');
            throw new Error("Trying to use an unsupported type (" + this.config.type + ").\n        Supported types: " + supportedTypes);
        }
        var component = this.resolver.resolveComponentFactory(components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_a = typeof field_config_interface_1.FieldConfig !== "undefined" && field_config_interface_1.FieldConfig) === "function" && _a || Object)
    ], DynamicFieldDirective.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_b = typeof forms_1.FormGroup !== "undefined" && forms_1.FormGroup) === "function" && _b || Object)
    ], DynamicFieldDirective.prototype, "group", void 0);
    DynamicFieldDirective = __decorate([
        core_1.Directive({
            selector: '[dynamicField]'
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof core_1.ComponentFactoryResolver !== "undefined" && core_1.ComponentFactoryResolver) === "function" && _c || Object, typeof (_d = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _d || Object])
    ], DynamicFieldDirective);
    return DynamicFieldDirective;
    var _a, _b, _c, _d;
}());
exports.DynamicFieldDirective = DynamicFieldDirective;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "<ng-container [formGroup]=\"group\">\n    <button class=\"btn btn-primary\" [disabled]=\"config.disabled\" (click)=\"submit()\">{{config.label}}</button>&nbsp;&nbsp;\n</ng-container>";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group row\" [formGroup]=\"group\">\n    <label class=\"col-md-2 font-weight-bold  col-form-label\" for=\"name\">{{config.label}}\n        <span [hidden]=\"!config.required\">*</span>\n    </label>\n    <div class=\"col-md-10\">\n        <input type=\"text\" class=\"form-control\" [attr.placeholder]=\"config.placeholder\" [formControlName]=\"config.name\">\n    </div>\n</div>";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group row\" [formGroup]=\"group\">\n    <label class=\"col-md-2 font-weight-bold col-form-label\" for=\"group\">{{config.label}}\n        <span [hidden]=\"!config.required\">*</span>\n    </label>\n    <div class=\"col-md-10\">\n        <select [formControlName]=\"config.name\" class=\"form-control\" >\n            <option *ngFor=\"let option of config.options\" [ngValue]=\"option\">{{option}}</option>\n        </select>\n    </div>\n</div>";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group row\" [formGroup]=\"group\">\n    <label class=\"col-md-2 font-weight-bold col-form-label\" for=\"group\" required>{{config.label}}\n        <span [hidden]=\"!config.required\">*</span>\n    </label>\n    <div class=\"col-md-10 editor-container\">\n        <quill-editor [modules]=\"quillToolbar\" [formControlName]=\"config.name\"></quill-editor>\n    </div>\n</div>";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(21)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./form-text-editor.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./form-text-editor.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)();
// imports


// module
exports.push([module.i, "form-text-editor .editor-container {\n  margin-bottom: 40px; }\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group row\" [formGroup]=\"group\">\n    <label class=\"col-md-2 font-weight-bold  col-form-label\" for=\"name\">{{config.label}}\n        <span [hidden]=\"!config.required\">*</span>\n    </label>\n    <div class=\"col-md-10\">\n        <textarea class=\"form-control\" rows=\"3\" [attr.placeholder]=\"config.placeholder\" [formControlName]=\"config.name\"></textarea>\n    </div>\n</div>";

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<ng-container [formGroup]=\"group\">\n    <input type=\"hidden\" class=\"form-control\" [formControlName]=\"config.name\">\n</ng-container>";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(1);
var DynamicFormComponent = /** @class */ (function () {
    function DynamicFormComponent(fb) {
        this.fb = fb;
        this.config = [];
    }
    Object.defineProperty(DynamicFormComponent.prototype, "controls", {
        get: function () { return this.config.filter(function (_a) {
            var type = _a.type;
            return type !== 'button';
        }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "changes", {
        get: function () { return this.form.valueChanges; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "valid", {
        get: function () { return this.form.valid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "value", {
        get: function () { return this.form.value; },
        enumerable: true,
        configurable: true
    });
    DynamicFormComponent.prototype.ngOnInit = function () {
        console.log(this.model);
        this.form = this.createGroup();
        if (this.model) {
            this.form.patchValue(this.model);
        }
    };
    DynamicFormComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.form) {
            var controls_1 = Object.keys(this.form.controls);
            var configControls_1 = this.controls.map(function (item) { return item.name; });
            controls_1
                .filter(function (control) { return !configControls_1.includes(control); })
                .forEach(function (control) { return _this.form.removeControl(control); });
            configControls_1
                .filter(function (control) { return !controls_1.includes(control); })
                .forEach(function (name) {
                var config = _this.config.find(function (control) { return control.name === name; });
                _this.form.addControl(name, _this.createControl(config));
            });
        }
    };
    DynamicFormComponent.prototype.createGroup = function () {
        var _this = this;
        var group = this.fb.group({});
        this.controls.forEach(function (control) { return group.addControl(control.name, _this.createControl(control)); });
        return group;
    };
    DynamicFormComponent.prototype.createControl = function (config) {
        var disabled = config.disabled, required = config.required, minLength = config.minLength, maxLength = config.maxLength, email = config.email, min = config.min, max = config.max, pattern = config.pattern, nullValidator = config.nullValidator, value = config.value;
        var validators = [];
        if (required != undefined && required) {
            validators.push(forms_1.Validators.required);
        }
        if (minLength != undefined) {
            validators.push(forms_1.Validators.minLength(minLength));
        }
        if (maxLength != undefined) {
            validators.push(forms_1.Validators.maxLength(maxLength));
        }
        if (email != undefined) {
            validators.push(forms_1.Validators.email);
        }
        if (min != undefined) {
            validators.push(forms_1.Validators.min(min));
        }
        if (max != undefined) {
            validators.push(forms_1.Validators.max(max));
        }
        if (pattern != undefined) {
            validators.push(forms_1.Validators.pattern(pattern));
        }
        if (nullValidator != undefined) {
            validators.push(forms_1.Validators.nullValidator);
        }
        return this.fb.control({ disabled: disabled, value: value }, validators);
    };
    DynamicFormComponent.prototype.setDisabled = function (name, disable) {
        if (this.form.controls[name]) {
            var method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }
        this.config = this.config.map(function (item) {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    };
    DynamicFormComponent.prototype.setValue = function (name, value) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DynamicFormComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicFormComponent.prototype, "model", void 0);
    DynamicFormComponent = __decorate([
        core_1.Component({
            exportAs: 'dynamicForm',
            selector: 'dynamic-form',
            template: __webpack_require__(26)
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object])
    ], DynamicFormComponent);
    return DynamicFormComponent;
    var _a;
}());
exports.DynamicFormComponent = DynamicFormComponent;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "<!-- <form class=\"dynamic-form\" [formGroup]=\"form\" (submit)=\"handleSubmit($event)\"> -->\n<form class=\"dynamic-form\" [formGroup]=\"form\">\n    <ng-container *ngFor=\"let field of config;\" dynamicField [config]=\"field\" [group]=\"form\">\n    </ng-container>\n</form>";

/***/ })
/******/ ]);
});