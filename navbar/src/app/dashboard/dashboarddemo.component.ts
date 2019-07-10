import {Component, OnInit} from '@angular/core';
import {CarService} from './service/carservice';
import {EventService} from './service/eventservice';
import {Car} from './domain/car';
import {SelectItem} from 'primeng/primeng';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    cities: SelectItem[];

    cars: Car[];

    cols: any[];

    chartData: any;

    events: any[];

    selectedCity: any;

    selectedCar: Car;

    fullcalendarOptions: any;

    constructor(private carService: CarService, private eventService: EventService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.eventService.getEvents().then(events => {this.events = events; });

    }
}
