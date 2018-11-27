import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputComponent as Type} from './form-input.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import * as _ from 'lodash';
import { By } from '@angular/platform-browser';

describe('FormInputComponent', () => {
    let component: Type;
    let fixture: ComponentFixture<Type>;
    const formBuilder: FormBuilder = new FormBuilder();
    let directiveEl;
    let value = "Some Test Value";

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

                component.field = { type: "text", name: "test", required: true };
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
        directiveEl = fixture.debugElement.query(By.css('input'));
        expect(directiveEl.nativeElement.value).toEqual(value);
    });

    it('ensures required asterix appears', () => {
        directiveEl = fixture.debugElement.query(By.css('span'));
        expect(directiveEl).toBeTruthy();
    });

});
