import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { FormNavService } from '../services/form-nav.service';

@Directive({
    selector: '[navTab]'
})
export class NavDirective implements OnInit {
    @Input('navTab') group;

    constructor(private navService: FormNavService) {
    }

    ngOnInit() {
        if (!this.group.static) {
            this.navService.add(this.group);
        }
    }

}
