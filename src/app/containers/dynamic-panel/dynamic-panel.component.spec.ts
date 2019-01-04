import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DynamicFieldDirective } from "../../components/dynamic-field/dynamic-field.directive";
import { DebugElement } from "@angular/core";
import { DynamicPanelComponent } from './dynamic-panel.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFieldService } from "../../services/dynamic-field.service";


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
            providers: [DynamicFieldService]
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
