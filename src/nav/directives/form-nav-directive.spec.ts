import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavDirective } from "./form-nav.directive";
import { By } from '@angular/platform-browser';
import { FormNavService } from '../services/form-nav.service';

@Component({
    template: `<div [navTab]="panel" ></div>`
})
class TestComponent {
    panel: any
}

describe('NavDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveEl;
    let formNavService: FormNavService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavDirective, TestComponent],
            imports: [FormsModule, ReactiveFormsModule],
            providers: [FormNavService]
        });

        fixture = TestBed.createComponent(TestComponent);
        formNavService = TestBed.get(FormNavService);
        component = fixture.componentInstance;
        component.panel = { title: 'test' };
    });

    it('loads directive and form-input component', () => {
        directiveEl = fixture.debugElement.query(By.directive(NavDirective));
        expect(directiveEl).not.toBeNull();
    });

    it('should create instance without injection', () => {
        let cccc = new NavDirective(undefined);
        expect(cccc).not.toBeNull();
    });

    it('should create instance', () => {
        let service = new FormNavService();
        let cccc = new NavDirective(service);
        expect(cccc).not.toBeNull();
    });

    it('should create instance', () => {
        let service = {} as FormNavService;
        let cccc = new NavDirective(service);
        expect(cccc).not.toBeNull();
    });

    it('should call service.reset', () => {
        spyOn(formNavService, 'add');
        fixture.detectChanges();
        expect(formNavService.add).toHaveBeenCalled();
    });

    it('should not call service.reset', () => {
        spyOn(formNavService, 'add');
        component.panel = { static: true, title: 'test' };
        fixture.detectChanges();
        expect(formNavService.add).not.toHaveBeenCalled();
    });

});
