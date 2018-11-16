import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPanelComponent } from '../dynamic-panel/dynamic-panel.component';
import { DynamicFieldDirective } from '../../components/dynamic-field/dynamic-field.directive';
import { DebugElement, Component, NgModule } from "@angular/core";
import { DynamicFormComponent } from "./dynamic-form.component";
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DynamicFieldService } from "../../services/dynamic-field.service";
import { PreloadService } from '../../services/preload.service';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { FormSelectComponent } from '../../components/form-select/form-select.component';
import { FormInputHidden } from '../../components/form-hidden/form-hidden.component';
import { By } from '@angular/platform-browser';

interface IFormConfig {
    form: any;
    fields: any[]
}

interface IDynamicForm {
    formConfig: IFormConfig
    data: any
    dynamicForm: any
    lookups: any
}

@Component({
    template: `<dynamic-form [formConfig]="formConfig" #form="dynamicForm" [model]="data" [dataProvider]="dataProvider" [lookups]="lookups"></dynamic-form>`
})
class TestComponent implements IDynamicForm {
    formConfig
    data: {};
    dynamicForm: {};
    lookups: {};
}

@NgModule({
    declarations: [FormInputComponent, FormSelectComponent, FormInputHidden],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    entryComponents: [FormInputComponent, FormSelectComponent, FormInputHidden]
})
class TestModule { }

describe('DynamicFormComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveEl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFieldDirective, TestComponent, DynamicFormComponent, DynamicPanelComponent],
            imports: [FormsModule, ReactiveFormsModule, TestModule],
            providers: [DynamicFieldService, PreloadService, DataService]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TestComponent);
                component = fixture.componentInstance;
                component.formConfig = {
                    fields: [
                        { type: 'hidden', name: 'id' },
                        { type: 'text', label: 'Publication Title:', name: 'title', placeholder: '', required: true },
                        { type: 'select', label: 'Publication Type', name: 'activityType', options: ['a', 'b'] }
                    ],
                    form: [{ label: 'Title and Abstract', panels: [{ label: 'Title and Abstract', fields: ['id', 'title', 'activityType'] }] }]
                }

                fixture.detectChanges();
            });
    }));

    it('loads input-hidden component', () => {
        directiveEl = fixture.debugElement.query(By.directive(FormInputHidden));
        expect(directiveEl).not.toBeNull();
    });

    it('loads input-select component', () => {
        directiveEl = fixture.debugElement.query(By.directive(FormSelectComponent));
        expect(directiveEl).not.toBeNull();
    });

    it('loads dynamic-panel component', () => {
        directiveEl = fixture.debugElement.query(By.directive(DynamicPanelComponent));
        expect(directiveEl).not.toBeNull();
    });

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
