import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: true
})

export class FilterPipe implements PipeTransform {

    transform(items: Object[], query: string): Object[] {
        if (!items || !query) {
            return items;
        }

        return items.filter(item => {
            for (let i = 0, keys = Object.keys(item), k = keys.length; i < k; i++) {
                if (item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(query) != -1) return true;
            }
            return false;
        });

    }
}