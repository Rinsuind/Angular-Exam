import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    register(data: any): Observable<any> {
        return this.http.post(`user/register`, data);
    }
    login(data: any): Observable<any> {
        return this.http.post(`user/login`, data);
    }

    logout(): Observable<any> {
        return this.http.get('user/logout');
    }
    profile(): Observable<any> {
        return this.http.get('user/profile');
    }
    userCheckOut(): Observable<any> {
        return this.http.get('user/checkout');
    }
    delItem(id: string): Observable<any> {
        return this.http.request('DELETE', 'user/delete/item', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: { _id: id },
        });
    }
}
