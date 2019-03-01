import { Component, NgModule } from "@angular/core";
import { Field, FieldConfig, FieldDictionary, FIELD_DICT_TOKEN, ConditionType, LAYOUTS_TOKEN, FormConfig } from "../../../types";
import { FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ComponentFixture, TestBed, async, tick, fakeAsync } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { DynamicFieldModule } from "../../dynamic-field/dynamic-field.module";
import { DynamicFieldDirective } from "../../dynamic-field/dynamic-field.directive";
import { By } from "@angular/platform-browser";
import { GroupComponent } from './group.component';
import { DynamicFormDirective } from '../../dynamic-form/dynamic-form.component';

@Component({
    selector: 'form-input',
    template: '<div [formGroup]="group"><input [formControlName]="field.name"></div>'
})
export class FormInputComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}

const defaultInputs: FieldDictionary = {
    text: FormInputComponent
}

const layouts = {
    groups: GroupComponent
}

@Component({
    template: `<dynamic-form [formConfig]="formConfig" #form="dynamicForm" [model]="data" [lookups]="lookups"></dynamic-form>`
})
class TestComponent {
    formConfig
    data: {};
    dynamicForm: {};
    lookups: {};
}

@NgModule({
    declarations: [FormInputComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    entryComponents: [FormInputComponent, GroupComponent]
})
class TestModule { }

describe('GroupComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveEl;



    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, GroupComponent, DynamicFormDirective],
            imports: [FormsModule, ReactiveFormsModule, TestModule, DynamicFieldModule],
            providers: [{ provide: FIELD_DICT_TOKEN, useValue: defaultInputs },
            { provide: LAYOUTS_TOKEN, useValue: layouts }]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TestComponent);

                component = fixture.componentInstance;
                component.formConfig = {
                    layout: 'groups',
                    form: [{
                        fields: [
                            { type: 'text', label: 'Publication Title:', name: 'title', placeholder: '', required: true }
                        ]
                    }]
                };

                fixture.detectChanges();
            });
    }));

    it('loads dyncamic-field component', () => {
        directiveEl = fixture.debugElement.query(By.directive(DynamicFieldDirective));
        expect(directiveEl).not.toBeNull();
    });

    it('loads form-input component', () => {
        directiveEl = fixture.debugElement.query(By.directive(FormInputComponent));
        expect(directiveEl).not.toBeNull();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

describe('GroupComponent Core', () => {
    let component: GroupComponent;
    let fixture: ComponentFixture<GroupComponent>;
    let model = { test: 'test', title: 'title' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFieldDirective, TestComponent, GroupComponent, DynamicFormDirective],
            imports: [FormsModule, ReactiveFormsModule, TestModule],
            providers: [{ provide: FIELD_DICT_TOKEN, useValue: defaultInputs }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({})
        component.formConfig = {
            form: [
                { label: 'fields and panels', panels: [{ label: 'fields', fields: [{ type: 'text', name: 'title', required: true }] }] },
                { label: 'fields, no panels', fields: [{ type: 'text', name: 'test', required: true }] },
                { label: 'no fields with panels', panels: [{ label: 'no fields' }] },
                { label: 'no fields, no panels' }
            ]
        } as FormConfig;
        component.model = model;
        fixture.detectChanges();
        component.ngAfterViewInit();
    });

    describe('ngOnInit()', () => {

        it('should create group', () => {
            expect(component.group).toBeDefined();
        });

        describe('Lookup Expansion', () => {

            it('should not find lookup when no lookups were passed', () => {
                component.lookups = null;
                component.formConfig = { form: [{ fields: [{ type: 'text', name: 'title', lookup: 'test' }] }] } as FormConfig;
                component.ngOnInit();
                expect(component.fconfig[0].fields[0].options).toBeUndefined();
            });

            it('should not find lookup when no lookups found', () => {
                component.lookups = { test: ['a', 'b', 'c'] };;
                component.formConfig = { form: [{ fields: [{ type: 'text', name: 'title' }] }] } as FormConfig;
                component.ngOnInit();
                expect(component.fconfig[0].fields[0].options).toBeUndefined();
            });

            it('should not copy lookup with wrong name', () => {
                component.lookups = { test: ['a', 'b', 'c'] };;
                component.formConfig = { form: [{ fields: [{ type: 'text', name: 'title', lookup: 'test1' }] }] } as FormConfig;
                component.ngOnInit();
                expect(component.fconfig[0].fields[0].options).toBeUndefined();
            });

            it('should copy lookup', () => {
                component.lookups = { test: ['a', 'b', 'c'] };;
                component.formConfig = { form: [{ fields: [{ type: 'text', name: 'title', lookup: 'test' }] }] } as FormConfig;
                component.ngOnInit();
                expect(component.fconfig[0].fields[0].options).toEqual(['a', 'b', 'c']);
            });

            it('should extract lookup', () => {
                component.lookups = { test: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] };;
                component.formConfig = { form: [{ fields: [{ type: 'text', name: 'title', lookup: { name: 'test', extract: 't' } }] }] } as FormConfig;
                component.ngOnInit();
                expect(component.fconfig[0].fields[0].options).toEqual(['a', 'b', 'c']);
            });

        });

        describe('Conditional Disabling', () => {

            it('should enable the fields', () => {
                component.model = { title: 'test' };
                component.formConfig = { form: [{ fields: [{ type: 'text', name: 'title' }], enableWhen: { rules: [{ field: "title", equals: ["test"] }] } }] } as FormConfig;
                component.ngOnInit();
                expect(component.fconfig[0].fields[0].disabled).toBeFalsy();
            });

            it('should disable the fields', () => {
                component.model = { title: 'test' };
                component.formConfig = { form: [{ fields: [{ type: 'text', name: 'title' }], enableWhen: { rules: [{ field: "title", equals: ["test1"] }] } }] } as FormConfig;
                component.ngOnInit();
                expect(component.fconfig[0].fields[0].disabled).toBeTruthy();
            });
        });

        describe('checkRules()', () => {

            it('should not run rules', () => {
                const model = { title: 'test' };
                const cfg = {};
                expect(component.checkRules(cfg, model, [])).toBeUndefined();
            });

            it('should not run rules where there are none', () => {
                const model = { title: 'test' };
                const cfg = { enableWhen: { rules: [] } };
                expect(component.checkRules(cfg, model, [])).toBeTruthy();
            });

            it('should run one rule and return true', () => {
                const model = { title: 'test' };
                const cfg = { enableWhen: { rules: [{ field: "title", equals: ["test"] }] } };
                expect(component.checkRules(cfg, model, [])).toBeTruthy();
            });

            it('should run one rule, wrap equals, and return true', () => {
                const model = { title: 'test' };
                const cfg = { enableWhen: { rules: [{ field: "title", equals: "test" }] } };
                expect(component.checkRules(cfg, model, [])).toBeTruthy();
            });

            it('should run one rule and return false', () => {
                const model = { title: 'test' };
                const cfg = { enableWhen: { rules: [{ field: "title", equals: ["test1"] }] } };
                expect(component.checkRules(cfg, model, [])).toBeFalsy();
            });

            it('should check default field value and return true when rule match', () => {
                const cfg = {
                    fields: [
                        { name: "title", type: 'text', value: 'test' }
                    ],
                    enableWhen: { type: ConditionType.Or, rules: [{ field: "title", equals: ["test"] }] }
                };
                expect(component.checkRules(cfg, {}, cfg.fields)).toBeTruthy();
            });

            it('should check default field value and return false when rule match', () => {
                const cfg = {
                    fields: [
                        { name: "title", type: 'text' }
                    ],
                    enableWhen: { type: ConditionType.Or, rules: [{ field: "title", equals: ["test"] }] }
                };
                expect(component.checkRules(cfg, {}, cfg.fields)).toBeFalsy();
            });

            it('should check default field value and return true whrn all rules match', () => {
                const cfg = {
                    fields: [
                        { name: "title", type: 'text', value: 'test' },
                        { name: "count", type: 'text', value: 1 }
                    ],
                    enableWhen: { type: ConditionType.And, rules: [{ field: "title", equals: ["test"] }, { field: "count", equals: [1] }] }
                };
                expect(component.checkRules(cfg, {}, cfg.fields)).toBeTruthy();
            });

            it('should check default field false when value is not found', () => {
                const cfg = {
                    fields: [
                        { name: "title", type: 'text', value: 'test' },
                        { name: "count", type: 'text' }
                    ],
                    enableWhen: { type: ConditionType.And, rules: [{ field: "title", equals: ["test"] }, { field: "count", equals: [1] }] }
                };
                expect(component.checkRules(cfg, {}, cfg.fields)).toBeFalsy();
            });

            it('should run multiple rules with `and` and return false when one does not match', () => {
                const model = { title: 'test', count: 1 };
                const cfg = { enableWhen: { type: ConditionType.And, rules: [{ field: "title", equals: ["test"] }, { field: "count", equals: [1123] }] } };
                expect(component.checkRules(cfg, model, [])).toBeFalsy();
            });

            it('should run multiple rules with `or` and return false when none match', () => {
                const model = { title: 'test', count: 1 };
                const cfg = { enableWhen: { type: ConditionType.Or, rules: [{ field: "title", equals: ["test1"] }, { field: "count", equals: [1123] }] } };
                expect(component.checkRules(cfg, model, [])).toBeFalsy();
            });

            it('should run multiple rules with `or` and return true when one match', () => {
                const model = { title: 'test', count: 1 };
                const cfg = { enableWhen: { type: ConditionType.Or, rules: [{ field: "title", equals: ["test"] }, { field: "count", equals: [1222] }] } };
                expect(component.checkRules(cfg, model, [])).toBeTruthy();
            });

            it('should check default field value and return true when one OR rules match', () => {
                const cfg = {
                    fields: [
                        { name: "title", type: 'text', value: 'test' },
                        { name: "count", type: 'text', value: 3 }
                    ],
                    enableWhen: { type: ConditionType.Or, rules: [{ field: "title", equals: ["test"] }, { field: "count", equals: [1] }] }
                };
                expect(component.checkRules(cfg, {}, cfg.fields)).toBeTruthy();
            });

            it('should check default field false when value is not found', () => {
                const cfg = {
                    fields: [
                        { name: "title", type: 'text' },
                        { name: "count", type: 'text' }
                    ],
                    enableWhen: { type: ConditionType.Or, rules: [{ field: "title", equals: ["test"] }, { field: "count", equals: [1] }] }
                };
                expect(component.checkRules(cfg, {}, cfg.fields)).toBeFalsy();
            });

        });

        describe('next()', () => {
            it('should select next item', () => {
                component.next();
                expect(component.selected).toEqual(1);
            });
        });

        describe('prev()', () => {
            it('should select next item', () => {
                component.select(2);
                component.prev();
                expect(component.selected).toEqual(1);
            });
        });


        describe('subscription()', () => {
            it('should extract lookup', () => {
                component.lookups = { test: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] };;
                component.formConfig = { form: [{ fields: [{ type: 'text', name: 'title', lookup: { name: 'test', extract: 't' } }] }] } as FormConfig;
                component.ngOnInit();
                component.ngAfterViewInit();
                component.group.patchValue({title: 'test2'});
                expect(component.groupProps[0].valid).toBeTruthy();
            });
        });


    });

});
