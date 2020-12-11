import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'price',
})
export class PricePipe implements PipeTransform {
    transform(cars: any[]): number {
        return cars.reduce((a, b) => a + b.price, 0);
    }
}
