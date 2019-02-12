import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDictionary } from '../../types';
import { GroupComponent } from './groups/group/group.component';
import { FormNavModule} from './groups/nav/nav-app';
import { PanelComponent } from './groups/panel/panel.component';
import { DynamicFieldModule } from '../dynamic-field/dynamic-field.module';

export const defaultLayouts: LayoutDictionary = {
    groups: GroupComponent
};

@NgModule({
    imports: [
        CommonModule,
        FormNavModule,
        DynamicFieldModule
    ],
    declarations: [
        GroupComponent,
        PanelComponent
    ],
    exports: [
        GroupComponent,
        PanelComponent
    ],
    entryComponents: [
        GroupComponent,
        PanelComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FormLayoutsModule { }
