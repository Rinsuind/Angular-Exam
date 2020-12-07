import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../car.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
    form: FormGroup;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private carService: CarService
    ) {
        this.form = this.fb.group({
            brand: ['', [Validators.required]],
            model: ['', [Validators.required]],
            year: ['', [Validators.required]],
            engine: ['', [Validators.required]],
            enginePower: ['', [Validators.required]],
            engineCapacity: ['', [Validators.required]],
            transmission: ['', [Validators.required]],
            imageUrl: ['', [Validators.required]],
            price: ['', [Validators.required]],
            description: [''],
        });
    }

    ngOnInit(): void {}

    submitForm() {
        const data = this.form.value;
        this.carService.createNewOffer(data).subscribe({
            next: () => {
                this.router.navigate(['/car/main']);
            },
            error: (err) => console.log(err),
        });
    }
}
