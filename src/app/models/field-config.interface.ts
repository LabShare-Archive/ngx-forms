import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
	disabled?: boolean,
	label?: string,
	name: string,
	options?: string[],
	placeholder?: string,
	type: string,
	// validation?: ValidatorFn[],
	value?: any,
	required?: boolean,
	minLength? : number,
	maxLength? : number,
	email? : boolean,
	min?: number,
	max?: number,
	pattern?: RegExp
	nullValidator?: any
}