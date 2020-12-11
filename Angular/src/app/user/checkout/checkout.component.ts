import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    cars: any[];

    constructor(
        private userService: UserService,
        private router: Router,
        private notify: NotificationService
    ) {}

    ngOnInit(): void {
        this.userService.userCheckOut().subscribe({
            next: (res) => {
                this.cars = res.carsChecked;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    deleteItem(id: string) {
        this.userService.delItem(id).subscribe({
            next: (_) => {},
            error: (err) => {
                console.log(err);
            },
        });

        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.router.onSameUrlNavigation = 'reload';

        this.router.navigate(['/user/checkout']);
    }
    buy() {
        this.notify.updateNotifications(0);

        this.router.navigate(['/car/main']);
    }
}
