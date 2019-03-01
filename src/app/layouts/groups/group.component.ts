import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FieldConfig, ILookup, PanelGroup, ConditionType } from '../../../types'; // todo: move specific types here
import { BaseLayout } from '../base-layout';
import { Subscription } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'layout-group-group',
    template: require('./group.component.html'),
    styles: [require('./group.component.scss').toString()]
})
export class GroupComponent extends BaseLayout implements OnInit, AfterViewInit, OnDestroy {

    public ref = { groups: [] };
    private subscriptions: Subscription[] = [];
    public groupProps = [];
    public selected = 0;

    public fconfig = [];

    public ngOnInit(): void {

        this.fconfig = JSON.parse(JSON.stringify(this.formConfig.form));

        this.fconfig.forEach((group, index) => {
            let fields: FieldConfig[] = [];
            if (group.fields) { fields = fields.concat(group.fields); }
            if (group.panels) {
                group.panels.forEach(panel => {
                    if (panel.fields) { fields = fields.concat(panel.fields); }
                });
            }
            this.groupProps.push({ hidden: index > 0, valid: true, controls: [], fields: fields });

            if (group.enableWhen) {
                if (!this.checkRules(group, this.model, fields)) {
                    fields.forEach(f => f.disabled = true);
                }
            }

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
        this.fconfig.forEach((group, index) => {
            this.groupProps[index].fields
                .filter((f: FieldConfig) => f.required)
                .forEach((f: FieldConfig) => {
                    this.subscriptions.push(this.group.get(f.name).statusChanges.subscribe(() => {
                        this.groupProps[index].valid = this.groupProps[index].controls.every((ctrl: AbstractControl) => ctrl.valid);
                    }));
                });
        });
    }

    select(index: number): void {
        this.groupProps[this.selected].hidden = true;
        this.groupProps[index].hidden = false;
        this.selected = index;
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
        return this.selected > this.groupProps.length - 2;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }

}
