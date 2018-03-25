import { Component, OnInit } from '@angular/core';
import { MainService } from '../../core/api/main.service';
import { FormatService } from '../../core/util/format.service';
import { LoadingService } from '../../core/util/loading.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  private receiveData: any = [];
  private from: any = '';
  private to: any = '';

  constructor(
    private mainService: MainService,
    private formatService: FormatService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {

    this.loadingService.show();
    this.mainService.getStatistic({trangthai: 8}).subscribe( data => {

      this.receiveData = data;

      console.log("data: ", data);
      this.cal();
    })
  }

  calculateByProp(item, name, name2?): number {

    let sum = 0;

    item.forEach(element => {
      
      element[name2] ? sum += Number(element[name]) * Number(element[name2]): sum+= Number(element[name]);

      if(!name2 && name =='thanhtien') console.log("e: ", element.thanhtien);
    });

    return sum;
  }

  cal() {

    this.receiveData.forEach(element => {
      
      console.log("abc: ", element);
      element.noReceive = element.dongia * element.khoiluong + Number(element.phuphi);

      element.tongthu = 0;

      element.donhangs.forEach(ele => {

        console.log("abcd: ", element);
        
        ele.noOrder = ele.tienyen * ele.tigia;

        ele.noBill = this.calculateByProp(ele.hoadons, 'thanhtien');
      });

      element.tongchi = Number(element.noReceive) + this.calculateByProp(element.donhangs, 'noOrder');
      element.tongthu = this.calculateByProp(element.donhangs,'noBill');
    });

    this.loadingService.hide();
  }
}
