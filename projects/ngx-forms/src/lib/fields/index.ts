import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { MultiCheckboxComponent } from './multicheckbox/multicheckbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { InputHiddenComponent } from './hidden/hidden.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { JsonComponent } from './json/json.component';
import { LabelComponent } from './label/label.component';
import { FieldDictionary } from '../common/types';

export const DefaultFields: FieldDictionary = {
	text: InputComponent,
	select: SelectComponent,
	multicheckbox: MultiCheckboxComponent,
	textarea: TextareaComponent,
	hidden: InputHiddenComponent,
	radio: RadioComponent,
	checkbox: CheckboxComponent,
	label: LabelComponent,
	json: JsonComponent
};

export const FieldComponents = [
	InputComponent,
	SelectComponent,
	MultiCheckboxComponent,
	TextareaComponent,
	InputHiddenComponent,
	RadioComponent,
	CheckboxComponent,
	LabelComponent,
	JsonComponent
];