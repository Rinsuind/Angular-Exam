import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private storage: StorageService
    ) {
        this.form = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngOnInit(): void {}

    submitForm() {
        const data = this.form.value;
        this.userService.login(data).subscribe({
            next: (res) => {
                const { _id, username, token } = res.resUser;
                this.storage.setItem('id', _id);
                this.storage.setItem('token', token);
                this.storage.setItem('username', username);
                this.router.navigate(['/']);
            },
            error: (err) => console.log(err),
        });
    }
}
