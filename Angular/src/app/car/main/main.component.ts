import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    cars: any;

    constructor(private carService: CarService) {}

    ngOnInit(): void {
        this.carService.getAllCars().subscribe({
            next: (cars) => {
                this.cars = cars;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
