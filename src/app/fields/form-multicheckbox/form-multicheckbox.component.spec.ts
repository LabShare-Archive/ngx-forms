import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMultiCheckboxComponent } from './form-multicheckbox.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('FormMulticheckboxComponent', () => {
    let component: FormMultiCheckboxComponent;
    let fixture: ComponentFixture<FormMultiCheckboxComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [FormMultiCheckboxComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormMultiCheckboxComponent);
        component = fixture.componentInstance;
        component.group = formBuilder.group({});
        component.field = { "type": "text", "label": "Explain", "name": "testName", "required": true };

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
