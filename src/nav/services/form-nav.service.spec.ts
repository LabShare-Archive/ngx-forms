import { FormNavService } from './form-nav.service';

describe('Service: FormNavService', () => {
    let service: FormNavService;
    let group = { hidden: false };

    beforeEach(() => {
        service = new FormNavService();
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

    it('should create arrays with  valid status', () => {
      let form = {
        controls:
          { abstract: { status: "INVALID"},
            activityType: { status: "VALID"},
            title: {status: "VALID"},
            auhtors: {status:"VALID"}
          }
      }
      let selectionArray = service.createStatusKeyArray(form);
      expect(selectionArray.includes('activityType')).toBeTruthy();
      expect(selectionArray.includes('abstract')).toBeFalsy();
    });

    it('should identify if an array is subset of another array', () => {
      let subset = ["a", "b", "c"];
      let superset = ["a", "b", "c", "d", "e"];
      let anotherSet = ["f", "g"];
      expect(service.isSubSet(subset, superset)).toBeTruthy();
      expect(service.isSubSet(anotherSet, superset)).toBeFalsy();
    });

});
