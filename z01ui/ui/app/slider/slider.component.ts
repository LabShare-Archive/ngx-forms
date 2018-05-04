import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  template: require('./slider.component.html')  
})
export class SliderComponent implements OnInit{

    imagesArray: any;
  testExample: any;

  constructor() { }

  ngOnInit() {
    this.imagesArray = {
      slide1: 'https://placeimg.com/640/480/animals',
      slide2: 'https://placeimg.com/640/480/nature',
      slide3: 'https://placeimg.com/640/480/tech'
    }
  }
}