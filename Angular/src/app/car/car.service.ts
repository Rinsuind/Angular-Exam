import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CarService {
    constructor(private http: HttpClient) {}

    createNewOffer(data: any): Observable<any> {
        return this.http.post('car/create', data);
    }

    getAllCars(): Observable<any> {
        return this.http.get('car/main');
    }
}
