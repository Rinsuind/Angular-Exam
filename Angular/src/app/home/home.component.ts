import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { HomeService } from './home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    cars: any;
    get token(): string {
        return this.storageService.getItem('token');
    }
    constructor(
        private storageService: StorageService,
        private homeService: HomeService
    ) {}

    ngOnInit(): void {
        this.homeService.getData().subscribe({
            next: (data) => {
                this.cars = data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
