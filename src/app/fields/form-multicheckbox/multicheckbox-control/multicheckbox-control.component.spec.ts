import { MulticheckboxControlComponent } from './multicheckbox-control.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';

describe('MulticheckboxControlComponent', () => {
    let component: MulticheckboxControlComponent;
    let fixture: ComponentFixture<MulticheckboxControlComponent>;

    const model = ['one', 'three'];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
            ],
            declarations: [MulticheckboxControlComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MulticheckboxControlComponent);
        component = fixture.componentInstance;
        component.options = ['one', 'two', 'three'];
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
            expect(component.inputs.value).toEqual([true,false,true])
        });

        it('should not set value', () => {
            const val = component.localGroup.value;
            component.writeValue(null);
            expect(component.localGroup.value).toEqual(val);
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
            expect(component.localGroup.disabled).toBeTruthy();
        });

        it('should set enabled', () => {
            component.setDisabledState(false);
            expect(component.localGroup.enabled).toBeTruthy();
        });
    });

    describe('validate()', () => {
        it('should call validate', () => {
            expect(component.validate()).toBeDefined();
        });

        it('should return errors', () => {
            const mdl = []
            component.writeValue(mdl);
            const res = component.validate();
            expect(res.required).toBeTruthy();
        });

        it('should not return required error', () => {
            const mdl = ['one']

            component.writeValue(mdl);
            const res = component.validate();
            expect(res).toBeFalsy();
        });
    });

});
