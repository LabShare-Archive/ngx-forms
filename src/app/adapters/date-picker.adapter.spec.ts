import { DatePickerAdapter } from './date-picker.adapter';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

describe('DatePickerAdapter', () => {
    let adapter: DatePickerAdapter;

    beforeEach(() => {
        adapter = new DatePickerAdapter();
    });

    describe('fromModel()', () => {

        it('should convert date to ngb format', () => {
            const d = new Date('2/2/2018');
            const res = adapter.fromModel(d)
            expect(res.year).toEqual(2018)
        });

        it('should convert string date to ngb format', () => {
            const d = '2/2/2018';
            const res = adapter.fromModel(d)
            expect(res.year).toEqual(2018)
        });

        it('should return null when no date is passed', () => {
            const d = undefined;
            const res = adapter.fromModel(d)
            expect(res).toBeNull();
        });

    });

    describe('toModel()', () => {

        it('should convert date to ngb format', () => {
            const d: NgbDateStruct = { year: 2018, month: 2, day: 2 }
            const res = adapter.toModel(d);
            expect(res.getFullYear()).toEqual(2018)
        });

        it('should return null when no date is passed', () => {
            const d = undefined;
            const res = adapter.toModel(d)
            expect(res).toBeNull();
        });

    });

});
