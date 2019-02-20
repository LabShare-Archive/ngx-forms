import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDateComponent as Type} from './form-date.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('FormInputComponent', () => {
    let component: Type;
    let fixture: ComponentFixture<Type>;
    let directiveEl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NgbModule
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

                fixture.detectChanges();
            });
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('ensures component is rendered', () => {
        directiveEl = fixture.debugElement.query(By.css('ngb-datepicker-navigation'));
        expect(directiveEl.nativeElement).toBeDefined();
    });

});
