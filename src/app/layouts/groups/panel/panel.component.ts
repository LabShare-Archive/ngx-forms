import { Component, Input } from '@angular/core';

@Component({
    selector: 'layout-group-panel',
    template: require('./panel.component.html'),
    styles: [require('./panel.component.scss').toString()]
})

export class PanelComponent {
    @Input() public panelConfig;
    @Input() public group;
    @Input() public model: any;

    ngOnInit(){
        console.log('im a panel', this.panelConfig)
    }
}
