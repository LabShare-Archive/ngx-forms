import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRadioComponent } from './form-radio.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('FormRadioComponent', () => {
    let component: FormRadioComponent;
    let fixture: ComponentFixture<FormRadioComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [FormRadioComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormRadioComponent);
        component = fixture.componentInstance;
        component.group = formBuilder.group({});
        component.field = { "type": "text", "label": "Explain", "name": "testName", "required": true };

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
