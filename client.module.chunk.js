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
            declarations: [__WEBPACK_IMPORTED_MODULE_4__list_bill_list_bill_component__["a" /* ListBillComponent */]]
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

var ClientRouters = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__list_bill_list_bill_component__["a" /* ListBillComponent */]
    }, {
        path: ':id',
        component: __WEBPACK_IMPORTED_MODULE_0__list_bill_list_bill_component__["a" /* ListBillComponent */]
    }
];


/***/ }),

/***/ "../../../../../src/app/client/list-bill/list-bill.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/client/list-bill/list-bill.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"content\">\n    <div class=\"container-fluid\">\n        <div class=\"row clearfix\">\n            <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n                <div class=\"card\">\n                    <div class=\"header\">\n                        <h2>\n                            Lịch Sử Giao Dịch Của: <a (click)=\"updateUser()\">{{user?.tenkh}}</a>\n                        </h2>\n                        <ul class=\"header-dropdown m-r--5\">\n                            <li class=\"dropdown\">\n                                <a (click)=\"addBill()\" class=\"dropdown-toggle\"  aria-haspopup=\"true\" aria-expanded=\"false\">\n                                    <i class=\"material-icons\">add</i>\n                                </a>\n                            </li>\n                        </ul>\n                    </div>\n                     <div class=\"body\">\n                        <div id=\"sign_up\" method=\"POST\">\n                            <div class=\"input-group\">\n                                <div class=\"form-line\">\n                                    <input [type]=\"'text'\" class=\"form-control\" [(ngModel)]=\"madh\" placeholder=\"Mã Đơn Hàng\">\n                                </div>\n                            </div>\n                        </div>\n                    </div> \n                    <div class=\"body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-bordered table-striped table-hover js-basic-example dataTable\">\n                                <thead>\n                                    <tr>\n                                        <th>Ngày</th>\n                                        <th>Mã Sản Phẩm</th>\n                                        <th>Phí Ship</th>\n                                        <th>Đặt Cọc</th>\n                                        <th>Tổng Giá trị Sản Phẩm</th>\n                                        <th>Còn Lại</th>\n                                        <th>Trạng Thái</th>\n                                    </tr>\n                                </thead>\n                                <tfoot>\n                                    <tr>\n                                        <th>Ngày</th>\n                                        <th>Mã Sản Phẩm</th>\n                                        <th>Phí Ship</th>\n                                        <th>Đặt Cọc</th>\n                                        <th>Tổng Giá trị Sản Phẩm</th>\n                                        <th>Còn Lại</th>\n                                        <th>Trạng Thái</th>\n                                    </tr>\n                                </tfoot>\n                                <tbody>\n                                     <tr *ngFor=\"let item of billData | user: {'chitiethds': {'masp': madh}}\">\n                                        <td>{{formatService.formatDate(item.ngay)}}</td>\n                                        <td (click)=\"gotoDetail(item)\"><a><ul style=\"padding-left: 15px;\">\n                                                <li *ngFor=\"let it of item.chitiethds\">{{it.masp}}</li>\n                                            </ul></a></td>\n                                        <td>{{item.ship}}</td>\n                                        <td>{{item.datcoc}}</td>\n                                        <td>{{item.tonggt}}</td>\n                                        <td>{{item.sum}}</td>\n                                        <td>{{formatService.statusType(item.trangthai)}}</td>\n                                    </tr> \n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- #END# Basic Examples -->\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/client/list-bill/list-bill.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListBillComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_api_user_service__ = __webpack_require__("../../../../../src/app/core/api/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_util_loading_service__ = __webpack_require__("../../../../../src/app/core/util/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_dialog_dialog_service__ = __webpack_require__("../../../../../src/app/core/dialog/dialog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_util_format_service__ = __webpack_require__("../../../../../src/app/core/util/format.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_dialog_user_user_dialog_service__ = __webpack_require__("../../../../../src/app/core/dialog/user/user-dialog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_api_main_service__ = __webpack_require__("../../../../../src/app/core/api/main.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_api_bill_service__ = __webpack_require__("../../../../../src/app/core/api/bill.service.ts");
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
    function ListBillComponent(route, router, userService, loadingService, dialogService, formatService, userDialog, mainService, billService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.loadingService = loadingService;
        this.dialogService = dialogService;
        this.formatService = formatService;
        this.userDialog = userDialog;
        this.mainService = mainService;
        this.billService = billService;
        this.madh = '';
        this.billData = [];
        this.user = {};
    }
    ListBillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.show();
        var id = this.route.snapshot.paramMap.get('id');
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
    ListBillComponent.prototype.openOrder = function (item) {
        var _this = this;
        if (!item.order)
            return;
        this.dialogService.gotoOrder(item.order.madh).subscribe(function (data) {
            _this.billService.getById(item.mahd).subscribe(function (bill) {
                for (var e in bill.data) {
                    item[e] = bill.data[e];
                }
                if (!item['madh'])
                    item.order = null;
            });
        });
    };
    ListBillComponent.prototype.gotoDetail = function (item) {
        var _this = this;
        this.dialogService.openBill({ user: this.user, bill: item }).subscribe(function (data) {
            for (var i = 0; i < item.chitiethds.length; i++) {
                if (!item.chitiethds[i].mahd) {
                    item.chitiethds.splice(i, 1);
                    i--;
                }
            }
            if (data == -2 || !item.chitiethds.length) {
                _this.billData.splice(_this.billData.indexOf(item), 1);
                _this.billData = _this.billData.concat([]);
                return;
            }
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
    ListBillComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-list-bill',
            template: __webpack_require__("../../../../../src/app/client/list-bill/list-bill.component.html"),
            styles: [__webpack_require__("../../../../../src/app/client/list-bill/list-bill.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__core_api_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__core_util_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5__core_dialog_dialog_service__["a" /* DialogService */],
            __WEBPACK_IMPORTED_MODULE_6__core_util_format_service__["a" /* FormatService */],
            __WEBPACK_IMPORTED_MODULE_7__core_dialog_user_user_dialog_service__["a" /* UserDialogService */],
            __WEBPACK_IMPORTED_MODULE_8__core_api_main_service__["a" /* MainService */],
            __WEBPACK_IMPORTED_MODULE_9__core_api_bill_service__["a" /* BillService */]])
    ], ListBillComponent);
    return ListBillComponent;
}());



/***/ })

});
//# sourceMappingURL=client.module.chunk.js.map