import { JsonControlValueAccessorComponent } from './json-control.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('MulticheckboxControlComponent', () => {
    let component: JsonControlValueAccessorComponent;
    let fixture: ComponentFixture<JsonControlValueAccessorComponent>;

    const model = { test: 1 };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
            ],
            declarations: [JsonControlValueAccessorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JsonControlValueAccessorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should not throw error', () => {
        expect(() => { component.onModelTouched(123); }).not.toThrowError();
    });

    describe('writeValue()', () => {
        it('should set value', () => {
            component.writeValue(model);
            expect(component.textarea.nativeElement.value).toEqual(JSON.stringify(model));
        });

        it('should not set value', () => {
            const val = component.textarea.nativeElement.value;
            component.writeValue(null);
            expect(component.textarea.nativeElement.value).toEqual(val);
        });
    });

    describe('registerOnChange()', () => {
        it('should register onChange', () => {
            const foo = { log: (val) => { } };
            spyOn(foo, 'log');
            const x = (val) => foo.log(val);
            component.registerOnChange(x);
            component.onModelChange(123);
            expect(foo.log).toHaveBeenCalled();
        });
    });

    describe('registerOnTouched()', () => {
        it('should register onTouch', () => {
            const foo = { log: (val) => { } }; spyOn(foo, 'log');
            const x = (val) => foo.log(val);
            component.registerOnTouched(x);
            component.onModelTouched(123);
            expect(foo.log).toHaveBeenCalled();
        });
    });

    describe('setDisabledState()', () => {
        it('should set disalbed', () => {
            component.setDisabledState(true);
            expect(component.textarea.nativeElement.disabled).toBeTruthy();
        });

        it('should set enabled', () => {
            component.setDisabledState(false);
            expect(component.textarea.nativeElement.disabled).toBeFalsy();
        });
    });

    describe('validate()', () => {
        it('should call validate', () => {
            expect(component.validate()).toBeDefined();
        });

        it('should return errors', () => {
            component.required = true;
            component.writeValue(null);
            const res = component.validate();
            expect(res.required).toBeTruthy();
        });

        it('should not return errors when component is not required', () => {
            component.required = false;
            const mdl = [];
            component.writeValue(mdl);
            const res = component.validate();
            expect(res).toBeFalsy();
        });

        it('should not return required error', () => {
            const mdl = ['one'];

            component.writeValue(mdl);
            const res = component.validate();
            expect(res).toBeFalsy();
        });
    });

    describe('onChange()', () => {
        it('should update value', () => {
            spyOn(component, 'onModelChange');
            component.onChange('{}');
            expect(component.valid).toBeTruthy();
            expect(component.onModelChange).toHaveBeenCalledWith({});
        });

        it('should not update value when input is invalid', () => {
            spyOn(component, 'onModelChange');
            component.onChange('{1111}');
            expect(component.valid).toBeFalsy();
            expect(component.onModelChange).not.toHaveBeenCalled();
        });
    });

});
