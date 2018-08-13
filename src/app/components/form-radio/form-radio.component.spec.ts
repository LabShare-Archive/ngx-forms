import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRadioComponent } from './form-radio.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import  * as _  from 'lodash';

describe('FormRadioComponent', () => {
  let component: FormRadioComponent;
  let fixture: ComponentFixture<FormRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FormRadioComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRadioComponent);
    component = fixture.componentInstance;
    component.field = { "type": "text", "label": "Explain", "name": "testName", "hidden": true, "required": true };
    component.fields = [{ "type": "radio", "label": "Radio button label", "name": "questions", "options": [{"value": "Yes", "ref": "checkId"}, {"value": "No"}]},
      { "type": "checkbox", "label":"Check box label", "name": "checkId", "hidden": true, "options": [{"value": "Value1"}, {"value": "Value2"}]}];

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
