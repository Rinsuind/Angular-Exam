import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
    form = this.fb.group({
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
    constructor(
        private carService: CarService,
        private router: Router,
        private fb: FormBuilder,
        private routes: ActivatedRoute
    ) {
        carService.getCarDetails(routes.snapshot.params.id).subscribe({
            next: (car) => {
                this.form.get('brand').setValue(car.brand);
                this.form.get('model').setValue(car.model);
                this.form.get('year').setValue(car.year);
                this.form.get('engine').setValue(car.engine);
                this.form.get('enginePower').setValue(car.enginePower);
                this.form.get('engineCapacity').setValue(car.engineCapacity);
                this.form.get('transmission').setValue(car.transmission);
                this.form.get('imageUrl').setValue(car.imageUrl);
                this.form.get('price').setValue(car.price);
                this.form.get('description').setValue(car.description);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    ngOnInit(): void {}

    submitForm() {
        const data = this.form.value;
        const id = this.routes.snapshot.params.id;
        this.carService.updateCar(id, data).subscribe({
            next: (_) => {
                this.router.navigate([`/car/detail/${id}`]);
            },
            error: (err) => console.log(err),
        });
    }
}
