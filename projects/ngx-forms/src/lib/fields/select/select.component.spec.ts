import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSelectComponent as Type} from './select.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('FormSelectComponent', () => {
    let component: Type;
    let fixture: ComponentFixture<Type>;
    let directiveEl;
    let value = "c";

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

                component.field = { type: "select", name: "test", required: true, options: ['a', 'b', 'c'] };
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
        directiveEl = fixture.debugElement.queryAll(By.css('option'));
        expect(directiveEl.length).toEqual(component.field.options.length);
    });

});
