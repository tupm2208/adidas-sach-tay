import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css']
})
export class SelectProductComponent implements OnInit {

  groupOptionsSelect = [
    { value: '', label: 'team 1', group: true },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '', label: 'team 2', group: true },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];

  constructor(
    private dialogRef: MatDialogRef<SelectProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    $(function () {
      $('.list-group.checked-list-box .list-group-item').each(function () {

        // Settings
        var $widget = $(this),
          $checkbox = $('<input type="checkbox" class="hidden" />'),
          color = ($widget.data('color') ? $widget.data('color') : "primary"),
          style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
          settings = {
            on: {
              icon: 'glyphicon glyphicon-check'
            },
            off: {
              icon: 'glyphicon glyphicon-unchecked'
            }
          };

        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
          $checkbox.prop('checked', !$checkbox.is(':checked'));
          $checkbox.triggerHandler('change');
          updateDisplay();
        });
        $checkbox.on('change', function () {
          updateDisplay();
        });


        // Actions
        function updateDisplay() {
          var isChecked = $checkbox.is(':checked');

          // Set the button's state
          $widget.data('state', (isChecked) ? "on" : "off");

          

          // Update the button's color
          if (isChecked) {
            $widget.addClass(style + color + ' active');
          } else {
            $widget.removeClass(style + color + ' active');
          }
        }

        // Initialization
        function init() {

          if ($widget.data('checked') == true) {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
          }

          updateDisplay();

          // Inject the icon if applicable
          
        }
        init();
      });

      $('#get-checked-data').on('click', function (event) {
        event.preventDefault();
        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function (idx, li) {
          checkedItems[counter] = $(li).text();
          counter++;
          console.log("checkedItems", checkedItems);
        });
        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
      });
    });
  }
}
