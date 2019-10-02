import { Component, ViewChild } from '@angular/core';
import { DynamicFormDirective } from 'projects/ngx-forms/src/lib/dynamic-form/dynamic-form.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent {
	@ViewChild('form', { static: false }) public formReference: DynamicFormDirective;
	@ViewChild('form2', { static: false }) public formReference2: DynamicFormDirective;
	public output = {};

	public exampleConfig = {
		"fields": [
			{
				"type": "text",
				"label": "Title",
				"name": "title"
			},
			{
				"type": "text",
				"label": "Project Name",
				"name": "projectName",
				"placeholder": "Enter project name",
				"minLength": 2,
				"maxLength": 5
			}
		]
	};

	public config = {
		fields: [
			{ type: 'json', label: 'Config', name: 'json' },
		]
	};
	public config2 = this.exampleConfig;

	public model = { json: this.exampleConfig }

	ngAfterViewInit() {
		this.formReference.changes.subscribe(val => {
			this.config2 = val.json;
		})

		this.formReference2.changes.subscribe(val => {
			this.output = val;
		})
	}


}
