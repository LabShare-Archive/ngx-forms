import { ComponentRef, Directive, Input, OnInit, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { IFieldConfig } from '../../models/field-config.interface';
import { DynamicFieldService } from '../../services/dynamic-field.service';
import { PreloadService } from '../../services/preload.service';

@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnInit, OnDestroy {
    @Input() field: IFieldConfig;
    @Input() group: FormGroup;
    @Input() model: any;
    component: ComponentRef<any>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        private dynamicFieldService: DynamicFieldService,
        private preloadService: PreloadService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        const componentReference = this.dynamicFieldService.getField(this.field.type);
        const component = this.resolver.resolveComponentFactory<Field>(componentReference);
        this.component = this.container.createComponent(component);
        this.component.instance.field = this.field;
        this.component.instance.group = this.group;

        this.group.addControl(this.field.name, this.createControl(this.field));

        if (this.model && this.model[this.field.name]) {
            this.group.get(this.field.name).patchValue(this.model[this.field.name]);
        }
    }

    public createControl(cfg: IFieldConfig): FormControl {
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
