import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, ILookup, FormConfig, PanelGroup, ConditionType, Layout } from '../../../../types'; // todo: move specific types here

@Component({
    selector: 'layout-group-group',
    template: require('./group.component.html'),
    styles: [require('./group.component.scss').toString()]
})
export class GroupComponent implements OnInit, Layout {
    @Input() formConfig: FormConfig;
    @Input() model: any;
    @Input() lookups: object;
    @Input() formGroup: FormGroup;

    public ngOnInit(): void {
        let fields: FieldConfig[] = [];
        this.formConfig.form.forEach(gr => {
            if (gr.fields) { fields = fields.concat(gr.fields); }
            if (gr.panels) {
                gr.panels.forEach(panel => {
                    if (panel.fields) { fields = fields.concat(panel.fields); }
                });
            }

            if (gr.enableWhen && !this.checkRules(gr, this.model)) { fields.forEach(f => f.disabled = true); }
        });

        fields.forEach((field: FieldConfig) => {
            if (field.lookup && this.lookups) {
                const cfg = typeof field.lookup === 'string' ? { name: field.lookup, extract: null } as ILookup : field.lookup as ILookup;
                field.options = cfg.extract ? this.lookups[cfg.name].map(l => l[cfg.extract]) : this.lookups[cfg.name];
                return;
            }

            // TODO: this code is for cases when multiple lookups required the same time
            // if (field.lookups && Array.isArray(field.lookups) && this.lookups) {
            //     field.options = field.lookups
            //         .map(obj => typeof obj === "string" ? { name: obj } : obj as ILookup)
            //         .map(obj =>
            //             obj.extract ? this.lookups[obj.name].map(l => l[obj.extract]) : this.lookups[obj.name]);
            // }

        });
    }

    public checkRules(group: PanelGroup, data): boolean {
        let enabled = true;
        if (!group.enableWhen) { return; }

        // todo: refactor similar to ngx-publications
        // todo: merge ngx-forms and ngx-pubs

        const enableWhen = group.enableWhen;

        if (!enableWhen.rules.length) { return true; }

        const checkRule = rule => {
            let field;
            const value = data[rule.field] || (field = group.fields.find(f => f.name === rule.field)) && field.value || '';
            if (!Array.isArray(rule.equals)) { rule.equals = [rule.equals]; }
            return rule.equals.indexOf(value) > -1;
        };

        if (enableWhen.type === ConditionType.Or || !enableWhen.type) {
            enabled = enableWhen.rules.some(checkRule);
        }

        if (enableWhen.type === ConditionType.And) {
            enabled = enableWhen.rules.every(checkRule);
        }

        // leave if() conditions in case other logic operators needed (XOR, etc)

        return enabled;
    }

}
