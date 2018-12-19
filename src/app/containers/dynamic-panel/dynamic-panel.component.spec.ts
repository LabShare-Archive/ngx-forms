import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DynamicFieldDirective } from "../../components/dynamic-field/dynamic-field.directive";
import { DebugElement } from "@angular/core";
import { DynamicPanelComponent } from './dynamic-panel.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DynamicFieldService } from "../../services/dynamic-field.service";
import { FieldConfigService } from '../../services/field-config.service';


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

    const formBuilder: FormBuilder = new FormBuilder();
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [DynamicPanelComponent, DynamicFieldDirective],
            providers: [DataService, DynamicFieldService, FieldConfigService]
        })
            .compileComponents();
    }));

    beforeEach(inject([FieldConfigService], (fcs: FieldConfigService) => {
        fcs.addFields(mockFieldsConfig);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicPanelComponent);
        component = fixture.componentInstance;
        component.group = formBuilder.group({});
        component.panelConfig = mockPanelConfig;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('get field object from FieldsConfig for each panel', () => {
        let fieldName = 'testField';
        expect(component.getFieldConfig(fieldName)).toBe(mockFieldsConfig[0]);
        let wrongFieldName = 'wrongTestField';
        expect(() => {
            component.getFieldConfig(wrongFieldName);
        }).toThrowError(`Can't find field name: ${wrongFieldName}, please check config file!`);
    })
});
