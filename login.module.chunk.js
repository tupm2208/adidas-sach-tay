webpackJsonp(["login.module"],{

/***/ "../../../../../src/app/login/change-password/change-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".signup-page {\n    background-color: #00BCD4;\n    padding-left: 0;\n    max-width: 360px;\n    margin: 5% auto;\n    overflow-x: unset;\n}\n\n.input-group {\n    width: 100%;\n    margin-bottom: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/change-password/change-password.component.html":
/***/ (function(module, exports) {

module.exports = "<body *ngIf=\"user.makh\" class=\"signup-page\">\n    <div class=\"signup-box\">\n        <div class=\"logo\">\n            <a>Kokoro<b>SHOP</b></a>\n             <small>Change Password</small> \n        </div>\n        <div class=\"card\">\n            <div class=\"body\">\n                <form id=\"sign_up\" method=\"POST\">\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">lock</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"password\" class=\"form-control\" [(ngModel)]=\"oldPass\" name=\"oldPass\" minlength=\"6\" placeholder=\"Old Password\" required>\n                        </div>\n                    </div>\n                      <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">lock</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"password\" class=\"form-control\" [(ngModel)]=\"newPass\" name=\"newPass\" minlength=\"6\" placeholder=\"New Password\" required>\n                        </div>\n                    </div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">lock</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"password\" class=\"form-control\" [(ngModel)]=\"cfPass\" name=\"confirmNewPass\" minlength=\"6\" placeholder=\"Confirm New Password\" required>\n                        </div>\n                    </div>\n\n                    <button class=\"btn btn-block btn-lg bg-pink waves-effect\" (click)=\"submit()\" type=\"submit\">SUBMIT</button>\n                </form>\n            </div>\n        </div>\n    </div>\n</body>\n\n<body *ngIf=\"!user.makh\" class=\"four-zero-four\">\n    <div class=\"four-zero-four-container\">\n        <div class=\"error-code\"><i class=\"material-icons\" style=\"font-size: inherit;color: darkgrey;\">face</i></div>\n        <div class=\"error-message\">Xin Hãy Đăng Nhập!</div>\n        <a routerLink=\"/login\">Go to Login</a>\n    </div>\n</body>"

/***/ }),

/***/ "../../../../../src/app/login/change-password/change-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_api_user_service__ = __webpack_require__("../../../../../src/app/core/api/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_util_storage_service__ = __webpack_require__("../../../../../src/app/core/util/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_util_loading_service__ = __webpack_require__("../../../../../src/app/core/util/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_dialog_popup_popup_service__ = __webpack_require__("../../../../../src/app/core/dialog/popup/popup.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(userService, storageService, loading, popup, router) {
        this.userService = userService;
        this.storageService = storageService;
        this.loading = loading;
        this.popup = popup;
        this.router = router;
        this.user = {};
        this.oldPass = '';
        this.newPass = '';
        this.cfPass = '';
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading.show();
        var userInfor = this.storageService.get('userInfo');
        if (userInfor && userInfor.makh) {
            this.userService.getById(userInfor.makh).subscribe(function (data) {
                _this.user = data.data;
                _this.loading.hide();
                setTimeout(function () { _this.initValidate(); }, 100);
            }, function (error) {
                _this.loading.hide();
            });
        }
    };
    ChangePasswordComponent.prototype.initValidate = function () {
        $('#sign_up').validate({
            rules: {
                'terms': {
                    required: true
                },
                'confirm': {
                    equalTo: '[name="password"]'
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.input-group').append(error);
                $(element).parents('.form-group').append(error);
            }
        });
    };
    ChangePasswordComponent.prototype.submit = function () {
        var _this = this;
        if (!this.checkMatch())
            return;
        this.loading.show();
        this.user.mk = this.newPass;
        this.userService.update(this.user).subscribe(function (data) {
            _this.loading.hide();
            _this.popup.showSuccess().subscribe(function (data) {
                _this.router.navigate(['login']);
            });
        }, function (error) {
            _this.popup.showError();
            _this.loading.hide();
        });
    };
    ChangePasswordComponent.prototype.checkMatch = function () {
        if (this.oldPass != this.user.mk) {
            this.popup.showWanning("Wrong password!");
            return false;
        }
        if (this.newPass != this.cfPass) {
            this.popup.showWanning("The confirm password must match the new password!");
            return false;
        }
        return true;
    };
    ChangePasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-change-password',
            template: __webpack_require__("../../../../../src/app/login/change-password/change-password.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/change-password/change-password.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_api_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__core_util_storage_service__["a" /* StorageService */],
            __WEBPACK_IMPORTED_MODULE_3__core_util_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_4__core_dialog_popup_popup_service__["a" /* PopupService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page {\n    background-color: #00BCD4;\n    padding-left: 0;\n    max-width: 360px;\n    margin: 5% auto;\n    overflow-x: unset;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<body class=\"login-page\" id=\"login\">\n    <!-- Page Loader -->\n    <!-- #END# Page Loader -->\n    <!-- Overlay For Sidebars -->\n    <div class=\"overlay\"></div>\n    <div class=\"login-box\">\n        <div class=\"logo\">\n            <a href=\"javascript:void(0);\">Admin<b>BSB</b></a>\n            <small>Admin BootStrap Based - Material Design</small>\n        </div>\n        <div class=\"card\">\n            <div class=\"body\">\n                <form id=\"sign_in\" method=\"POST\">\n                    <div class=\"msg\">Sign in to start your session</div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">person</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"text\" class=\"form-control error\" name=\"username\" [(ngModel)]=\"email\" placeholder=\"email\" required autofocus>\n                        </div>\n                    </div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">lock</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"password\" placeholder=\"Password\" required>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-xs-8 p-t-5\" (click)=\"changeCheck()\">\n                            <input type=\"checkbox\" name=\"rememberme\" [checked]=\"saveFlag\" class=\"filled-in chk-col-pink\">\n                            <label for=\"rememberme\">Remember Me</label>\n                        </div>\n                        <div class=\"col-xs-4\">\n                            <button class=\"btn btn-block bg-pink waves-effect\" type=\"submit\" (click)=\"login()\">SIGN IN</button>\n                        </div>\n                    </div>\n                    <div class=\"row m-t-15 m-b--20\">\n                        <div class=\"col-xs-6\">\n                            <a [routerLink]=\"['/login/regist']\">Register Now!</a>\n                        </div>\n                        <!-- <div class=\"col-xs-6 align-right\">\n                            <a href=\"forgot-password.html\">Forgot Password?</a>\n                        </div> -->\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</body>"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_api_user_service__ = __webpack_require__("../../../../../src/app/core/api/user.service.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
    function LoginComponent(loginService, router, storage, loading, userService) {
        this.loginService = loginService;
        this.router = router;
        this.storage = storage;
        this.loading = loading;
        this.userService = userService;
    }
    LoginComponent.prototype.getSavedAccount = function () {
        this.saveFlag = this.storage.get('saveFlag');
        this.email = this.storage.get('email');
        this.password = this.storage.get('password');
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.getSavedAccount();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading.show();
        this.checkBeforeSaving();
        var strategy = "local";
        this.loginService.login({
            strategy: strategy,
            email: this.email,
            password: this.password
        }).subscribe(function (res) {
            console.log("login succeess: ", res);
            _this.storage.set("accessToken", res.accessToken);
            _this.userService.list().subscribe(function (success) {
                console.log("success.data.length", success.data);
                var user = {};
                if (success.data.length === 1) {
                    user = __assign({}, success.data[0]);
                }
                else {
                    user.role = "admin";
                }
                _this.storage.set('userInfo', user);
                _this.gotoHome(user);
            }, function (error) {
                console.log("cannot get user");
            });
        }, function (error) {
            console.log("error: ", error);
            _this.loading.hide();
        });
    };
    LoginComponent.prototype.checkBeforeSaving = function () {
        if (this.saveFlag) {
            this.storage.set('saveFlag', true);
            this.storage.set('email', this.email);
            this.storage.set('password', this.password);
        }
        else {
            this.storage.set('saveFlag', false);
            this.storage.set('email', null);
            this.storage.set('password', null);
        }
    };
    LoginComponent.prototype.changeCheck = function () {
        this.saveFlag = !this.saveFlag;
    };
    LoginComponent.prototype.gotoHome = function (res) {
        switch (res.role) {
            case 'admin':
                this.router.navigate(['/home']);
                break;
            case 'client':
            case 'client':
                this.router.navigate(['/client/']);
                break;
            case 'payment':
                this.router.navigate(['/payment']);
                break;
            case 'receiver-consumer':
                this.router.navigate(['/receiver-consumer']);
                break;
            default:
                console.log("invalid request");
                break;
        }
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
            __WEBPACK_IMPORTED_MODULE_4__core_util_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5__core_api_user_service__["a" /* UserService */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__change_password_change_password_component__ = __webpack_require__("../../../../../src/app/login/change-password/change-password.component.ts");
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
            declarations: [__WEBPACK_IMPORTED_MODULE_4__login_component__["a" /* LoginComponent */], __WEBPACK_IMPORTED_MODULE_5__regist_regist_component__["a" /* RegistComponent */], __WEBPACK_IMPORTED_MODULE_7__change_password_change_password_component__["a" /* ChangePasswordComponent */]]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_password_change_password_component__ = __webpack_require__("../../../../../src/app/login/change-password/change-password.component.ts");



var LoginRouters = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__login_component__["a" /* LoginComponent */]
    }, {
        path: 'regist',
        component: __WEBPACK_IMPORTED_MODULE_1__regist_regist_component__["a" /* RegistComponent */]
    }, {
        path: 'change-password',
        component: __WEBPACK_IMPORTED_MODULE_2__change_password_change_password_component__["a" /* ChangePasswordComponent */]
    }
];


/***/ }),

/***/ "../../../../../src/app/login/regist/regist.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".signup-page {\n    background-color: #00BCD4;\n    padding-left: 0;\n    max-width: 360px;\n    margin: 5% auto;\n    overflow-x: unset;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/regist/regist.component.html":
/***/ (function(module, exports) {

module.exports = "<body class=\"signup-page\">\n    <div class=\"signup-box\">\n        <div class=\"logo\">\n            <a href=\"javascript:void(0);\">Admin<b>BSB</b></a>\n            <small>Admin BootStrap Based - Material Design</small>\n        </div>\n        <div class=\"card\">\n            <div class=\"body\">\n                <form id=\"sign_up\" method=\"POST\">\n                    <div class=\"msg\">Register a new membership</div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">person</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Your full name\" [(ngModel)]=\"name\" required autofocus>\n                        </div>\n                    </div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">email</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"Email Address\" [(ngModel)]=\"email\" required>\n                        </div>\n                    </div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">home</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"address\" class=\"form-control\" name=\"address\" placeholder=\"Address\" [(ngModel)]=\"address\" required>\n                        </div>\n                    </div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">lock</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"password\" class=\"form-control\" name=\"password\" minlength=\"6\" placeholder=\"Password\" [(ngModel)]=\"password\" required>\n                        </div>\n                    </div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">\n                          <i class=\"material-icons\">lock</i>\n                      </span>\n                        <div class=\"form-line\">\n                            <input type=\"password\" class=\"form-control\" name=\"confirm\" minlength=\"6\" placeholder=\"Confirm Password\" [(ngModel)]=\"confirmPassword\" required>\n                        </div>\n                    </div>\n                    <!-- <div class=\"form-group\">\n                        <input type=\"checkbox\" name=\"terms\" id=\"terms\" class=\"filled-in chk-col-pink\">\n                        <label for=\"terms\">I read and agree to the <a href=\"javascript:void(0);\">terms of usage</a>.</label>\n                    </div> -->\n\n                    <button class=\"btn btn-block btn-lg bg-pink waves-effect\" type=\"submit\" (click)=\"regist()\">SIGN UP</button>\n\n                    <div class=\"m-t-25 m-b--5 align-center\">\n                        <a href=\"sign-in.html\">You already have a membership?</a>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</body>"

/***/ }),

/***/ "../../../../../src/app/login/regist/regist.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_api_user_service__ = __webpack_require__("../../../../../src/app/core/api/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_util_storage_service__ = __webpack_require__("../../../../../src/app/core/util/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_util_loading_service__ = __webpack_require__("../../../../../src/app/core/util/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_dialog_popup_popup_service__ = __webpack_require__("../../../../../src/app/core/dialog/popup/popup.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
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
    function RegistComponent(userService, storageService, loading, popup, router) {
        this.userService = userService;
        this.storageService = storageService;
        this.loading = loading;
        this.popup = popup;
        this.router = router;
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.name = '';
        this.address = '';
    }
    RegistComponent.prototype.ngOnInit = function () {
    };
    RegistComponent.prototype.isValid = function () {
        var message = "invalid";
        if (!this.email) {
            message += " email";
        }
        if (!this.password) {
            message += " password";
        }
        if (!this.name) {
            message += " name";
        }
        if (!this.confirmPassword) {
            message += " confirmPassword";
        }
        if (!this.address) {
            message += " address";
        }
        return message;
    };
    RegistComponent.prototype.regist = function () {
        var _this = this;
        var message = this.isValid();
        if (message !== 'invalid') {
            this.popup.showError(message);
            return;
        }
        var _a = this, email = _a.email, password = _a.password, address = _a.address, name = _a.name;
        var role = 4;
        this.userService.regist({ email: email, password: password, address: address, name: name, role: role }).subscribe(function (success) {
            _this.popup.showSuccess();
        }, function (error) {
            _this.popup.showError(error);
        });
    };
    RegistComponent.prototype.initValidate = function () {
        $('#sign_up').validate({
            rules: {
                'terms': {
                    required: true
                },
                'confirm': {
                    equalTo: '[name="password"]'
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.input-group').append(error);
                $(element).parents('.form-group').append(error);
            }
        });
    };
    RegistComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-regist',
            template: __webpack_require__("../../../../../src/app/login/regist/regist.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/regist/regist.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_api_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__core_util_storage_service__["a" /* StorageService */],
            __WEBPACK_IMPORTED_MODULE_3__core_util_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_4__core_dialog_popup_popup_service__["a" /* PopupService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]])
    ], RegistComponent);
    return RegistComponent;
}());



/***/ })

});
//# sourceMappingURL=login.module.chunk.js.map