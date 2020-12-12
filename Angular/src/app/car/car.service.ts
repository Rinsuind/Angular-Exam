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

    getCarDetails(key: string): Observable<any> {
        return this.http.get(`car/detail/${key}`);
    }

    updateCar(id: string, data: any): Observable<any> {
        return this.http.patch(`car/edit/${id}`, data);
    }
    updateUserCars(id: string) {
        return this.http.get(`user/buy/${id}`);
    }
    deleteCar(id: string): Observable<any> {
        return this.http.delete(`car/delete/${id}`);
    }
    likeCar(data: any): Observable<any> {
        return this.http.patch('car/like', data);
    }
    dislikeCar(data: any): Observable<any> {
        return this.http.patch('car/dislike', data);
    }
}
