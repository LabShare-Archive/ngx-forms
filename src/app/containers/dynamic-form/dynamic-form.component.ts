import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, ILookup } from '../../types';

export const enum ConditionType {
    And = 'and',
    Or = 'or'
}

export interface IFormConfig {
    form: PanelGroup[];
}

export interface ConditionRule {
    field: string;
    equals: any[];
}

export interface EnableWhenConfig {
    type?: ConditionType;
    rules: ConditionRule[];
}

export interface PanelConfig {
    label?: string;
    fields?: FieldConfig[];
    enableWhen?: any;
}

export interface PanelGroup {
    label?: string;
    fields?: FieldConfig[];
    panels?: PanelConfig[];
    enableWhen?: EnableWhenConfig;
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
    get rawValue() { return this.form.getRawValue(); }


    // TODO: convert this into visitor or something like that

    public ngOnInit(): void {
        this.form = new FormGroup({});

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
        if (!group.enableWhen) return;
        const enableWhen = group.enableWhen;

        // TODO: add check if `equals is not array and wrap it equals = [equals]
        // TODO: Refactor this code

        if (enableWhen.rules.length === 1) {
            const rule = enableWhen.rules[0];
            let field;
            const value = data[rule.field] || (field = group.fields.find(f => f.name === rule.field)) && field.value || "";
            enabled = rule.equals.indexOf(value) > -1;
        }

        if (enableWhen.rules.length > 1) {
            if (!enableWhen.type) { throw new Error('enableWhen type must be defined'); }

            if (enableWhen.type === ConditionType.Or) {
                enabled = false;
                enableWhen.rules.forEach(rule => {
                    let field;
                    const value = data[rule.field] || (field = group.fields.find(f => f.name === rule.field)) && field.value || "";
                    enabled = enabled || rule.equals.indexOf(value) > -1;
                });
            }

            if (enableWhen.type === ConditionType.And) {
                enableWhen.rules.forEach(rule => {
                    let field;
                    const value = data[rule.field] || (field = group.fields.find(f => f.name === rule.field)) && field.value || "";
                    enabled = enabled && rule.equals.indexOf(value) > -1;
                });
            }
        }

        return enabled;
    }

}
