import { Component } from '@angular/core';
import { BaseLayout } from '../base-layout';

@Component({
    selector: 'layout-basic',
    template: require('./basic-layout.component.html')
})
export class BasicLayoutComponent extends BaseLayout { }
