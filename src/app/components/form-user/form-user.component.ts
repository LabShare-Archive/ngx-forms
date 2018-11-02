import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { DataService } from '../../services/data.service';


@Component({
    selector: 'form-user',
    templateUrl: './form-user.component.html'
})
export class FormUserComponent implements Field {
    field: FieldConfig;
    group: FormGroup;

    @Input() typeaheadOnly: boolean;
    @Input() emitModel: any;
    @Input() maxItems: number;
    @Output() emitModelChange = new EventEmitter;

    private provider;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        if (this.group.controls[this.field.name].value)
            this.group.controls[this.field.name].value.forEach(item => {
                if (!item.display) {
                    item.display = item[this.field.settings.displayBy];
                    item.value = item[this.field.settings.identifyBy];
                }
            });
        this.provider = this.dataService.get(this.field.provider);
    }

    change(event) {
        this.emitModelChange.emit(this.emitModel);
    }

    requestAutocompleteItems = (text: string): Observable<{}> => {
        let result = this.provider[this.field.providerMethod](text);
        return Observable.fromPromise(result);
    }

    isShow() {
        return !this.field.hidden;
    }

}
