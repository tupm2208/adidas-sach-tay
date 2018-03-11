import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;

  constructor(
    // private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.main();
  }

  open() {
  }


  abc() {

    return new Promise((resolve, reject) => {
      setTimeout(() => {

        let result = 0;

        for (let i = 0; i <= 2000000000; i++) {

          result++;
        }

        resolve(result);
      }, 3000);
    })
  }

async  main() {

    let abcd = await this.abc().then((res) => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })

    console.log("i am waiting");
  }
}
