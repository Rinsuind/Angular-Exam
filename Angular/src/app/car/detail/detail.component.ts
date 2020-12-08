import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { CarService } from '../car.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
    car: any;
    owner: boolean;
    constructor(
        private storageService: StorageService,
        private carService: CarService,
        private routes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.routes.snapshot.params.id;
        this.carService.getCarDetails(id).subscribe({
            next: (car) => {
                this.owner = car.creator === this.storageService.getItem('id');
                this.car = car;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
