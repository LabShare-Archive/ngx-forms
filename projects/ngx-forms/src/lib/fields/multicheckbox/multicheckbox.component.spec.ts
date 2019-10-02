import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiCheckboxComponent } from './multicheckbox.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { MulticheckboxControlComponent } from './multicheckbox-control/multicheckbox-control.component';

describe('FormMulticheckboxComponent', () => {
    let component: MultiCheckboxComponent;
    let fixture: ComponentFixture<MultiCheckboxComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [MultiCheckboxComponent, MulticheckboxControlComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiCheckboxComponent);
        component = fixture.componentInstance;
        component.group = formBuilder.group({ testName: formBuilder.control('')});
        component.field = {
            type: 'text',
            label: 'Explain',
            name: 'testName',
            required: true,
            options: ['one', 'two', 'three']
        };

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
