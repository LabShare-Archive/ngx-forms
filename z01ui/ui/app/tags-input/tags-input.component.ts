import { Component, EventEmitter, OnInit, Injectable, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/fromPromise';

@Component({
    selector: 'tags-input',
    templateUrl: './tags-input.component.html'
})
export class TagsInput implements OnInit {

    @Input() provider: string;
    @Input() method: string;
    @Input() key: string;
    @Input() identifyBy: string;
    @Input() typeaheadOnly: boolean;
    @Input() emitModel: any;
    @Input() maxItems: number;
    @Output() emitModelChange = new EventEmitter;

    constructor() { }

    ngOnInit() {
        if (this.emitModel)
            this.emitModel.forEach(item => {
                if (!item.display) {
                    item.display = item[this.key];
                    item.value = item[this.identifyBy];
                }
            });
    }

    change(event) {
        this.emitModelChange.emit(this.emitModel);
    }

    public requestAutocompleteItems = (text: string): Observable<{}> => {
        let result = this.provider[this.method](text);
        return Observable.fromPromise(result);
    };

}