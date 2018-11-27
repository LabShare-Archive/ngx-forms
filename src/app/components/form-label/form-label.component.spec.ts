import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLabelComponent as Type } from './form-label.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import * as _ from 'lodash';
import { By } from '@angular/platform-browser';

describe('FormInputHiddenComponent', () => {
    let component: Type;
    let fixture: ComponentFixture<Type>;
    const formBuilder: FormBuilder = new FormBuilder();
    let directiveEl;
    const value = "Test Value"

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [Type],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(Type);
                component = fixture.componentInstance;

                component.field = { type: "label", name: "test" };
                component.group = new FormGroup({
                    test: new FormControl('')
                });
                component.group.patchValue({
                    test: value
                });

                fixture.detectChanges();
            });
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('ensures component is rendered and value is set', () => {
        directiveEl = fixture.debugElement.query(By.css('span'));
        expect(directiveEl.nativeElement.innerHTML).toEqual(value);
    });

});
