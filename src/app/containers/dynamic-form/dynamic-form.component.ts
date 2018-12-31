import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

interface IFormConfig {
    form: any;
}

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styles: [require('./dynamic-form.component.scss').toString()]
})
export class DynamicFormComponent implements OnInit {
    @Input() formConfig: IFormConfig;
    @Input() model: any;
    @Input() lookups: object;

    public form: FormGroup;
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    constructor(private fb: FormBuilder) { }

    public ngOnInit() {
        this.form = this.fb.group({});

        let fields = [];
        this.formConfig.form.forEach(gr => {
            if (gr.fields) { fields = fields.concat(gr.fields); }
            if (gr.panels) {
                gr.panels.forEach(panel => {
                    if (panel.fields) { fields = fields.concat(panel.fields); }
                });
            }
        });

        fields.forEach(field => {
            if (field.lookup && this.lookups && this.lookups.hasOwnProperty(field.lookup)) {
                field.options = this.lookups[field.lookup];
                if (field.extract) { field.options = field.options.map(f => f[field.extract]); }
            }
        });

        // this.form.disable();
    }

}
