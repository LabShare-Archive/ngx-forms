import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Http } from "@angular/http";
import { ProjectsService } from "../../services/projects.service";
import { DetailsComponent } from './project-details.component';
// import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
// import { TimelineComponent } from '../timeline/timeline.component';
// import { SliderComponent } from '../slider/slider.component';
// import { NgbCarousel, NgbSlide } from '../../../node_modules/@ng-bootstrap/ng-bootstrap/carousel/carousel';
HttpTestingController

import { HttpClient, HttpHandler } from '@angular/common/http';
import { NgCoreConfig } from "ls-ng-core";
import { HttpModule } from '@angular/http';
import { StateService, UIRouter } from '@uirouter/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { MilestonesService } from '../../services/milestones.service';

describe('DetailsComponent', () => {
    let uirouter = new UIRouter();
    let stateService = new StateService(uirouter);
    let httpClient = new HttpClient();
    let milestoneService = new MilestonesService(HttpClient, NgCoreConfsig);
    let component = new DetailsComponent(MilestonesService, stateService);
    let fixture: ComponentFixture<DetailsComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            declarations: [
                WidgetComponent, 
                DetailsComponent
            ],
            providers: [
                { provide: StateService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});