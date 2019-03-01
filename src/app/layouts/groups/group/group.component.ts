import { Component, OnInit } from '@angular/core';
import { FieldConfig, ILookup, PanelGroup, ConditionType } from '../../../../types'; // todo: move specific types here
import { BaseLayout } from '../../base-layout';
import { Subscription } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'layout-group-group',
    template: require('./group.component.html'),
    styles: [require('./group.component.scss').toString()]
})
export class GroupComponent extends BaseLayout implements OnInit {

    public ref = { groups: [] };
    private subscriptions: Subscription[] = [];
    public shown = [];

    public ngOnInit(): void {

        let fields: FieldConfig[] = [];
        this.formConfig.form.forEach((gr, index) => {
            this.shown.push({ hidden: index > 0, valid: false, controls: [] });
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


    ngAfterViewInit() {

        this.formConfig.form.forEach((group, index) => {
            let fields = [];

            if (group.fields) {
                fields = fields.concat(group.fields);
            }

            if (group.panels) {
                group.panels.forEach(panel => { if (panel.fields) { fields = fields.concat(panel.fields); } });
            }

            this.shown[index].controls = fields.filter(f => f.required).map(f => this.group.get(f.name));

            if (this.shown[index].controls.length === 0) { this.shown[index].valid = true; } else {
                this.shown[index].controls.forEach((control: AbstractControl) => {
                    this.subscriptions.push(control.statusChanges.subscribe(() => {
                        this.shown[index].valid = this.shown[index].controls.every((ctrl: AbstractControl) => ctrl.valid);
                    }));
                });
            }
        });
    }

    public selected = 0;

    select(index: number): void {
        this.shown[this.selected].hidden = true;
        this.shown[index].hidden = false;
        this.selected = index;
    }

    public getSelected() {
        return this.selected;
    }

    public prev() {
        this.select(this.selected - 1);
    }

    public next() {
        this.select(this.selected + 1);
    }

    public disablePrev() {
        return this.selected < 1;
    }

    public disableNext() {
        return this.selected > this.shown.length - 2;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }

}
