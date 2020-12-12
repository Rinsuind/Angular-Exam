import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    public cars: any[];
    public isEmpty: boolean;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.userService.userCheckOut().subscribe({
            next: (res) => {
                this.cars = res.carsChecked;
                this.isEmpty = !!this.cars.length;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    deleteItem(id: string) {
        this.userService.delItem(id).subscribe({
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
        const data = this.cars.reduce((a, b) => {
            a.push(b._id);
            return a;
        }, []);
        this.userService.finish(data).subscribe({
            next: (_) => {},
            error: (err) => {
                console.log(err);
            },
        });
        this.router.navigate(['/car/main']);
    }
}
