import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPanelComponent } from '../dynamic-panel/dynamic-panel.component';
import { DynamicFieldDirective } from '../../components/dynamic-field/dynamic-field.directive';
import { DebugElement } from "@angular/core";
import { DynamicFormComponent } from "./dynamic-form.component";
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DynamicFieldService } from "../../services/dynamic-field.service";
import { ObserverService } from '../../services/observer.service';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let directiveEl: DebugElement;
  let directiveInstance;

  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [DynamicFormComponent, DynamicPanelComponent, DynamicFieldDirective],
      providers: [DataService, DynamicFieldService, ObserverService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({});
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
