(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('classnames')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'classnames'], factory) :
	(factory((global['target-ng-directive'] = {}),global._angular_core,global._angular_common,global.classnames));
}(this, (function (exports,_angular_core,_angular_common,classnames) { 'use strict';

classnames = classnames && classnames.hasOwnProperty('default') ? classnames['default'] : classnames;

var win = (window);
var TargetService = (function () {
    function TargetService() {
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    TargetService.prototype.getOffer = function (opts) {
        return new Promise(function (resolve, reject) {
            opts = opts || {};
            if (!opts.mbox) {
                reject('Mbox name not specified!');
            }
            var /** @type {?} */ atOpts = {
                mbox: opts.mbox,
                params: opts.params,
                timeout: opts.timeout,
                success: function (response) {
                    if (response && response.length > 0) {
                        resolve({
                            mbox: opts.mbox,
                            offer: response,
                            selector: opts.selector
                        });
                    }
                    else {
                        reject('Empty offer');
                    }
                },
                error: function (status, error) {
                    reject(error);
                }
            };
            win.adobe.target.getOffer(atOpts);
        });
    };
    /**
     * @param {?} offer
     * @return {?}
     */
    TargetService.prototype.applyOffer = function (offer) {
        return new Promise(function (resolve, reject) {
            win.adobe.target.applyOffer(offer);
            resolve();
        });
    };
    return TargetService;
}());
TargetService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
TargetService.ctorParameters = function () { return []; };

var TargetDirective = (function () {
    /**
     * @param {?} elementRef
     * @param {?} targetService
     */
    function TargetDirective(elementRef, targetService) {
        this.elementRef = elementRef;
        this.targetService = targetService;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    TargetDirective.prototype.addMboxClass = function (element) {
        element.className = classnames(element.className, {
            mboxDefault: element.className.indexOf('mboxDefault') === -1
        });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    TargetDirective.prototype.removeMboxClass = function (element) {
        element.className = element.className.replace(/\bmboxDefault\b/, '');
    };
    Object.defineProperty(TargetDirective.prototype, "mbox", {
        /**
         * @param {?} mboxOpts
         * @return {?}
         */
        set: function (mboxOpts) {
            var _this = this;
            var /** @type {?} */ el = this.elementRef.nativeElement;
            mboxOpts.selector = el;
            this.addMboxClass(el);
            this.targetService.getOffer(mboxOpts)
                .then(this.targetService.applyOffer)
                .then(function () { return _this.removeMboxClass(el); })
                .catch(function (e) {
                console.error(e);
                _this.removeMboxClass(el);
            });
        },
        enumerable: true,
        configurable: true
    });
    return TargetDirective;
}());
TargetDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[mbox]',
                providers: [TargetService]
            },] },
];
/**
 * @nocollapse
 */
TargetDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: TargetService, },
]; };
TargetDirective.propDecorators = {
    'mbox': [{ type: _angular_core.Input },],
};

var TargetModule = (function () {
    function TargetModule() {
    }
    /**
     * @return {?}
     */
    TargetModule.forRoot = function () {
        return {
            ngModule: TargetModule,
            providers: [TargetService]
        };
    };
    return TargetModule;
}());
TargetModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule
                ],
                declarations: [
                    TargetDirective
                ],
                exports: [
                    TargetDirective
                ]
            },] },
];
/**
 * @nocollapse
 */
TargetModule.ctorParameters = function () { return []; };

exports.TargetModule = TargetModule;
exports.TargetDirective = TargetDirective;
exports.TargetService = TargetService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
