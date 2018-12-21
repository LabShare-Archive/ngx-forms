import {Component, DoCheck, Input, OnDestroy} from '@angular/core';
import { FormNavService } from '../services/form-nav.service';

@Component({
    selector: 'form-nav',
    template: require('./form-nav.component.html'),
    styles: [require('./form-nav.component.scss').toString()]
})

export class FormNavComponent implements OnDestroy, DoCheck {

    @Input()
    set formNav(val: any) {
      this.selectionArray = this.navigationService.createStatusKeyArray(val);
     }

    @Input()
    set group(items: Array<any>) {
      this.items = items;
      items.forEach(item => this.statusValidationCheck(item));
    }

    public selectionArray: any;
    private isValid: boolean;
    public ref = { groups: [] };
    public items: any;

    constructor(private navigationService: FormNavService) {
        navigationService.addWatcher(this.ref);
    }

    public select(index) {
        this.navigationService.select(index);
    }

    public getSelected() {
        return this.navigationService.selected;
    }

    public prev() {
        this.select(this.navigationService.selected - 1);
    }

    public next() {
        this.select(this.navigationService.selected + 1);
    }

    public disablePrev() {
        return this.navigationService.selected < 1;
    }

    public disableNext() {
        return this.navigationService.selected > this.ref.groups.length - 2;
    }

    ngOnDestroy(): void {
        this.navigationService.reset();
    }

    /**
     * For a given Item, adds the property indicating whether the item is valid or not as per the angular reactive check.
     * @param item
     */
     public statusValidationCheck(item): void {
       item.fields && this.navigationService.isSubSet(item.fields, this.selectionArray) ? this.isValid = true : this.isValid = false;

         item.panels && item.panels.forEach((panel: any) => {
             this.navigationService.isSubSet(panel.fields, this.selectionArray) ? this.isValid = true : this.isValid = false;
           }, this);

        this.setItemValidity(item);
      }

    private setItemValidity(item) {
      this.isValid ? item.isValid = true : item.isValid = false;
    }

    ngDoCheck(): void {
      // item.panel field check
      this.items.forEach( item => {
       item.panels && item.panels.forEach(panel => {
            panel.isValid ? this.isValid = true : this.isValid = false;
          }, this);
          this.setItemValidity(item);
      }, this);
    }
}
