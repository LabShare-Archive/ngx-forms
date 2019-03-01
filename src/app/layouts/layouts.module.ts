import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDictionary } from '../../types';
import { GroupComponent } from './groups/group.component';
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
        BasicLayoutComponent
    ],
    entryComponents: [
        GroupComponent,
        BasicLayoutComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FormLayoutsModule { }
