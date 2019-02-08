import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, ILookup, FormConfig, PanelGroup, ConditionType } from '../../types';
import { AdDirective } from '../dir';
import { GroupLayoutFormComponent } from '../group-layout/group-layout.component';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styles: [require('./dynamic-form.component.scss').toString()]
})
export class DynamicFormComponent implements OnInit {
    @Input() formConfig: FormConfig;
    @Input() model: any;
    @Input() lookups: object;
    @ViewChild(AdDirective) adHost: AdDirective;

    public form: FormGroup;
    // get changes() { return this.form.valueChanges; }
    // get valid() { return this.form.valid; }
    // get value() { return this.form.value; }
    // get rawValue() { return this.form.getRawValue(); }

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private container: ViewContainerRef, ) {
        this.form = new FormGroup({});
    }

    public ngOnInit(): void {
        console.log('loading layout:', this.formConfig.layout);

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GroupLayoutFormComponent);
        // let viewContainerRef = this.adHost.viewContainerRef;
        let component = this.container.createComponent(componentFactory);
        component.instance.form = this.form;
        component.instance.formConfig = this.formConfig;
        component.instance.model = this.model;


        // (<AdComponent>componentRef.instance).data = adItem.data;
    }

}
