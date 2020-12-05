import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
