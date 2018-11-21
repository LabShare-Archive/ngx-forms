import { Injectable, ElementRef } from "@angular/core";

@Injectable()
export class FormNavService {    
    private components: ElementRef[] = [];
    private displayStyle = 'block';
    public selected = 0;
    public total = 0;

    add(component): void {
        this.components.push(component);
        this.total++;
        if (this.components.length > 1)
            component.nativeElement.style.display = 'none';
    }

    select(index: any): void {
        this.components.forEach((comp) => {
            comp.nativeElement.style.display = 'none';
        });
        this.components[index].nativeElement.style.display = this.displayStyle;
        this.selected = index;
    }

    reset() {
        this.components = [];
        this.total = 0;
    }

}
