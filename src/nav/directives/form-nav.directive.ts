import { Directive, OnInit, Input } from '@angular/core';
import { FormNavService } from '../services/form-nav.service';

@Directive({
    selector: '[navTab]'
})
export class NavDirective implements OnInit {
    @Input('navTab') panel;

    constructor(private navService: FormNavService) {
    }

    ngOnInit() {
        if (!this.panel.static) {
            this.navService.add(this.panel);
        }

        // for validation checkmarks
        // for (const group of this.formConfig.form) {
        //     let groupFields = [];
        //     if (group.fields) {
        //         groupFields = groupFields.concat(group.fields);
        //     }
        //     if (group.panels) {
        //         group.panels.forEach(panel => { if (panel.fields) { groupFields = groupFields.concat(panel.fields); } });
        //     }
        //     group.controls = groupFields.map(f => this.form.get(f));
        //     console.log(group.controls)
        // }
    }

}
