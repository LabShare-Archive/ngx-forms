import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { share } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

export class ObserverService {
    private observable: Observable<any>;
    private observer: Observer<any>;

    constructor() {
        this.observable = Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        }).pipe(share());
    }

    public broadcast(event) {
        this.observer.next(event);
    }

    public on(eventName, callback) {
        this.observable.pipe(filter((event) => event.name === eventName))
            .subscribe(callback);
    }
}
