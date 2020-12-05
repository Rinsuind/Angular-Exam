import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { UserService } from 'src/app/user/user.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
    user: string;
    constructor(
        public storage: StorageService,
        private router: Router,
        private userService: UserService
    ) {}

    get token() {
        return this.storage.getItem('token');
    }

    get username() {
        return this.storage.getItem('username');
    }

    ngOnInit(): void {}

    logout() {
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
