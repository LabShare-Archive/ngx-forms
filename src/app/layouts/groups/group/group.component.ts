import { Component, OnInit } from '@angular/core';
import { FieldConfig, ILookup, PanelGroup, ConditionType } from '../../../../types'; // todo: move specific types here
import { BaseLayout } from '../../base-layout';

@Component({
    selector: 'layout-group-group',
    template: require('./group.component.html'),
    styles: [require('./group.component.scss').toString()]
})
export class GroupComponent extends BaseLayout implements OnInit {

    public ngOnInit(): void {
        let fields: FieldConfig[] = [];
        this.formConfig.form.forEach(gr => {
            if (gr.fields) { fields = fields.concat(gr.fields); }
            if (gr.panels) {
                gr.panels.forEach(panel => {
                    if (panel.fields) { fields = fields.concat(panel.fields); }
                });
            }

            if (gr.enableWhen && !this.checkRules(gr, this.model, fields)) { fields.forEach(f => f.disabled = true); }
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

    public checkRules(groupCfg: PanelGroup, model, allFields: FieldConfig[]): boolean {
        let enabled = true;
        if (!groupCfg.enableWhen) { return; }

        const enableWhen = groupCfg.enableWhen;

        if (!enableWhen.rules.length) { return true; }

        const checkRule = rule => {
            let field;
            const value = model[rule.field] || (field = allFields.find(f => f.name === rule.field)) && field.value || '';
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
