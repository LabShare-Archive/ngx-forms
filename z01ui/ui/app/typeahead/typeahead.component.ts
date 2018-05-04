import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'itempicker',
    template: require('./typeahead.component.html'),
    styles: [`.form-control { width: 300px; }`]
})

export class NgbTypeahead {
    @Input() emitModel: any;
    @Output() emitModelChange = new EventEmitter;
    @Input() provider: string;
    @Input() method: string;
    @Input() key: string;

    public model: any;
    users: any;

    change(newValue) {
        this.emitModel = newValue;
        this.emitModelChange.emit(newValue);
    }

    constructor(private usersService: UsersService) {
    }
    ngOnInit() {
        this.provider[this.method]().then(data => {
            this.users = data;
        });
    }

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.users.filter(v => v[this.key].toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    formatter = (x: { name: string }) => x[this.key];

}