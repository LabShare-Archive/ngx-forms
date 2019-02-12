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

    public form: FormGroup;
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }
    get rawValue() { return this.form.getRawValue(); }

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        @Inject(LAYOUTS_TOKEN) private layouts: LayoutDictionary) {
        this.form = new FormGroup({});
    }

    public ngOnInit(): void {
        // set default layout "default"
        if (!this.layouts[this.formConfig.layout]) { throw new Error(`Layout with name "${this.formConfig.layout}" was not found`); }

        const componentReference = this.layouts[this.formConfig.layout];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory<Layout>(componentReference);
        const component = this.container.createComponent(componentFactory);
        component.instance.form = this.form;
        component.instance.formConfig = this.formConfig;
        component.instance.model = this.model;
    }

}
