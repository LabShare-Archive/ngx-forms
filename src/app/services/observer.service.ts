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

  /**
   * @description broadcast an event
   * @param event example
   * {
   *     name: eventName,
   *     ...
   * }
   */
  public broadcast(event) {
        this.observer.next(event);
    }

  /**
   * @description listen to broadcast events
   * @param eventName
   * @param callback
   * @returns {Subscription}
   */
    public on(eventName, callback) {
        return this.observable.pipe(filter((event) => event.name === eventName))
            .subscribe(callback);
    }
}
