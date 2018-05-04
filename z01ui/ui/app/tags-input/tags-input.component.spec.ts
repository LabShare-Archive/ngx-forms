
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsInput } from './tags-input.component';

describe('TagsInput', () => {
    let component: TagsInput;
    let fixture: ComponentFixture<TagsInput>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TagsInput]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TagsInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});