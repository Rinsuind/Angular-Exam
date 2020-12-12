import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UserService } from 'src/app/user/user.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
    user: string;
    value: number;
    private interval;
    public notify$: Observable<number>;
    constructor(
        private storage: StorageService,
        private router: Router,
        private userService: UserService,
        public notifyService: NotificationService
    ) {}

    get token() {
        return this.storage.getItem('token');
    }

    get username() {
        return this.storage.getItem('username');
    }

    ngOnInit(): void {
        //if (this.token) {
        //    setInterval(() => {
        //        this.userService.profile().subscribe({
        //            next: (user) => {
        //                this.notifyService.updateNotifications(
        //                    user.carsChecked.length
        //                );
        //                this.notify$ = this.notifyService.notification$;
        //                this.notify$.subscribe({
        //                    next: (value) => {
        //                        this.value = value;
        //                    },
        //                });
        //            },
        //            error: (err) => {
        //                console.log(err);
        //            },
        //        });
        //    }, 1000);
        //}

        if (this.token) {
            this.interval = setInterval(() => {
                this.userService.profile().subscribe({
                    next: (user) => {
                        this.notifyService.updateNotifications(
                            user.carsChecked.length
                        );
                        this.notify$ = this.notifyService.notification$;
                        this.notify$.subscribe({
                            next: (value) => {
                                this.value = value;
                            },
                        });
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            }, 1000);
        }
    }

    logout() {
        clearInterval(this.interval);
        this.userService.logout().subscribe({
            next: (_) => {
                this.storage.delItem('username');
                this.storage.delItem('token');
                this.storage.delItem('id');
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
