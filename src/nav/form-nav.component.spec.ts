import { FormNavComponent } from './form-nav.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { APP_BASE_HREF } from '@angular/common';

describe('nav', () => {
    let component: FormNavComponent;
    let fixture: ComponentFixture<FormNavComponent>;
    let mockBroadcastData = {
        value: 'TestLabel'
    };
    let mockFormsConfig = [
        {
            label: 'TestFormLabel1',
            panels: [
                {
                    label: 'TestPanelLabel1',
                    fields: [
                        'TestField1'
                    ]
                }
            ]
        },
        {
            label: 'TestFormLabel2',
            panels: [
                {
                    label: 'TestPanelLabel2',
                    fields: [
                        'TestField2'
                    ]
                }
            ]
        }
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
            ],
            declarations: [FormNavComponent],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNavComponent);
        component = fixture.componentInstance;
    });

    // it('select first object in config by default', inject([OqbserverService], (oqbserverService: OqbserverService)=> {
    //     oqbserverService.on(Events.SELECT_FORM_TAB, (events)=> {});
    //     component.config = mockFormsConfig;
    //     fixture.detectChanges();
    //     expect(component.selectedLabel).toBe('TestFormLabel1');
    // }))

});