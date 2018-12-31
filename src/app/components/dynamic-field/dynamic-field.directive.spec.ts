import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFieldDirective } from "./dynamic-field.directive"
import { By } from '@angular/platform-browser';
import { IFieldConfig } from "../../models/field-config.interface";
import { DynamicFieldService } from "../../services/dynamic-field.service";
import { FormInputComponent } from "../form-input/form-input.component";
import { PreloadService } from '../../services/preload.service';

@Component({
    template: `<form [formGroup]="form"><div dynamicField [field]="field" [group]="form"></div></form>`
})
class TestComponent {
    field: IFieldConfig;
    form: FormGroup;
}

@NgModule({
    declarations: [FormInputComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    entryComponents: [FormInputComponent]
})
class TestModule { }

describe('dynamicField', () => {
    let component: TestComponent;
    let componentError: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let fixtureError: ComponentFixture<TestComponent>;
    let directiveEl;

    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFieldDirective, TestComponent],
            imports: [FormsModule, ReactiveFormsModule, TestModule],
            providers: [DynamicFieldService, PreloadService]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.field = { "type": "text", "label": "Title", "name": "publicationTitle", "placeholder": "Please enter", "required": true };
        component.form = formBuilder.group({
            publicationTitle: new FormControl('test')
        });
        fixture.detectChanges();
    });

    it('loads directive and form-input component', () => {
        directiveEl = fixture.debugElement.query(By.directive(DynamicFieldDirective));
        expect(directiveEl).not.toBeNull();
    });

    it('throws error when put incorrect type', () => {
        fixtureError = TestBed.createComponent(TestComponent);
        componentError = fixtureError.componentInstance;
        componentError.field = { "type": "text2", "label": "Title", "name": "publicationTitle", "placeholder": "Please enter", "required": true };
        componentError.form = formBuilder.group({
            publicationTitle: new FormControl('test')
        });

        expect(() => {
            fixtureError.detectChanges();
        }).toThrowError()

    });

    describe('createControl()', () => {
        let dir;

        beforeEach(() => {
            TestBed.compileComponents()
            directiveEl = fixture.debugElement.query(By.directive(DynamicFieldDirective));
            dir = directiveEl.injector.get(DynamicFieldDirective);
        });

        let cfg = { name: 'test', type: 'text', disabled: true, required: true, minLength: 5, maxLength: 10, email: true, min: 1, max: 10, pattern: new RegExp('\d'), nullValidator: true, value: 5 };

        it('should set pattern validator', () => {
            let control = dir.createControl({ name: 'test', type: 'text', pattern: new RegExp('\d'), value: 5 });
            const vals = control.validator(control);
            expect(vals.pattern).toBeTruthy();
        });

        it('should set email validator', () => {
            let control = dir.createControl({ name: 'test', type: 'text', email: true, value: 5 });
            const vals = control.validator(control);
            expect(vals.email).toBeTruthy();
        });

        it('should set min length validator', () => {
            let control = dir.createControl({ name: 'test', type: 'text', minLength: 5, maxLength: 10, value: 'test' });
            const vals = control.validator(control);
            expect(vals.minlength).toBeTruthy();
        });

        it('should set max length validator', () => {
            let control = dir.createControl({ name: 'test', type: 'text', maxLength: 2, value: 'test' });
            const vals = control.validator(control);
            expect(vals.maxlength).toBeTruthy();
        });

        it('should set required validator', () => {
            let control = dir.createControl({ name: 'test', type: 'text', required: true, value: '' });
            const vals = control.validator(control);
            expect(vals.required).toBeTruthy();
        });

        it('should set min value validator', () => {
            let control = dir.createControl({ name: 'test', type: 'text', min: 2, value: 1 });
            const vals = control.validator(control);
            expect(vals.min).toBeTruthy();
        });

        it('should set max value validator', () => {
            let control = dir.createControl({ name: 'test', type: 'text', max: 2, value: 22 });
            const vals = control.validator(control);
            expect(vals.max).toBeTruthy();
        });

        it('should set value', () => {
            let control = dir.createControl(cfg);
            expect(control.value).toEqual(cfg.value);
        });

    });
});

