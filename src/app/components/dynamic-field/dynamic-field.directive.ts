import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormTextEditorComponent } from '../form-text-editor/form-text-editor.component';
import { FormCheckboxComponent } from "../form-checkbox/form-checkbox.component";
import { FormRadioComponent} from "../form-radio/form-radio.component";
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormTextareaComponent } from '../form-textarea/form-textarea.component';
import { FormInputHidden } from '../form-hidden/form-hidden.component';
import { FormUserComponent } from '../form-user/form-user.component';
import { DynamicFieldService } from "../../services/dynamic-field.service"

const components: { [type: string]: Type<Field> } = {
  text: FormInputComponent,
  select: FormSelectComponent,
  editor: FormTextEditorComponent,
  textarea: FormTextareaComponent,
  hidden: FormInputHidden,
  user: FormUserComponent,
  radio: FormRadioComponent,
  checkbox: FormCheckboxComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  field: FieldConfig;

  @Input()
  group: FormGroup;


  @Input()
  fields: [FieldConfig];

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private dynamicFieldService: DynamicFieldService
  ) { }

  /**
   * @description
   * 1, check if the field is custom field
   * 2, check if type is pre-defined field, if not throw errors
   */
  loadComponent() {
    if (this.field.custom) {

      try {
        let customComponent = this.dynamicFieldService.getCustomComponent(this.field.type);
        this.component= this.dynamicFieldService.addDynamicComponent(customComponent);
        this.component.instance.field = this.field;
        this.component.instance.group = this.group;
        this.component.instance.fields = this.fields;
      } catch (e) {
        throw new Error(`Can't build custom component field "${this.field.type}"`)
      }

    } else if (!components[this.field.type]) {

      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.field.type}).Supported types: ${supportedTypes}`
      );

    } else {

      this.component = this.dynamicFieldService.addDynamicComponent(components[this.field.type]);
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
      this.component.instance.fields = this.fields;

    }
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
      this.component.instance.fields = this.fields;
    }
  }


  ngOnInit() {
    this.dynamicFieldService.setRootViewContainerRef(this.container);
    this.loadComponent();
  }
}
