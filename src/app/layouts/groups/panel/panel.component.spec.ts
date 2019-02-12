import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component } from "@angular/core";
import { PanelComponent } from './panel.component';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { FIELD_DICT_TOKEN, FieldDictionary, FieldConfig, Field } from '../../../../types';
import { CommonModule } from '@angular/common';
import { DynamicFieldModule } from '../../../dynamic-field/dynamic-field.module';

@Component({
    selector: 'form-input'
})
export class FormInputComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}

const defaultInputs: FieldDictionary = {
    text: FormInputComponent
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
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                DynamicFieldModule
            ],
            declarations: [PanelComponent],
            providers: [{ provide: FIELD_DICT_TOKEN, useValue: defaultInputs }]
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
