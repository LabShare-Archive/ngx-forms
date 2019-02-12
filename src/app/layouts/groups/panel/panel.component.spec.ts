import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFieldDirective } from "../../components/dynamic-field/dynamic-field.directive";
import { DebugElement } from "@angular/core";
import { PanelComponent } from './panel.component';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { FIELD_DICT_TOKEN, FieldDictionary } from '../../types';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { FormInputHiddenComponent } from '../../components/form-hidden/form-hidden.component'; // todo: mock fields

const defaultInputs: FieldDictionary = {
    text: FormInputComponent,
    hidden: FormInputHiddenComponent
}

describe('PanelComponent', () => {
    let component: PanelComponent;
    let fixture: ComponentFixture<PanelComponent>;
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
            declarations: [PanelComponent, DynamicFieldDirective],
            providers: [ { provide: FIELD_DICT_TOKEN, useValue: defaultInputs }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({});
        component.panelConfig = mockPanelConfig;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
