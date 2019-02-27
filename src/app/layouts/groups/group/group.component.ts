import { Component, Input, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FieldConfig, ILookup, PanelGroup, ConditionType } from '../../../../types'; // todo: move specific types here
import { BaseLayout } from '../../base-layout';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormNavService } from '../group/nav/services/form-nav.service';

@Component({
    selector: 'layout-group-group',
    template: require('./group.component.html'),
    styles: [require('./group.component.scss').toString()]
})
export class GroupComponent extends BaseLayout implements OnInit, OnDestroy, AfterContentInit {

    public ref = { groups: [] };
    private subscriptions: Subscription[] = [];

    @Input() form: FormGroup;

    constructor(private ns: FormNavService) {
        super();
        ns.addWatcher(this.ref);
    }

    public ngOnInit(): void {
        this.ns.addWatcher(this.ref);
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

    ngAfterContentInit() {
        const x = Object.keys(this.form.controls);

        for (const group of this.ref.groups) {
            let fields = [];
            if (group.fields) {
                fields = fields.concat(group.fields);
            }
            if (group.panels) {
                group.panels.forEach(panel => { if (panel.fields) { fields = fields.concat(panel.fields); } });
            }
            group.controls = fields.filter(f => f.required).map(f => this.form.get(f.name));

            if (group.controls.length === 0) { group.valid = true; } else {
                group.controls.forEach((control: AbstractControl) => {
                    this.subscriptions.push(control.statusChanges.subscribe(() => {
                        group.valid = group.controls.every((ctrl: AbstractControl) => ctrl.valid);
                    }));
                });
            }
        }
    }

    public select(index) {
        this.ns.select(index);
    }

    public getSelected() {
        return this.ns.selected;
    }

    public prev() {
        this.select(this.ns.selected - 1);
    }

    public next() {
        this.select(this.ns.selected + 1);
    }

    public disablePrev() {
        return this.ns.selected < 1;
    }

    public disableNext() {
        return this.ns.selected > this.ref.groups.length - 2;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
        this.ns.reset();
    }

}
