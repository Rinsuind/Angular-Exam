import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { passwordMatch } from '../../shared/validators';
import { UserService } from '../user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        const passwordControl = this.fb.control('', [
            Validators.required,
            Validators.minLength(6),
        ]);
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(2)]],
            password: passwordControl,
            rePassword: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    passwordMatch(passwordControl),
                ],
            ],
        });
    }

    ngOnInit(): void {}

    submitHandler(): void {
        const data = this.form.value;
        this.userService.register(data).subscribe({
            next: () => {
                this.router.navigate(['/user/login']);
            },
            error: (err) => console.log(err.error.message),
        });
    }
}
