import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent as Type} from './checkbox.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('FormCheckboxComponent', () => {
    let component: Type;
    let fixture: ComponentFixture<Type>;
    let directiveEl;
    let value = true;

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
        let inputs = fixture.debugElement.queryAll(By.css('input'));
        expect(inputs.length).toBeGreaterThan(0);
    });

});
