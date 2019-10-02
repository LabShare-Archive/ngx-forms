import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormJsonComponent } from './json.component'
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { JsonControlValueAccessorComponent } from './json-control/json-control.component'

describe('FormJsonComponent', () => {
    let component: FormJsonComponent;
    let fixture: ComponentFixture<FormJsonComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [FormJsonComponent, JsonControlValueAccessorComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormJsonComponent);
        component = fixture.componentInstance;
        component.group = formBuilder.group({ testName: formBuilder.control('') });
        component.field = {
            "type": "text",
            "label": "Explain",
            "name": "testName",
            "required": true
        };

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
