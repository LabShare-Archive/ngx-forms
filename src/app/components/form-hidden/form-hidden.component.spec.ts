import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputHiddenComponent } from './form-hidden.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('FormInputHiddenComponent', () => {
    let component: FormInputHiddenComponent;
    let fixture: ComponentFixture<FormInputHiddenComponent>;
    const formBuilder: FormBuilder = new FormBuilder();
    let directiveEl;
    let value = "Some Test Value";

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [FormInputHiddenComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(FormInputHiddenComponent);
                component = fixture.componentInstance;

                component.field = { type: "hidden", name: "test" };
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

    it('ensures component is rendered', () => {
        directiveEl = fixture.debugElement.query(By.css('input[type=hidden]'));
        expect(directiveEl.nativeElement.value).toEqual(value)
    });

});
