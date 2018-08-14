import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextareaComponent } from "./form-textarea.component";
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import  * as _  from 'lodash';

describe('FormTextareaComponent', () => {
  let component: FormTextareaComponent;
  let fixture: ComponentFixture<FormTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FormTextareaComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextareaComponent);
    component = fixture.componentInstance;
    component.field = { "type": "textarea", "label": "Explain", "name": "testName", "hidden": true, "required": true };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
