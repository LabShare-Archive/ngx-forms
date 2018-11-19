import { Directive, OnInit, ElementRef } from '@angular/core';
import { FormNavService } from './form-nav.service';

@Directive({
    selector: '[navTab]'
})
export class NavDirective implements OnInit {

    constructor(private elementRef: ElementRef, private navService: FormNavService ) {
    }

    ngOnInit() {
        this.navService.add(this.elementRef);
    }

}
