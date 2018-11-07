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
    let debugElement: DebugElement;
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
        }).toThrowError('Trying to use an unsupported field type "text2". Supported types: text, select, editor, textarea, hidden, user, radio, checkbox');

    })

});
