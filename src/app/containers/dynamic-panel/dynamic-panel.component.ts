import { Component, Input } from '@angular/core';

@Component({
    selector: 'dynamic-panel',
    template: require('./dynamic-panel.component.html'),
    styles: [require('./dynamic-panel.component.scss').toString()]
})

export class DynamicPanelComponent {
    @Input() public panelConfig;
    @Input() public group;
    @Input() public model: any;
}
