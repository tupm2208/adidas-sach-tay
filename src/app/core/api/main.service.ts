import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { OrderService } from './order.service';
import { OrderDetailService } from './order-detail.service';
import { BillService } from './bill.service';
import { BillDetailService } from './bill-detail.service';
import { ReceiveService } from './receive.service';
import { ReceiveDetailService } from './receive-detail.service';
import { FormatService } from '../util/format.service';

@Injectable()
export class MainService {

	constructor(
		private userService: UserService,
		private orderService: OrderService,
		private orderDetailService: OrderDetailService,
		private billService: BillService,
		private billDetailService: BillDetailService,
		private receiveService: ReceiveService,
		private receiveDetailService: ReceiveDetailService,
		private formatService: FormatService
	) { }

	listOrder(optionParams): Observable<any> {

		return new Observable( observer => {

			this.orderDetailService.getByParams(optionParams).subscribe(data => {

				this.formatService.formatData(data, "madh");

				let users: any = {};
				let count = 0;

				data.forEach(element => {

					if(!element.makh) {

						element.user = {};
						count++;
						return;
					}

					if(users[element.makh]) {

						element.user = users[element.makh];
						count ++;
					} else {

						users[element.makh] = {};
						
						this.userService.getById(element.makh).subscribe( user => {

							this.formatService.copyObject(user.data, users[element.makh]);

							element.user = users[element.makh];

							count++;

							if(count == data.length) {

								observer.next(data);
								observer.complete();
							}
						}, error => {

							count++;

							if(count == data.length) {

								observer.next(data);
								observer.complete();
							}
						})
					}
				});

				if(!data.length) {

					observer.next([]);
					observer.complete();
				}
			}, error => {

				observer.next([]);
				observer.complete();
			})
		})
	}

	listBill(optionParams): Observable<any> {

		return new Observable( observer => {

			this.billDetailService.getByParams(optionParams).subscribe(data => {

				this.formatService.formatData(data, "mahd");

				let users: any = {};
				let count = 0;

				data.forEach(element => {

					if(!element.makh) {

						element.user = {};
						
						count++;

						if (count == data.length) {

							observer.next(data);
							observer.complete();
						}
						return;
					}

					if(users[element.makh]) {

						element.user = users[element.makh];
						count ++;
					} else {

						users[element.makh] = {};
						
						this.userService.getById(element.makh).subscribe( user => {

							this.formatService.copyObject(user.data, users[element.makh]);

							element.user = users[element.makh];

							count++;

							if(count == data.length) {

								observer.next(data);
								observer.complete();
							}
						}, error => {

							count++;

							if(count == data.length) {

								observer.next(data);
								observer.complete();
							}
						})
					}
				});

				if(!data.length) {

					observer.next([]);
					observer.complete();
				}
			}, error => {

				observer.next([]);
				observer.complete();
			})
		})
	}
}
