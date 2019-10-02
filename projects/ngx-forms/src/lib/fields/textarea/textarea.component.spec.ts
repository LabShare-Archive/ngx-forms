import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextareaComponent } from "./textarea.component";
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('FormTextareaComponent', () => {
    let component: FormTextareaComponent;
    let fixture: ComponentFixture<FormTextareaComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [FormTextareaComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTextareaComponent);
        component = fixture.componentInstance;
        component.field = { "type": "textarea", "label": "Explain", "name": "testName", "required": true };
        component.group = formBuilder.group({ testName: ['']});

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
