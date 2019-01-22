import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFieldDirective } from "../../components/dynamic-field/dynamic-field.directive";
import { DebugElement } from "@angular/core";
import { DynamicPanelComponent } from './dynamic-panel.component';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { FIELD_DICT_TOKEN, FieldDictionary } from '../../types';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { FormInputHiddenComponent } from '../../components/form-hidden/form-hidden.component';

const defaultInputs: FieldDictionary = {
    text: FormInputComponent,
    hidden: FormInputHiddenComponent
}

describe('DynamicPanelComponent', () => {
    let component: DynamicPanelComponent;
    let fixture: ComponentFixture<DynamicPanelComponent>;
    let directiveEl: DebugElement;
    let mockFieldsConfig = [
        {
            type: 'testField',
            name: 'testField',
            label: 'fieldLabel'
        }
    ];

    let mockPanelConfig = [
        {
            label: 'TestLabel',
            panels: [
                {
                    label: 'TestPanelPanel',
                    fields: [
                        'testField'
                    ]
                }
            ]
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [DynamicPanelComponent, DynamicFieldDirective],
            providers: [ { provide: FIELD_DICT_TOKEN, useValue: defaultInputs }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicPanelComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({});
        component.panelConfig = mockPanelConfig;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
