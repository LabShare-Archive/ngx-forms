import { Component, Input, OnInit, ComponentFactoryResolver, ViewContainerRef, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig} from '../../types';
import { GroupLayoutFormComponent } from '../group-layout/group-layout.component';

@Directive({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form'
})
export class DynamicFormComponent implements OnInit {
    @Input() formConfig: FormConfig;
    @Input() model: any;
    @Input() lookups: object;

    public form: FormGroup;
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }
    get rawValue() { return this.form.getRawValue(); }

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private container: ViewContainerRef, ) {
        this.form = new FormGroup({});
    }

    public ngOnInit(): void {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GroupLayoutFormComponent);
        let component = this.container.createComponent(componentFactory);
        component.instance.form = this.form;
        component.instance.formConfig = this.formConfig;
        component.instance.model = this.model;
    }

}
