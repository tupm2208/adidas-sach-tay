import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/forkJoin';

import { UserService } from './user.service';
import { OrderService } from './order.service';
import { OrderDetailService } from './order-detail.service';
import { BillService } from './bill.service';
import { BillDetailService } from './bill-detail.service';
import { ReceiveService } from './receive.service';
import { ReceiveDetailService } from './receive-detail.service';
import { FormatService } from '../util/format.service';
import { WaitingBillService } from './waiting-bill.service';
import { WaitingBillDetailService } from './waiting-bill-detail.service';
import { WaitingOrderService } from './waiting-order.service';
import { WaitingReceiveService } from './waiting-receive.service';

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
		private formatService: FormatService,
		private waitingBillService: WaitingBillService,
		private waitingBillDetailService: WaitingBillDetailService,
		private waitingOrderService: WaitingOrderService,
		private waitingReceiveService: WaitingReceiveService
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

	listReceive(optionParams): Observable<any> {

		return new Observable( observer => {

			this.receiveDetailService.getByParams(optionParams).subscribe(data => {

				this.formatService.formatData(data, "chitietnhs.madh",2);
				this.formatService.formatData(data, "manh");

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

	listWaitingBill(optionParams): Observable<any> {

		return new Observable( observer => {

			this.waitingBillDetailService.getByParams(optionParams).subscribe(data => {

				this.formatService.formatData(data, "mahd");

				observer.next(data);
				observer.complete();
			}, error => {

				observer.next([]);
				observer.complete();
			})
		})
	}

	sendRequest(array): Observable<any> {

		return new Observable( observer => {

			Observable.forkJoin(...array).subscribe(res => {

				observer.next(res);
				observer.complete();
			}, err => {

				observer.error(err)
				observer.complete();
			});
		})
	}

	ListOrderAndWait(optionParams): Observable<any> {

		return new Observable( observer => {

			this.waitingOrderService.getWaitAndOrder(optionParams).subscribe(data1 => {

				let users: any = {};
				let count = 0;

				console.log("data filter: ", data1);

				let data = data1.data.filter( element => {
					
					return element.choduyetdhs.length != 0;
				})

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

	ListReceiverAndWait(optionParams): Observable<any> {

		return new Observable( observer => {

			this.waitingReceiveService.getWaitAndReceiver(optionParams).subscribe(data1 => {

				let users: any = {};
				let count = 0;

				console.log("data filter: ", data1);

				let data = data1.data.filter( element => {
					
					return element.choduyetnhs.length != 0;
				})

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

	getStatistic(params): Observable<any> {

		return new Observable( observer => {

			this.receiveService.search(params).subscribe( receiveData => {

				let count = 0;

				if(receiveData.length == 0) {

					observer.next(receiveData);
					observer.complete();
				}
				receiveData.forEach(element => {
					
					this.orderService.getByParams({manh: element.manh}).subscribe( orders => {

						element.donhangs = orders;

						element.donhangs.forEach(ele => {
							
							this.billService.search({madh: ele.madh}).subscribe( data => {

								ele.hoadons = data;
								count ++;

								if(count == receiveData.length) {

									observer.next(receiveData);
									observer.complete();
								}
							})
						});
					})
				});
			})
		})
	}
}
