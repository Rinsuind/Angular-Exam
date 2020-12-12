import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {
    private notifySubject: BehaviorSubject<number> = new BehaviorSubject<number>(
        null
    );
    public notification$ = this.notifySubject.asObservable();
    constructor(private http: HttpClient) {}

    updateNotifications(value: number): void {
        this.notifySubject.next(value);
    }
}
