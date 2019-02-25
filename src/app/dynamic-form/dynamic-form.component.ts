import { Input, OnInit, ComponentFactoryResolver, ViewContainerRef, Directive, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig, LayoutDictionary, LAYOUTS_TOKEN, Layout, Type } from '../../types';

@Directive({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form'
})
export class DynamicFormDirective implements OnInit {
    @Input() formConfig: FormConfig;
    @Input() model: any;
    @Input() lookups: { [key: string]: Type<any>; };

    public group: FormGroup;
    get changes() { return this.group.valueChanges; }
    get valid() { return this.group.valid; }
    get value() { return this.group.value; }
    get rawValue() { return this.group.getRawValue(); }

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        @Inject(LAYOUTS_TOKEN) private layouts: LayoutDictionary) {
        this.group = new FormGroup({});
    }

    public ngOnInit(): void {
        console.log('forms');

        if (!this.layouts[this.formConfig.layout]) { throw new Error(`Layout with name "${this.formConfig.layout}" was not found`); }

        const componentReference = this.layouts[this.formConfig.layout];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory<Layout>(componentReference);
        const component = this.container.createComponent(componentFactory);
        component.instance.group = this.group;
        component.instance.formConfig = this.formConfig;
        component.instance.model = this.model;
        component.instance.lookups = this.lookups;
    }

}
