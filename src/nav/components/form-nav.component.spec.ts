import { FormNavComponent } from './form-nav.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { APP_BASE_HREF } from '@angular/common';
import { FormNavService } from '../services/form-nav.service';
import { FormNavModule } from '../nav-app';
import { By } from "@angular/platform-browser";

describe('FormNavComponent', () => {
    let component: FormNavComponent;
    let fixture: ComponentFixture<FormNavComponent>;
    let formNavService: FormNavService;
    let groups = [{
        hidden: false, label: 'test1', fields: [
            { name: 'a', type: 'text' },
            { name: 'b', type: 'text' }
        ]
    }, { hidden: false, label: 'test2' }, { hidden: false, label: 'test3' }];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                FormNavModule
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        const fb = new FormBuilder();
        fixture = TestBed.createComponent(FormNavComponent);
        component = fixture.componentInstance;
        formNavService = TestBed.get(FormNavService);
        component.form = fb.group({
            a: [''],
            b: ['']
        });
        groups.forEach(g => formNavService.add(g));

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should render number of links equal to number of groups', () => {
        let links = fixture.debugElement.queryAll(By.css('a'));
        expect(links.length).toEqual(groups.length);
    });

    it('should call service.reset', () => {
        spyOn(formNavService, 'reset');
        fixture.destroy();
        expect(formNavService.reset).toHaveBeenCalled();
    });

    describe('select()', () => {
        it('should select an item', () => {
            component.select(1);
            expect(component.getSelected()).toEqual(1);
        });
    });

    describe('next()', () => {
        it('should select next item', () => {
            component.next();
            expect(component.getSelected()).toEqual(1);
        });
    });

    describe('prev()', () => {
        it('should select next item', () => {
            component.select(2);
            component.prev();
            expect(component.getSelected()).toEqual(1);
        });
    });

    describe('subscription()', () => {
        it('should run check', () => {
            component.form.controls.a.setValue('test')
            expect(component.ref.groups[0].valid).toBeTruthy();
        });
    });

});