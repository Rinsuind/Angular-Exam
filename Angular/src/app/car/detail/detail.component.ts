import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
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
    data: any;
    constructor(
        private storageService: StorageService,
        private carService: CarService,
        private routes: ActivatedRoute,
        private notifyService: NotificationService
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

    handler() {
        const id = this.routes.snapshot.params.id;

        this.carService.updateUserCars(id).subscribe({
            next: (value) => {
                this.data = value;
                this.notifyService.updateNotifications(this.data.data);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
