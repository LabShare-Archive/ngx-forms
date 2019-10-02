import { Component, ViewChild } from '@angular/core';
import { DynamicFormDirective } from 'projects/ngx-forms/src/lib/dynamic-form/dynamic-form.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent {
	@ViewChild('form', { static: false }) public formReference: DynamicFormDirective;

	public data = { title: "Test" };
	public config = {
		fields: [
			{ type: "text", label: "Title", name: "title" },
			{ type: "text", label: "Project Name", name: "projectName", placeholder: "Enter project name", minLength: 2, maxLength: 5 },
			{ type: "select", label: "Type", name: "select", options: ["one", "two", "three"] }
		]
	};

	ngAfterViewInit() {
		this.formReference.changes.subscribe(val => {
			console.log('from observable', val)
		});
	}

}
