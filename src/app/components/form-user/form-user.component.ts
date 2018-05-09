import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    config: FieldConfig;
    group: FormGroup;

    @Input() typeaheadOnly: boolean;
    @Input() emitModel: any;
    @Input() maxItems: number;
    @Output() emitModelChange = new EventEmitter;

    private provider;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        console.log(this.config)
        if (this.emitModel)
            this.emitModel.forEach(item => {
                if (!item.display) {
                    item.display = item[this.config.settings.displayBy];
                    item.value = item[this.config.settings.identifyBy];
                }
            });
        this.provider = this.dataService.get(this.config.provider);
    }

    change(event) {
        this.emitModelChange.emit(this.emitModel);
    }

    public requestAutocompleteItems = (text: string): Observable<{}> => {
        // let result = this.dataService[this.provider][this.method](text);
        console.log(this.dataService)
        let result = this.provider[this.config.providerMethod](text);        
        return Observable.fromPromise(result);
    };

}