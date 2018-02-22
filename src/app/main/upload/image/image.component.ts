import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() url: any;
  @Output() changeUrl = new EventEmitter();
  uploadData: any;
  thumb: any;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.thumb = $('.js--image-preview');
  }

  ngOnChanges() {

    if(this.url) {
      
    }
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      
      this.uploadData = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(this.uploadData);

      reader.onload  = () => {

        this.thumb.css('background-image', 'url(' +  reader.result + ')');
        this.thumb.addClass('js--no-default');
        // console.log("name: ", this.thumb.className);
        this.changeUrl.emit(this.uploadData);
      }
    }
  }
}
