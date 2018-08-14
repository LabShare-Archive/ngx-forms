import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextEditorComponent } from './form-text-editor.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { QuillModule } from "ngx-quill";
import  * as _  from 'lodash';

describe('FormTextEditorComponent', () => {
  let component: FormTextEditorComponent;
  let fixture: ComponentFixture<FormTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        QuillModule
      ],
      declarations: [FormTextEditorComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextEditorComponent);
    component = fixture.componentInstance;
    component.field = { "type": "editor", "label": "Explain", "name": "testName", "hidden": true, "required": true };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
