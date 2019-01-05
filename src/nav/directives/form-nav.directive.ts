import { Directive, OnInit, Input } from '@angular/core';
import { FormNavService } from '../services/form-nav.service';

@Directive({
    selector: '[navTab]'
})
export class NavDirective implements OnInit {
    @Input('navTab') panel;

    // constructor(private navService: FormNavService) { debugger }
    constructor(private navService: FormNavService) { debugger }

    ngOnInit() {
        // if (!this.panel.static) {
        //     this.navService.add(this.panel);
        // }
    }

}
