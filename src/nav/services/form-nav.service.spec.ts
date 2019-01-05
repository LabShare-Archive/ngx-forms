import { FormNavService } from './form-nav.service';
import { FormControl, Validators } from '@angular/forms';

describe('Service: FormNavService', () => {
    let service: FormNavService;
    let group = { hidden: false };

    beforeEach(() => {
        service = new FormNavService();
    });

    it('should return array with one group', () => {
        expect(service).toBeDefined();
    });


});