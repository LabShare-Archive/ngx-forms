import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('FormRadioComponent', () => {
    let component: RadioComponent;
    let fixture: ComponentFixture<RadioComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [RadioComponent],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioComponent);
        component = fixture.componentInstance;
        component.group = formBuilder.group({});
        component.field = { "type": "text", "label": "Explain", "name": "testName", "required": true };

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
