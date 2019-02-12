import { ComponentRef, Directive, Input, OnInit, ViewContainerRef, ComponentFactoryResolver, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Field, FieldDictionary, FIELD_DICT_TOKEN, FieldConfig } from '../../types';

@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnInit, OnDestroy {
    @Input() field: FieldConfig;
    @Input() group: FormGroup;
    @Input() model: any;
    component: ComponentRef<any>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        private fb: FormBuilder,
        @Inject(FIELD_DICT_TOKEN) private inputs: FieldDictionary
    ) { }

    ngOnInit() {
        if (!this.group) { throw new Error('group is not set'); }
        if (!this.inputs[this.field.type]) { throw new Error(`Input with type "${this.field.type}" was not found`); }

        const componentReference = this.inputs[this.field.type];
        const component = this.resolver.resolveComponentFactory<Field>(componentReference);
        this.component = this.container.createComponent(component);
        this.component.instance.field = this.field;
        this.component.instance.group = this.group;
        this.component.instance.model = this.model;
        this.group.addControl(this.field.name, this.createControl(this.field));

        if (this.model && this.model[this.field.name]) {
            this.group.get(this.field.name).patchValue(this.model[this.field.name]);
        }
    }

    public createControl(cfg: FieldConfig): FormControl {
        const { disabled, required, minLength, maxLength, email, min, max, pattern, value } = cfg;
        const validators = [];
        if (required !== undefined && required) { validators.push(Validators.required); }
        if (minLength !== undefined) { validators.push(Validators.minLength(minLength)); }
        if (maxLength !== undefined) { validators.push(Validators.maxLength(maxLength)); }
        if (email !== undefined) { validators.push(Validators.email); }
        if (min !== undefined) { validators.push(Validators.min(min)); }
        if (max !== undefined) { validators.push(Validators.max(max)); }
        if (pattern !== undefined) { validators.push(Validators.pattern(pattern)); }

        return this.fb.control({ disabled, value }, validators);
    }

    ngOnDestroy(): void {
        if (this.component) {
            this.component.destroy();
        }
    }

}
