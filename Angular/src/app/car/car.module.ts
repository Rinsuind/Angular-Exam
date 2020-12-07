import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { CarRouterModule } from './car-routing.module';
import { MainComponent } from './main/main.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarService } from './car.service';

@NgModule({
    declarations: [
        CreateComponent,
        DetailComponent,
        MainComponent,
        MyOffersComponent,
    ],
    imports: [CommonModule, CarRouterModule, ReactiveFormsModule],
    providers: [CarService],
})
export class CarModule {}
