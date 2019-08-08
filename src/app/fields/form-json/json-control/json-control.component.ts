import { ElementRef, Component, ViewChild, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: JsonControlValueAccessorComponent
        }
    ],
    selector: 'json-control',
    template: '<textarea class="form-control" rows="3" #textarea (input)="onChange($event.target.value)"></textarea>'
})
export class JsonControlValueAccessorComponent implements ControlValueAccessor {
    public disabled = false;
    public valid = true;

    @ViewChild('textarea') textarea: ElementRef;
    @Input() required = false;
    onModelChange = (model: any) => { };
    onModelTouched = (model: any) => { };

    writeValue(value: any) {
        if (value) {
            this.textarea.nativeElement.value = JSON.stringify(value);
        }
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.textarea.nativeElement.disabled = disabled;
        this.disabled = disabled;
    }

    onChange(value): void {
        try {
            const json = JSON.parse(value);
            this.valid = true;
            this.onModelChange(json);
        } catch (e) {
            this.valid = false;
        }

    }

    validate() {
        const err: { required?: boolean } = {};
        let valid = true;

        if (!this.valid || this.required && !this.textarea.nativeElement.value) {
            err.required = true;
            valid = false;
        }

        return valid ? null : err;
    }

}
