import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  styles: [require('./progress-bar.component.css').toString()],
  template: require('./progress-bar.component.html')  
})

export class ProgressBarComponent implements OnInit {

  wrong: number;
  stage: string;
  step: string;
  testConfig: any;

  constructor() { }

  ngOnInit() {
    this.wrong = 20;
    this.stage = "Implementation";
    this.step = "Lead Development";
    this.testConfig = [
      {
        label: '',
        percentage: ''
      },
      {
        label: '',
        percentage: ''
      },
      {
        label: '',
        percentage: ''
      }
    ]

  }
}
