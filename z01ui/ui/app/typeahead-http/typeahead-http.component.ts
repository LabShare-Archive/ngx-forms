import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
//import { EventEmitter } from 'events';

@Component({
    selector: 'ngb-typeahead-http',
    templateUrl: './typeahead-http.component.html',
    styles: [`.form-control { width: 300px; }`]
})
export class NgbTypeaheadHttp implements OnInit {
    @Input() provider: string;
    @Input() method: string;
    @Input() key: string;
    @Input() emitModel: any;
    @Output() emitModelChange = new EventEmitter;

    searching = false;
    searchFailed = false;
    noResult = false;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

    constructor() { }

    ngOnInit() { }

    change(x) {
        this.emitModel = x.item;
        this.emitModelChange.emit(x.item);
    }

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .do(() => this.searching = true)
            .switchMap(term =>
                this.provider[this.method](term || {}, this.key)
                    .catch((err) => {
                        this.searchFailed = true;
                        return Observable.of([]);
                    }
                    ))
            .do(() => this.searching = false)
            .merge(this.hideSearchingWhenUnsubscribed);
    formatter = (x: { name: string }) => x[this.key];
}