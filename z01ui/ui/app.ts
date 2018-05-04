'use strict';

import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTimepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders, Injectable, Inject } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { TagInputModule } from "ngx-chips";
import { QuillModule } from "ngx-quill";
import { LsAngularCoreModule } from "angular-core";
import { Components } from "./states";
import { States } from "./states";
import "../node_modules/quill/dist/quill.snow.css";
import "../node_modules/quill/dist/quill";

import { NgbTypeahead } from "./app/typeahead/typeahead.component";
import { NgbTypeaheadHttp } from "./app/typeahead-http/typeahead-http.component";
import { TagsInput } from "./app/tags-input/tags-input.component";

import { FilterPipe } from "./shared/project-filter";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProgressBarComponent } from "./app/progress-bar/progress-bar.component";
import { TimelineComponent } from "./app/timeline/timeline.component";
import { SliderComponent } from "./app/slider/slider.component";
import { WidgetComponent } from "./app/widget/widget.component";
import { DetailsComponent } from "./app/details/project-details.component";

import { ProjectsService } from "./services/projects.service";
import { TasksService } from "./services/tasks.service";
import { UsersService } from "./services/users.service";
import { PreferenceService } from "./services/preferences.service";
import { SessionService } from "./services/session.service";
import { MilestonesService } from "./services/milestones.service";
import { GroupsService } from "./services/groups.service";
import { NgUploaderModule } from 'ngx-uploader';

import './scss/custom.scss';

@NgModule({
    declarations: [
        FilterPipe,
        NgbTypeahead,
        NgbTypeaheadHttp,
        TagsInput,
        Components,
        ProgressBarComponent,
        TimelineComponent,
        SliderComponent,
        WidgetComponent,
        DetailsComponent
    ],
    entryComponents: [],
    exports: [],
    imports: [
        BrowserAnimationsModule,
        TagInputModule,
        QuillModule,
        HttpModule,
        JsonpModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UIRouterModule.forChild({
            states: States
        }),
        NgbModule.forRoot(),
        LsAngularCoreModule,
        NgbTimepickerModule,
        NgbDropdownModule,
        NgUploaderModule
    ],
    providers: [
        PreferenceService,
        ProjectsService,
        TasksService,
        UsersService,
        SessionService,
        MilestonesService,
        GroupsService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProjectZ01Module {
}