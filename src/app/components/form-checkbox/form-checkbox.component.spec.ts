import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCheckboxComponent as Type } from './form-checkbox.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('FormCheckboxComponent', () => {
    let component: Type;
    let fixture: ComponentFixture<Type>;
    let directiveEl;
    let value = "bbb";

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

                component.field = { type: "checkbox", name: "test", required: true, options: ['aaa', 'bbb', 'ccc'] };
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
        directiveEl = fixture.debugElement.queryAll(By.css('input'));
        expect(directiveEl.length).toEqual(component.field.options.length);
    });

    it('ensures required asterix appears', () => {
        directiveEl = fixture.debugElement.query(By.css('span'));
        expect(directiveEl).toBeTruthy();
    });

});
