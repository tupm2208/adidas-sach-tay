webpackJsonp(["client.module"],{

/***/ "../../../../../src/app/client/client.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientModule", function() { return ClientModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_bill_list_bill_component__ = __webpack_require__("../../../../../src/app/client/list-bill/list-bill.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__client_routers__ = __webpack_require__("../../../../../src/app/client/client.routers.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipe_pipe_module__ = __webpack_require__("../../../../../src/app/pipe/pipe.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__waiting_list_waiting_list_component__ = __webpack_require__("../../../../../src/app/client/waiting-list/waiting-list.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ClientModule = /** @class */ (function () {
    function ClientModule() {
    }
    ClientModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__client_routers__["a" /* ClientRouters */]),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipe_pipe_module__["a" /* PipeModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__list_bill_list_bill_component__["a" /* ListBillComponent */], __WEBPACK_IMPORTED_MODULE_7__waiting_list_waiting_list_component__["a" /* WaitingListComponent */]]
        })
    ], ClientModule);
    return ClientModule;
}());



/***/ }),

/***/ "../../../../../src/app/client/client.routers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientRouters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_bill_list_bill_component__ = __webpack_require__("../../../../../src/app/client/list-bill/list-bill.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__waiting_list_waiting_list_component__ = __webpack_require__("../../../../../src/app/client/waiting-list/waiting-list.component.ts");


var ClientRouters = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__list_bill_list_bill_component__["a" /* ListBillComponent */]
    }, {
        path: 'waiting',
        component: __WEBPACK_IMPORTED_MODULE_1__waiting_list_waiting_list_component__["a" /* WaitingListComponent */]
    }
];


/***/ }),

/***/ "../../../../../src/app/client/list-bill/list-bill.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#suItem td {\r\n    border: 0;width: 60px;\r\n    text-align: center\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/client/list-bill/list-bill.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"content\">\n    <div class=\"container-fluid\">\n        <div class=\"row clearfix\">\n            <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n                <div class=\"card\">\n                    <div class=\"header\">\n                        <h2>\n                            Các Đơn Đặt Hàng: <a>{{user?.tenkh}}</a>\n                        </h2>\n                        <ul class=\"header-dropdown m-r--5\">\n                            <li class=\"dropdown\">\n                                <a (click)=\"addBill()\" class=\"dropdown-toggle\"  aria-haspopup=\"true\" aria-expanded=\"false\">\n                                    <i class=\"material-icons\">add</i>\n                                </a>\n                            </li>\n                        </ul>\n                    </div>\n                     <div class=\"body\">\n                        <div id=\"sign_up\" method=\"POST\">\n                            <div class=\"input-group\">\n                                <div class=\"form-line\">\n                                    <input [type]=\"'text'\" class=\"form-control\" [(ngModel)]=\"madh\" placeholder=\"Mã Đơn Hàng\">\n                                </div>\n                            </div>\n                        </div>\n                    </div> \n                    <div class=\"body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-bordered table-striped table-hover js-basic-example dataTable\">\n                                <thead>\n                                    <tr>\n                                        <th>Ngày</th>\n                                        <th>\n                                            <thead>\n                                                <th>Mã SP</th>\n                                                <th>S.Lượng</th>\n                                                <th>Hộp</th> \n                                            </thead>\n                                        </th>\n                                        <th>Tỉ Giá</th>\n                                        <th>Thành Tiền</th>\n                                        <th>Phụ Phí</th>\n                                        <th>Đặt Cọc</th>\n                                        <th>Còn Lại</th>\n                                        <th>Trạng Thái</th>\n                                    </tr>\n                                </thead>\n                                <tfoot>\n                                    <tr>\n                                        <th>Ngày</th>\n                                        <th>Mã Sản Phẩm</th>\n                                        <th>Tỉ Giá</th>\n                                        <th>Thành Tiền</th>\n                                        <th>Phụ Phí</th>\n                                        <th>Đặt Cọc</th>\n                                        <th>Còn Lại</th>\n                                        <th>Trạng Thái</th>\n                                    </tr>\n                                </tfoot>\n                                <tbody>\n                                    <tr style=\"background-color: #a1edeb;\">\n                                      <td></td>\n                                      <td></td>\n                                      <td></td>\n                                      <td>{{calculateByProp('thanhtien')| number: '1.2-2'}}</td>\n                                      <td>{{calculateByProp('phuphi')| number: '1.2-2'}}</td>\n                                      <td>{{calculateByProp('datcoc')| number: '1.2-2'}}</td>\n                                      <td>{{calculateByProp('thanhtien') - calculateByProp('phuphi') - calculateByProp('datcoc')| number: '1.2-2'}}</td>\n                                      <td></td>\n                                      <td></td>\n                                    </tr>\n                                     <tr *ngFor=\"let item of billData | user: {'chitiethds': {'masp': madh}}\">\n                                        <td>{{formatService.formatDate(item.ngay)}}</td>\n                                        <td (click)=\"gotoDetail(item)\">\n                                             <a> \n                                                <thead>\n                                                    <tr *ngFor=\"let it of item.chitiethds\" id=\"suItem\">\n                                                        <td>{{it.masp}}</td>\n                                                        <td>{{it.soluong}}</td>\n                                                        <td>{{it.giuhop}}</td>\n                                                    </tr>\n                                                </thead>\n                                             </a> \n                                        </td>\n                                        <td>{{item.tigia}}</td>\n                                        <td>{{item.thanhtien| number: '1.2-2'}}</td>\n                                        <td>{{item.phuphi| number: '1.2-2'}}</td>\n                                        <td>{{item.datcoc| number: '1.2-2'}}</td>\n                                        <td>{{item.thanhtien - item.datcoc - -item.phuphi | number: '1.2-2'}}</td>\n                                        <td>{{formatService.statusType(item.trangthai)}}</td>\n                                    </tr> \n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/client/list-bill/list-bill.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListBillComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_api_user_service__ = __webpack_require__("../../../../../src/app/core/api/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_util_loading_service__ = __webpack_require__("../../../../../src/app/core/util/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_dialog_dialog_service__ = __webpack_require__("../../../../../src/app/core/dialog/dialog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_util_format_service__ = __webpack_require__("../../../../../src/app/core/util/format.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_dialog_user_user_dialog_service__ = __webpack_require__("../../../../../src/app/core/dialog/user/user-dialog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_api_main_service__ = __webpack_require__("../../../../../src/app/core/api/main.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_dialog_client_client_service__ = __webpack_require__("../../../../../src/app/core/dialog/client/client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_util_storage_service__ = __webpack_require__("../../../../../src/app/core/util/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_dialog_popup_popup_service__ = __webpack_require__("../../../../../src/app/core/dialog/popup/popup.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//service









var ListBillComponent = /** @class */ (function () {
    function ListBillComponent(userService, loadingService, dialogService, formatService, userDialog, mainService, clientService, storageService, popupService) {
        this.userService = userService;
        this.loadingService = loadingService;
        this.dialogService = dialogService;
        this.formatService = formatService;
        this.userDialog = userDialog;
        this.mainService = mainService;
        this.clientService = clientService;
        this.storageService = storageService;
        this.popupService = popupService;
        this.madh = '';
        this.billData = [];
        this.user = {};
        this.waitingBills = [];
    }
    ListBillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.show();
        var id = this.storageService.get('userInfo').makh;
        console.log("id dep trai: ", id);
        this.mainService.listBill({ makh: id }).subscribe(function (user) {
            _this.billData = user;
            console.log("data: ", user);
            if (_this.billData.length) {
                _this.user = _this.billData[0].user;
                _this.loadingService.hide();
            }
            else {
                _this.userService.getById(id).subscribe(function (userData) { return _this.user = userData.data; }, function (error) { return _this.loadingService.hide(); });
            }
        }, function (error) {
            _this.loadingService.hide();
        });
    };
    ListBillComponent.prototype.updateUser = function () {
        this.userDialog.openUserDetail(this.user);
    };
    ListBillComponent.prototype.gotoDetail = function (item) {
        if (item.manh || item.trangthai > 2) {
            this.popupService.showWanning("Không Thể Chỉnh Sửa Đơn khi đã Đặt Đơn bên Nhật, liên hệ admin để biết thêm chi tiết nhé");
            return;
        }
        this.passBill(item);
    };
    ListBillComponent.prototype.passBill = function (item) {
        this.clientService.openBook({ user: this.user, bill: JSON.parse(JSON.stringify(item)) }).subscribe(function (data) {
            console.log("close: ", data);
        });
    };
    ListBillComponent.prototype.addBill = function () {
        var _this = this;
        this.dialogService.openBill({ user: this.user }).subscribe(function (data) {
            if (typeof (data) == "object") {
                _this.billData = _this.billData.concat([data]);
            }
        });
    };
    ListBillComponent.prototype.calculateByProp = function (name, name2) {
        var sum = 0;
        this.billData.forEach(function (element) {
            //  = element[name2] ? element[name2]: 1;
            element[name2] ? sum += Number(element[name]) * Number(element[name2]) : sum += Number(element[name]);
        });
        return sum;
    };
    ListBillComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-list-bill',
            template: __webpack_require__("../../../../../src/app/client/list-bill/list-bill.component.html"),
            styles: [__webpack_require__("../../../../../src/app/client/list-bill/list-bill.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_api_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__core_util_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_3__core_dialog_dialog_service__["a" /* DialogService */],
            __WEBPACK_IMPORTED_MODULE_4__core_util_format_service__["a" /* FormatService */],
            __WEBPACK_IMPORTED_MODULE_5__core_dialog_user_user_dialog_service__["a" /* UserDialogService */],
            __WEBPACK_IMPORTED_MODULE_6__core_api_main_service__["a" /* MainService */],
            __WEBPACK_IMPORTED_MODULE_7__core_dialog_client_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_8__core_util_storage_service__["a" /* StorageService */],
            __WEBPACK_IMPORTED_MODULE_9__core_dialog_popup_popup_service__["a" /* PopupService */]])
    ], ListBillComponent);
    return ListBillComponent;
}());



/***/ }),

/***/ "../../../../../src/app/client/waiting-list/waiting-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/client/waiting-list/waiting-list.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"content\">\n    <div class=\"container-fluid\">\n        <div class=\"row clearfix\">\n            <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n                <div class=\"card\">\n                    <div class=\"header\">\n                        <h2>\n                            Thêm Và Sửa Đơn Hàng Bạn: <a>{{user?.tenkh}}</a>\n                        </h2>\n                        <ul class=\"header-dropdown m-r--5\">\n                            <li class=\"dropdown\">\n                                <a (click)=\"addBill()\" class=\"dropdown-toggle\"  aria-haspopup=\"true\" aria-expanded=\"false\">\n                                    <i class=\"material-icons\">add</i>\n                                </a>\n                            </li>\n                        </ul>\n                    </div>\n                     <div class=\"body\">\n                        <div id=\"sign_up\" method=\"POST\">\n                            <div class=\"input-group\">\n                                <div class=\"form-line\">\n                                    <input [type]=\"'text'\" class=\"form-control\" [(ngModel)]=\"madh\" placeholder=\"Mã Đơn Hàng\">\n                                </div>\n                            </div>\n                        </div>\n                    </div> \n                    <div class=\"body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-bordered table-striped table-hover js-basic-example dataTable\">\n                                <thead>\n                                    <tr>\n                                        <th>Ngày</th>\n                                        <th>Mã SP</th>\n                                        <th>Số Lượng</th>\n                                        <th>Giữ Hộp</th>\n                                        <th>Giá Web</th>\n                                        <th>Delete</th>\n                                    </tr>\n                                </thead>\n                                <tfoot>\n                                    <tr>\n                                        <th>Ngày</th>\n                                        <th>Mã SP</th>\n                                        <th>Số Lượng</th>\n                                        <th>Giữ Hộp</th>\n                                        <th>Giá Web</th>\n                                        <th>Delete</th>\n                                    </tr>\n                                </tfoot>\n                                <tbody *ngFor=\"let item of billData | user: {'choduyetcthds': {'masp': madh}}\">\n                                     <tr *ngFor=\"let it of item.choduyetcthds;let id = index\">\n                                        <td (click)=\"gotoDetail(item)\"><a>{{ id == 0? formatService.formatDate(item.ngay): ''}}</a></td>\n                                        <td>{{it.masp}}</td>\n                                        <td>{{it.soluong}}</td>\n                                        <td>{{it.giuhop}}</td>\n                                        <td>{{it.giaweb}}</td>\n                                        <td *ngIf=\"id==0\"><a (click)=\"delete(item)\"><i class=\"material-icons\">delete</i></a></td>\n                                        <td *ngIf=\"id!=0\"></td>\n                                    </tr> \n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- #END# Basic Examples -->\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/client/waiting-list/waiting-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaitingListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_api_user_service__ = __webpack_require__("../../../../../src/app/core/api/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_util_loading_service__ = __webpack_require__("../../../../../src/app/core/util/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_dialog_dialog_service__ = __webpack_require__("../../../../../src/app/core/dialog/dialog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_util_format_service__ = __webpack_require__("../../../../../src/app/core/util/format.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_dialog_user_user_dialog_service__ = __webpack_require__("../../../../../src/app/core/dialog/user/user-dialog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_api_main_service__ = __webpack_require__("../../../../../src/app/core/api/main.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_dialog_client_client_service__ = __webpack_require__("../../../../../src/app/core/dialog/client/client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_util_storage_service__ = __webpack_require__("../../../../../src/app/core/util/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_api_waiting_bill_service__ = __webpack_require__("../../../../../src/app/core/api/waiting-bill.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//service









var WaitingListComponent = /** @class */ (function () {
    function WaitingListComponent(userService, loadingService, dialogService, formatService, userDialog, mainService, clientService, storageService, waitingBillService) {
        this.userService = userService;
        this.loadingService = loadingService;
        this.dialogService = dialogService;
        this.formatService = formatService;
        this.userDialog = userDialog;
        this.mainService = mainService;
        this.clientService = clientService;
        this.storageService = storageService;
        this.waitingBillService = waitingBillService;
        this.madh = '';
        this.billData = [];
        this.user = {};
    }
    WaitingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.show();
        var id = this.storageService.get('userInfo').makh;
        this.userService.getById(id).subscribe(function (userData) { _this.user = userData.data; }, function (error) { });
        this.mainService.listWaitingBill({ makh: id }).subscribe(function (user) {
            _this.billData = user;
            console.log("data:", user);
            _this.loadingService.hide();
        }, function (error) {
            _this.loadingService.hide();
        });
    };
    WaitingListComponent.prototype.updateUser = function () {
        this.userDialog.openUserDetail(this.user);
    };
    WaitingListComponent.prototype.gotoDetail = function (item) {
        var _this = this;
        this.clientService.openBook({ user: this.user, bill: item }).subscribe(function (data) {
            _this.mainService.listWaitingBill({ mahd: item.mahd, makh: _this.user.makh }).subscribe(function (data) {
                _this.formatService.copyObject(data[0], item);
                if (!data[0]) {
                    _this.billData.splice(_this.billData.indexOf(item), 1);
                    _this.billData = _this.billData.concat([]);
                }
            });
        });
    };
    WaitingListComponent.prototype.addBill = function () {
        var _this = this;
        this.clientService.openBook({ user: this.user }).subscribe(function (data) {
            if (typeof (data) == "object") {
                _this.billData = _this.billData.concat([data]);
            }
        });
    };
    WaitingListComponent.prototype.delete = function (item) {
        var _this = this;
        this.loadingService.show();
        this.waitingBillService.delete(item).subscribe(function (success) {
            console.log("success: ", success);
            _this.billData.splice(_this.billData.indexOf(item), 1);
            _this.billData = _this.billData.concat([]);
            _this.loadingService.hide();
        }, function (error) {
            _this.loadingService.hide();
        });
    };
    WaitingListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-waiting-list',
            template: __webpack_require__("../../../../../src/app/client/waiting-list/waiting-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/client/waiting-list/waiting-list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_api_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__core_util_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_3__core_dialog_dialog_service__["a" /* DialogService */],
            __WEBPACK_IMPORTED_MODULE_4__core_util_format_service__["a" /* FormatService */],
            __WEBPACK_IMPORTED_MODULE_5__core_dialog_user_user_dialog_service__["a" /* UserDialogService */],
            __WEBPACK_IMPORTED_MODULE_6__core_api_main_service__["a" /* MainService */],
            __WEBPACK_IMPORTED_MODULE_7__core_dialog_client_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_8__core_util_storage_service__["a" /* StorageService */],
            __WEBPACK_IMPORTED_MODULE_9__core_api_waiting_bill_service__["a" /* WaitingBillService */]])
    ], WaitingListComponent);
    return WaitingListComponent;
}());



/***/ })

});
//# sourceMappingURL=client.module.chunk.js.map