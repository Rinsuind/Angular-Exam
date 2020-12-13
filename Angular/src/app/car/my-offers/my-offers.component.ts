import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { fade } from '../../shared/animations';

@Component({
    selector: 'app-my-offers',
    templateUrl: './my-offers.component.html',
    styleUrls: ['./my-offers.component.css'],
    animations: [fade],
})
export class MyOffersComponent implements OnInit {
    cars: any[];
    constructor(private carService: CarService, private router: Router) {}

    ngOnInit(): void {
        this.carService.usersCars().subscribe({
            next: (res) => {
                this.cars = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
