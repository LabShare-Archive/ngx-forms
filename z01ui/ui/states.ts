import { Transition } from "@uirouter/angular";
import { ProjectsService } from "./services/projects.service";
import { SessionService } from "./services/session.service";
import { GroupsService } from "./services/groups.service";

import { DetailsComponent } from "./app/details/project-details.component";
import { ProjectListComponent } from './app/project-list/project-list.component';
import { HeaderComponent } from "./app/header/header.component";
import { LeftMenuComponent } from "angular-core";
import { FormComponent } from "./app/form/project-form.component";
import { GroupsListComponent } from "./app/groups-list/groups-list.component";
import { GroupFormComponent } from "./app/groups-form/groups-form.component";

let data = require("./portal.json");

export const Components = [
    ProjectListComponent, DetailsComponent, FormComponent, HeaderComponent,
    GroupsListComponent, GroupFormComponent];

export const States = [
    {
        name: 'main',
        url: '/',
        parent: 'threeColumn',
        views: {
            "header@threeColumn": { component: HeaderComponent },
            "menu@threeColumn": { component: LeftMenuComponent },
        },
        resolve: [
            {
                token: 'items',
                resolveFn: () => data.menu
            },
            {
                token: 'currentUser',
                deps: [SessionService],
                resolveFn: (service: SessionService) => service.getCurrentUser()
            }
        ],
        redirectTo: 'projects'
    },
    {
        name: 'projects',
        url: 'projects/',
        parent: 'main',
        views: {
            "content-left@threeColumn": { component: ProjectListComponent },
        },
        resolve: [
            {
                token: 'projects',
                deps: [ProjectsService],
                resolveFn: (service: ProjectsService) => service.getAll()
            },
            {
                token: 'linkToState',
                resolveFn: () => 'details'
            }
        ]
    },
    {
        name: 'details',
        url: ':projectId',
        parent: 'projects',
        views: {
            "content-right@threeColumn": { component: DetailsComponent },
        },
        resolve: [
            {
                token: 'project',
                deps: [Transition, ProjectsService],
                resolveFn: (trans, svc) => svc.getById(trans.params().projectId)
            }
        ]
    },
    {
        name: 'add-project',
        url: 'projects/add/',
        parent: 'main',
        views: {
            "content-full@threeColumn": { component: FormComponent },
        },
        resolve: [
            {
                token: 'groups',
                deps: [GroupsService],
                resolveFn: (svc: GroupsService) => svc.getAll()
            }
        ]
    },
    {
        name: 'edit-project',
        url: 'projects/edit/:projectId',
        parent: 'main',
        views: {
            "content-full@threeColumn": { component: FormComponent },
        },
        resolve: [
            {
                token: 'project',
                deps: [Transition, ProjectsService],
                resolveFn: (trans, svc) => svc.getById(trans.params().projectId)
            },
            {
                token: 'groups',
                deps: [GroupsService],
                resolveFn: (svc: GroupsService) => svc.getAll()
            }
        ]
    },
    {
        name: 'groups',
        url: 'groups/',
        parent: 'main',
        views: {
            "content-left@threeColumn": { component: GroupsListComponent },
        },
        resolve: [
            {
                token: 'groups',
                deps: [GroupsService],
                resolveFn: (svc: GroupsService) => svc.getAll()
            }
        ]
    },
    {
        name: 'edit-group',
        url: 'groups/edit/:groupId',
        parent: 'main',
        views: {
            "content-right@threeColumn": { component: GroupFormComponent },
        },
        resolve: [
            {
                token: 'group',
                deps: [Transition, GroupsService],
                resolveFn: (trans, svc: GroupsService) => svc.getOne(trans.params().groupId)
            }
        ]
    },
    {
        name: 'add-group',
        url: 'groups/add',
        parent: 'main',
        views: {
            "content-right@threeColumn": { component: GroupFormComponent },
        }
    },
    {
        name: 'subdetails',
        url: ':projectId',
        parent: 'subscriptions',
        views: {
            "content-right@threeColumn": { component: DetailsComponent },
        },
        resolve: [
            {
                token: 'project',
                deps: [Transition, ProjectsService],
                resolveFn: (trans, svc) => svc.getById(trans.params().projectId)
            }
        ]
    }
];