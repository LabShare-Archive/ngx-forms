import { ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { IFieldConfig } from '../../models/field-config.interface';
import { DynamicFieldService } from '../../services/dynamic-field.service';
import { PreloadService } from '../../services/preload.service';

@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {

    @Input() field: IFieldConfig;
    @Input() group: FormGroup;
    @Input() model: any;
    component: ComponentRef<Field>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        private dynamicFieldService: DynamicFieldService,
        private preloadService: PreloadService
    ) { }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.field = this.field;
            this.component.instance.group = this.group;
            this.component.instance.model = this.model;
        }
    }

    ngOnInit() {
        const componentReference = this.dynamicFieldService.getField(this.field.type);
        const component = this.resolver.resolveComponentFactory<Field>(componentReference);
        this.component = this.container.createComponent(component);
        this.component.instance.field = this.field;
        this.component.instance.group = this.group;
        this.component.instance.model = this.model;
    }

}
