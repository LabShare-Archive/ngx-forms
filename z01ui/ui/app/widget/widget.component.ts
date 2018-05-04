'use strict';

import { Component, Input } from '@angular/core';
import { PreferenceService } from '../../services/preferences.service';

@Component({
    selector: 'widget',
    template: require('./widget.component.html'),
    styles: [require('./widget.component.css').toString()]
})

export class WidgetComponent {
    @Input() name: string;

    hidden: boolean = false;
    usersPreferences: object;

    constructor(private preferenceService: PreferenceService) {
    }

    async ngOnInit() {
        this.hidden = await this.preferenceService.get(this.name);
    }

    toggle() {
        this.hidden = !this.hidden;
        this.preferenceService.set(this.name, this.hidden);
    }
} 