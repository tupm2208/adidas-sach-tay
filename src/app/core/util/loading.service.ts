import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class LoadingService {

  private html = `<div class="page-loader-wrapper">
                    <div class="loader">
                        <div class="preloader">
                            <div class="spinner-layer pl-red">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                        <p>Please wait...</p>
                    </div>
                </div>`
  constructor() { }

  public show(id?) {

    if(!id) {

      let temp = $("body").append(this.html);
      $('body .page-loader-wrapper').fadeIn();
    } else {
        let temp = $('#' + id).append(this.html);
        $("#" + id).css("position", "relative");
        $('#' + id + ' .page-loader-wrapper').fadeIn();
    }
  }

  public hide(id?) {

    if (!id) {

        $('body .page-loader-wrapper').remove();
    } else {

        $("#" + id).css("position", "");
        $('#' + id + " .page-loader-wrapper").remove();
    }
  }
}
