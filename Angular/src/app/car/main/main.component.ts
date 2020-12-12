import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { CarService } from '../car.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    cars: any;
    userId: string;

    constructor(
        private carService: CarService,
        private storageService: StorageService,
        private router: Router
    ) {
        this.userId = storageService.getItem('id');
    }

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

    like(id: string) {
        const data = { id };
        this.carService.likeCar(data).subscribe({
            error: (err) => {
                console.log(err);
            },
        });
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.router.onSameUrlNavigation = 'reload';

        this.router.navigate(['/car/main']);
    }
    dislike(id: string) {
        const data = { id };

        this.carService.dislikeCar(data).subscribe({
            error: (err) => {
                console.log(err);
            },
        });
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.router.onSameUrlNavigation = 'reload';

        this.router.navigate(['/car/main']);
    }
}
