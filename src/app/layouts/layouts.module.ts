import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDictionary } from '../../types';
import { GroupComponent } from './groups/group/group.component';
import { PanelComponent } from './groups/panel/panel.component';
import { DynamicFieldModule } from '../dynamic-field/dynamic-field.module';
import { BasicLayoutComponent } from './basic/basic-layout.component';

export const defaultLayouts: LayoutDictionary = {
    groups: GroupComponent,
    basic: BasicLayoutComponent
};

@NgModule({
    imports: [
        CommonModule,
        DynamicFieldModule
    ],
    declarations: [
        GroupComponent,
        PanelComponent,
        BasicLayoutComponent
    ],
    entryComponents: [
        GroupComponent,
        PanelComponent,
        BasicLayoutComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FormLayoutsModule { }
