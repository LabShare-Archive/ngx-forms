import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextEditorComponent } from './form-text-editor.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { QuillModule } from "ngx-quill";

describe('FormTextEditorComponent', () => {
    let component: FormTextEditorComponent;
    let fixture: ComponentFixture<FormTextEditorComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

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
        component.field = { "type": "editor", "label": "Explain", "name": "testName", "required": true };
        component.group = formBuilder.group({testName: ['']});
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
