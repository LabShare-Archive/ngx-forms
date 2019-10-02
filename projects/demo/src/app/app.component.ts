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
			{ type: "hidden", label: "hidden", name: "hidden", value: "hidden" },
			{ type: "label", label: "label", name: "label", value: "value" },
			{ type: "text", label: "text", name: "title" },
			{ type: "textarea", label: "textarea", name: "textarea" },
			{ type: "json", label: "json", name: "json" },
			{ type: "select", label: "select", name: "select", options: ["one", "two", "three"] },
			{ type: "checkbox", label: "checkbox", name: "checkbox" },
			{ type: "radio", label: "radio", name: "radio", options: ["one", "two", "three"] },
			{ type: "multicheckbox", label: "multicheckbox", name: "multicheckbox", options: ["one", "two", "three"] }
		]
	};

	ngAfterViewInit() {
		this.formReference.changes.subscribe(val => {
			console.log('from observable', val)
		});
	}

}
