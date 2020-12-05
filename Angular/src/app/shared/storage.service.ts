import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() {}

    getItem(key: string) {
        return localStorage.getItem(key);
    }

    delItem(key: string) {
        return localStorage.removeItem(key);
    }

    setItem(key: string, value: string) {
        return localStorage.setItem(key, value);
    }
}
