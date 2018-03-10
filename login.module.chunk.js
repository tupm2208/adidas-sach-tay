webpackJsonp(["login.module"],{

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page {\r\n    background-color: #00BCD4;\r\n    padding-left: 0;\r\n    max-width: 360px;\r\n    margin: 5% auto;\r\n    overflow-x: unset;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<body class=\"login-page\" id=\"login\">\r\n    <!-- Page Loader -->\r\n    <!-- #END# Page Loader -->\r\n    <!-- Overlay For Sidebars -->\r\n    <div class=\"overlay\"></div>\r\n    <div class=\"login-box\">\r\n        <div class=\"logo\">\r\n            <a href=\"javascript:void(0);\">Admin<b>BSB</b></a>\r\n            <small>Admin BootStrap Based - Material Design</small>\r\n        </div>\r\n        <div class=\"card\">\r\n            <div class=\"body\">\r\n                <form id=\"sign_in\" method=\"POST\">\r\n                    <div class=\"msg\">Sign in to start your session</div>\r\n                    <div class=\"input-group\">\r\n                        <span class=\"input-group-addon\">\r\n                          <i class=\"material-icons\">person</i>\r\n                      </span>\r\n                        <div class=\"form-line\">\r\n                            <input type=\"text\" class=\"form-control error\" name=\"username\" [(ngModel)]=\"sdt\" placeholder=\"sdt\" required autofocus>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"input-group\">\r\n                        <span class=\"input-group-addon\">\r\n                          <i class=\"material-icons\">lock</i>\r\n                      </span>\r\n                        <div class=\"form-line\">\r\n                            <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"mk\" placeholder=\"Password\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-xs-8 p-t-5\" (click)=\"changeCheck()\">\r\n                            <input type=\"checkbox\" name=\"rememberme\" [checked]=\"saveFlag\" class=\"filled-in chk-col-pink\">\r\n                            <label for=\"rememberme\">Remember Me</label>\r\n                        </div>\r\n                        <div class=\"col-xs-4\">\r\n                            <button class=\"btn btn-block bg-pink waves-effect\" type=\"submit\" (click)=\"login()\">SIGN IN</button>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row m-t-15 m-b--20\">\r\n                        <div class=\"col-xs-6\">\r\n                            <a [routerLink]=\"['/login/regist']\">Register Now!</a>\r\n                        </div>\r\n                        <div class=\"col-xs-6 align-right\">\r\n                            <a href=\"forgot-password.html\">Forgot Password?</a>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</body>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_api_login_service__ = __webpack_require__("../../../../../src/app/core/api/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_util_storage_service__ = __webpack_require__("../../../../../src/app/core/util/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_util_loading_service__ = __webpack_require__("../../../../../src/app/core/util/loading.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, router, storage, loading) {
        this.loginService = loginService;
        this.router = router;
        this.storage = storage;
        this.loading = loading;
    }
    LoginComponent.prototype.getSavedAccount = function () {
        this.saveFlag = this.storage.get('saveFlag');
        this.sdt = this.storage.get('sdt');
        this.mk = this.storage.get('mk');
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.getSavedAccount();
        // this.loading.show("login");
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        // $(function () {
        //   $('#sign_in').validate({
        //       highlight: function (input) {
        //           console.log(input);
        //           $(input).parents('.form-line').addClass('error');
        //       },
        //       unhighlight: function (input) {
        //           $(input).parents('.form-line').removeClass('error');
        //       },
        //       errorPlacement: function (error, element) {
        //           $(element).parents('.input-group').append(error);
        //       }
        //   });
        // });
        var _this = this;
        // setTimeout( () => $('.page-loader-wrapper').fadeOut(), 50);
        this.loading.show();
        setTimeout(function () {
            _this.loading.hide();
        }, 1000);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading.show();
        this.checkBeforeSaving();
        this.loginService.login({
            sdt: this.sdt,
            mk: this.mk
        }).subscribe(function (res) {
            if (res.status) {
                _this.storage.set('token', res.token);
                _this.gotoHome();
            }
            else {
                _this.loading.hide();
            }
        }, function (error) {
            console.log("error: ", error);
            _this.loading.hide();
        });
    };
    LoginComponent.prototype.checkBeforeSaving = function () {
        if (this.saveFlag) {
            this.storage.set('saveFlag', true);
            this.storage.set('sdt', this.sdt);
            this.storage.set('mk', this.mk);
        }
        else {
            this.storage.set('saveFlag', false);
            this.storage.set('sdt', null);
            this.storage.set('mk', null);
        }
    };
    LoginComponent.prototype.changeCheck = function () {
        this.saveFlag = !this.saveFlag;
    };
    LoginComponent.prototype.gotoHome = function () {
        this.router.navigate(['/home']);
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_api_login_service__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__core_util_storage_service__["a" /* StorageService */],
            __WEBPACK_IMPORTED_MODULE_4__core_util_loading_service__["a" /* LoadingService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__regist_regist_component__ = __webpack_require__("../../../../../src/app/login/regist/regist.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_routers__ = __webpack_require__("../../../../../src/app/login/login.routers.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__login_routers__["a" /* LoginRouters */]),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__login_component__["a" /* LoginComponent */], __WEBPACK_IMPORTED_MODULE_5__regist_regist_component__["a" /* RegistComponent */]]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.routers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginRouters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__regist_regist_component__ = __webpack_require__("../../../../../src/app/login/regist/regist.component.ts");


var LoginRouters = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__login_component__["a" /* LoginComponent */]
    }, {
        path: 'regist',
        component: __WEBPACK_IMPORTED_MODULE_1__regist_regist_component__["a" /* RegistComponent */]
    }
    // , {
    //     path: 'list',
    //     component: ListComponent
    // }, {
    //     path: 'upload',
    //     component: UploadComponent
    // }
];


/***/ }),

/***/ "../../../../../src/app/login/regist/regist.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".signup-page {\r\n    background-color: #00BCD4;\r\n    padding-left: 0;\r\n    max-width: 360px;\r\n    margin: 5% auto;\r\n    overflow-x: unset;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/regist/regist.component.html":
/***/ (function(module, exports) {

module.exports = "<body class=\"signup-page\">\r\n    <div class=\"signup-box\">\r\n        <div class=\"logo\">\r\n            <a href=\"javascript:void(0);\">Admin<b>BSB</b></a>\r\n            <small>Admin BootStrap Based - Material Design</small>\r\n        </div>\r\n        <div class=\"card\">\r\n            <div class=\"body\">\r\n                <form id=\"sign_up\" method=\"POST\">\r\n                    <div class=\"msg\">Register a new membership</div>\r\n                    <div class=\"input-group\">\r\n                        <span class=\"input-group-addon\">\r\n                          <i class=\"material-icons\">person</i>\r\n                      </span>\r\n                        <div class=\"form-line\">\r\n                            <input type=\"text\" class=\"form-control\" name=\"namesurname\" placeholder=\"Name Surname\" required autofocus>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"input-group\">\r\n                        <span class=\"input-group-addon\">\r\n                          <i class=\"material-icons\">email</i>\r\n                      </span>\r\n                        <div class=\"form-line\">\r\n                            <input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"Email Address\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"input-group\">\r\n                        <span class=\"input-group-addon\">\r\n                          <i class=\"material-icons\">lock</i>\r\n                      </span>\r\n                        <div class=\"form-line\">\r\n                            <input type=\"password\" class=\"form-control\" name=\"password\" minlength=\"6\" placeholder=\"Password\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"input-group\">\r\n                        <span class=\"input-group-addon\">\r\n                          <i class=\"material-icons\">lock</i>\r\n                      </span>\r\n                        <div class=\"form-line\">\r\n                            <input type=\"password\" class=\"form-control\" name=\"confirm\" minlength=\"6\" placeholder=\"Confirm Password\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"checkbox\" name=\"terms\" id=\"terms\" class=\"filled-in chk-col-pink\">\r\n                        <label for=\"terms\">I read and agree to the <a href=\"javascript:void(0);\">terms of usage</a>.</label>\r\n                    </div>\r\n\r\n                    <button class=\"btn btn-block btn-lg bg-pink waves-effect\" type=\"submit\">SIGN UP</button>\r\n\r\n                    <div class=\"m-t-25 m-b--5 align-center\">\r\n                        <a href=\"sign-in.html\">You already have a membership?</a>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</body>"

/***/ }),

/***/ "../../../../../src/app/login/regist/regist.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RegistComponent = /** @class */ (function () {
    function RegistComponent() {
    }
    RegistComponent.prototype.ngOnInit = function () {
    };
    RegistComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-regist',
            template: __webpack_require__("../../../../../src/app/login/regist/regist.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/regist/regist.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RegistComponent);
    return RegistComponent;
}());



/***/ })

});
//# sourceMappingURL=login.module.chunk.js.map