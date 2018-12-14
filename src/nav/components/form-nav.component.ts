import {Component, Input, OnDestroy } from '@angular/core';
import { FormNavService } from '../services/form-nav.service';
import { Constants } from '../.././app/models/enums';

@Component({
    selector: 'form-nav',
    template: require('./form-nav.component.html'),
    styles: [require('./form-nav.component.scss').toString()]
})

export class FormNavComponent implements OnDestroy {
    public ref = { groups: [] };
    @Input()
    set formNav(val: any) {
      this.currentControls = Object.keys(val.controls).map(function(key) {
        return [(key), val.controls[key].status];
      });
     }

    @Input()
    set group(items: Array<any>) {
      items.forEach(item => this.statusValidationCheck(item));
    }

    private currentControls: any;
    private validArrayWithStatus: any;
    private isValid: boolean;

    constructor(private ns: FormNavService) {
        ns.addWatcher(this.ref);
    }

    public select(index) {
        this.ns.select(index);
    }

    public getSelected() {
        return this.ns.selected;
    }

    public prev() {
        this.select(this.ns.selected - 1);
    }

    public next() {
        this.select(this.ns.selected + 1);
    }

    public disablePrev() {
        return this.ns.selected < 1;
    }

    public disableNext() {
        return this.ns.selected > this.ref.groups.length - 2;
    }

    ngOnDestroy(): void {
        this.ns.reset();
    }

  /**
   * For a given Item, adds the property indicating whether the item is valid or not as per the reactive check.
   * @param item
   */
  statusValidationCheck(item): void {
     this.validArrayWithStatus = this.currentControls.filter(currentControl => currentControl.includes(Constants.VALID));
     const itemFields = [];
        if (item.fields) {
          item.fields.forEach((field: any) => {
            itemFields.push(field);
          });
        }

        // for anItem.panels
       if (item.panels) {
         item.panels.forEach((panel: any) => {
           panel.fields.forEach(field => {
             itemFields.push(field);
           });
         });
       }

     itemFields.forEach(itemField => {
       const selectionArray = [].concat.apply([], this.validArrayWithStatus);
       selectionArray.includes(itemField) ? item.isValid = true : item.isValid = false;
     });
  }
}
