import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timeline',
    template: require('./timeline.component.html'),
    styles: [require('./timeline.component.scss').toString()],
})

export class TimelineComponent implements OnInit {

    date: Date;
    endDate: any;
    startDate: any;
    testConfig: any;
    beginDay: any;
    endDay: any;
    totalNumberOfMonths: any;
    arrayOfWidths: any;
    cellBrightness: any;
    textBrightness: any;
    jsonObjectString: any;
    timeLineWidths: any;
    earliestYear: any;
    latestYear: any;
    testPercentage: any;
    arrayOfBlocks: any;
    testColor: any;
    myColor: any;
    arrayOfCell: any;
    myClass: any;

    constructor() { }

    ngOnInit() {
        this.date = new Date;
        this.testConfig = [
            {
                name: 'Stage 1',
                startProject: new Date('9/1/2016'),
                endProject: new Date('5/15/2017'),
            },
            {
                name: 'Stage 2',
                startProject: new Date('5/16/2017'),
                endProject: new Date('8/17/2017'),
            },
            {
                name: 'Stage 3',
                startProject: new Date('8/18/2018'),
                endProject: new Date('2/25/2018'),
            },
            {
                name: 'Stage 4',
                startProject: new Date('2/26/2018'),
                endProject: new Date('7/28/2018'),
            }
        ];

        this.cellBrightness = 100;
        this.arrayOfWidths = [];
        this.jsonObjectString = JSON.stringify(this.testConfig);
        this.timeLineWidths = [];
        this.getDateRange();
        this.findStartDate();
        this.findEndDate();
        this.totalNumberOfMonths = this.getNumOfMonths(this.beginDay, this.endDay);
        this.drawTimeLine();
        this.testPercentage = 25;
        this.arrayOfBlocks = [];
        this.testColor = "red";
        this.myColor = '#c4ffd9';
        this.arrayOfCell = [];
    }

    getDateRange() {
        this.startDate, this.endDate;
        if (this.startDate === undefined) {
            this.startDate = new Date();
        }
        if (this.endDate === undefined) {
            this.endDate = new Date('1/1/1970');
        }

        /**
         * Looks for the start of the timeline
         */
        this.testConfig.forEach(i => {
            if (i.startProject < this.startDate) {
                this.startDate = i.startProject;
            }
        });

        /**
         * Looks for the end of the timeline
         */
        this.testConfig.forEach(i => {
            if (i.endProject > this.endDate) {
                this.endDate = i.endProject;
            }
        });
    }

    getNumOfMonths(minDate, maxDate) {
        return (maxDate.getFullYear() - minDate.getFullYear()) * 12 + (maxDate.getMonth() - minDate.getMonth()) + 1;
    }

    findStartDate() {
        let earliestDate = this.testConfig[0].startProject;
        this.testConfig.forEach(i => {
            if (earliestDate > i.startProject) {
                earliestDate = i.startProject;
            }
        });
        this.beginDay = earliestDate;
    }

    findEndDate() {
        let latestDate = this.testConfig[0].endProject;
        this.testConfig.forEach(i => {
            if (latestDate < i.endProject) {
                latestDate = i.endProject;
            }
        });
        this.endDay = latestDate;
    }

    drawTimeLine() {
        this.earliestYear = this.startDate.getFullYear();
        this.latestYear = this.endDate.getFullYear();
        let lengthOfThisProject = this.getNumOfMonths(this.beginDay, this.endDay);
        let arrayOfWidths = [];
        this.testConfig.forEach(i => {
            let lengthOfThisStage = this.getNumOfMonths(i.startProject, i.endProject);
            let percentage = lengthOfThisStage / lengthOfThisProject;
            arrayOfWidths.push(percentage)
        })
    }

    lightenDarkenColor(col, amt) {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

    }

    printTestConfig() {
        this.testConfig.forEach(element => {
        });
    }

    drawCell(cell, num) {
        let thisWidth = this.getNumOfMonths(cell.startProject, cell.endProject);
        let percent = (thisWidth / this.totalNumberOfMonths) * 100;
        let thisColor = '#c4ffd9';
        this.testConfig.forEach(element => {
            thisColor = this.lightenDarkenColor(thisColor, -20);
            element.color = thisColor;
            this.arrayOfCell.push(thisColor);
        });
        cell.percentage = percent;
    }
}
