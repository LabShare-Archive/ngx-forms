import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsService } from "../../services/projects.service";
import { HeaderComponent } from './header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { SliderComponent } from '../slider/slider.component';
import { NgbCarousel, NgbSlide } from '../../../node_modules/@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { Http, ConnectionBackend, RequestOptions, HttpModule } from '@angular/http';

describe('HeaderComponent', () => {
    let component = new HeaderComponent();
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            declarations: [
                HeaderComponent
            ],
            providers: [ Http, ConnectionBackend ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});