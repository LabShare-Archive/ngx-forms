import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbTypeahead } from './typeahead.component';


describe('SidemenuComponent', () => {
    let component: NgbTypeahead;
    let fixture: ComponentFixture<NgbTypeahead>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgbTypeahead],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgbTypeahead);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});