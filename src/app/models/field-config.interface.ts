export interface FieldConfig {
	disabled?: boolean,
	label?: string,
	name: string,
	options?: string[],
	settings?: any,
	placeholder?: string,
	type: string,
	value?: any,
	required?: boolean,
	minLength? : number,
	maxLength? : number,
	email? : boolean,
	min?: number,
	max?: number,
	pattern?: RegExp
	nullValidator?: any,
	provider?: string,
	providerMethod?: string
}