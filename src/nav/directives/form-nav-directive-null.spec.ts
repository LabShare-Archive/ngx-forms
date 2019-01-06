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
    let temp;

    beforeAll(() => {
        var mdl = require("../services/form-nav.service");
        temp = mdl.FormNavService;
    })

    afterAll(() => {
        var mdl = require("../services/form-nav.service");
        mdl.FormNavService = temp;
    })

    afterEach(() => {
        var mdl = require("../services/form-nav.service");
        mdl.FormNavService = temp;
    });

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

    
    it('should create instance', () => {
        var form_nav_service_1 = require("../services/form-nav.service");
        form_nav_service_1.FormNavService = undefined;
        console.log(typeof form_nav_service_1.FormNavService);
        expect(new NavDirective({} as FormNavService)).not.toBeNull();

    });

    it('should create instance', () => {
        var form_nav_service_1 = require("../services/form-nav.service");
        form_nav_service_1.FormNavService = '';
        console.log(typeof form_nav_service_1.FormNavService);
        expect(new NavDirective({} as FormNavService)).not.toBeNull();
        // form_nav_service_1.FormNavService = temp;
    });

    it('should create instance', () => {
        var form_nav_service_1 = require("../services/form-nav.service");
        form_nav_service_1.FormNavService = {};
        console.log(typeof form_nav_service_1.FormNavService);
        expect(new NavDirective({} as FormNavService)).not.toBeNull();
    });


});
