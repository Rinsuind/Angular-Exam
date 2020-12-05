import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { CarRouterModule } from './car-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
    declarations: [CreateComponent, DetailComponent, MainComponent],
    imports: [CommonModule, CarRouterModule],
})
export class CarModule {}
