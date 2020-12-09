import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    form: FormGroup;
    data: any;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService.profile().subscribe({
            next: (res) => {
                this.data = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    submitHandler() {}
}
