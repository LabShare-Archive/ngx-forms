import { FormNavService } from './form-nav.service';
import { FormControl, Validators } from '@angular/forms';

describe('Service: FormNavService', () => {
    let service: FormNavService;
    let group = { hidden: false };

    beforeEach(() => {
        service = new FormNavService();
    });

    describe('add()', () => {
        it('should subscribe to control changes', () => {
            const control = new FormControl('', Validators.required);
            const group: any = { controls: [control], hidden: false };
            service.add(group);

            control.setValue('test');
            expect(group.valid).toBeTruthy();

            control.setValue('');
            expect(group.valid).toBeFalsy();
        });
    });

    it('should return array with one group', () => {
        service.add(group);
        expect(service.getAllGroups()).toEqual([group]);
    });

    it('should return array with several groups. All but first should be set to hidden', () => {
        service.add({ hidden: false });
        service.add({ hidden: false });
        service.add({ hidden: false });
        expect(service.getAllGroups()).toEqual([{ hidden: false }, { hidden: true }, { hidden: true }]);
    });

    describe('reset()', () => {
        it('should reset all groups to visible and set counter to 0', () => {
            let gr = [{ hidden: false }, { hidden: false }, { hidden: false }];
            service.add(gr[0]);
            service.add(gr[1]);
            service.add(gr[2]);
            service.reset();
            expect(gr).toEqual([{ hidden: false }, { hidden: false }, { hidden: false }]);
            expect(service.selected).toEqual(0);
        });
    });

    describe('select()', () => {
        it('select last group and set it to visible, others should be hidden', () => {
            let gr = [{ hidden: false }, { hidden: false }, { hidden: false }];
            service.add(gr[0]);
            service.add(gr[1]);
            service.add(gr[2]);
            service.select(2);
            expect(gr).toEqual([{ hidden: true }, { hidden: true }, { hidden: false }]);
            expect(service.selected).toEqual(2);
        });
    });

});