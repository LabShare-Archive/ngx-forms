import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class DatePickerAdapter extends NgbDateAdapter<Date> {

    fromModel(date: Date | string): NgbDateStruct {

        if (typeof date === 'string') { date = new Date(date); }
        return date ? {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        } : null;
    }

    toModel(date: NgbDateStruct): Date {
        console.log('to model');
        return date ? new Date(date.year, date.month - 1, date.day) : null;
    }

}
