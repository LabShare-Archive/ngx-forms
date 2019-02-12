import { Input, OnInit, ComponentFactoryResolver, ViewContainerRef, Directive, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig, LayoutDictionary, LAYOUTS_TOKEN, Layout } from '../../types';

@Directive({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form'
})
export class DynamicFormDirective implements OnInit {
    @Input() formConfig: FormConfig;
    @Input() model: any;
    @Input() lookups: object;

    public formGroup: FormGroup;
    get changes() { return this.formGroup.valueChanges; }
    get valid() { return this.formGroup.valid; }
    get value() { return this.formGroup.value; }
    get rawValue() { return this.formGroup.getRawValue(); }

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        @Inject(LAYOUTS_TOKEN) private layouts: LayoutDictionary) {
        this.formGroup = new FormGroup({});
    }

    public ngOnInit(): void {
        // set default layout "default"
        if (!this.layouts[this.formConfig.layout]) { throw new Error(`Layout with name "${this.formConfig.layout}" was not found`); }

        const componentReference = this.layouts[this.formConfig.layout];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory<Layout>(componentReference);
        const component = this.container.createComponent(componentFactory);
        component.instance.formGroup = this.formGroup;
        component.instance.formConfig = this.formConfig;
        component.instance.model = this.model;
    }

}
