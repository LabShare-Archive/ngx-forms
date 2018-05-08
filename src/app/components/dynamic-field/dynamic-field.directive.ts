import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormTextEditorComponent } from '../form-text-editor/form-text-editor.component';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormTextareaComponent } from '../form-textarea/form-textarea.component';
import { FormInputHidden } from '../form-hidden/form-hidden.component';

const components: { [type: string]: Type<Field> } = {
    text: FormInputComponent,
    select: FormSelectComponent,
    editor: FormTextEditorComponent,
    textarea: FormTextareaComponent,
    hidden: FormInputHidden
};

@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
    @Input()
    config: FieldConfig;

    @Input()
    group: FormGroup;

    component: ComponentRef<Field>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }

    ngOnInit() {
        if (!components[this.config.type]) {
            const supportedTypes = Object.keys(components).join(', ');
            throw new Error(
                `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
            );
        }
        const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }
}
