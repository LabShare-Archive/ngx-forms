
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbTypeaheadHttp } from './typeahead-http.component';

describe('SidemenuComponent', () => {
    let component: NgbTypeaheadHttp;
    let fixture: ComponentFixture<NgbTypeaheadHttp>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgbTypeaheadHttp]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgbTypeaheadHttp);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});