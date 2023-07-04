import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  get(key: string): any {
    try {
      const data: any = sessionStorage.getItem(key);
      if (!data) {
        return null;
      }
      return JSON.parse(data);
    } catch (e) {
      throw new Error('Error getting data from sessionStorage');
    }
  }

  getString(key: string): any {
    try {
      const data: any = sessionStorage.getItem(key);
      if (!data) {
        return null;
      }
      return data;
    } catch (e) {
      throw new Error('Error getting data from sessionStorage');
    }
  }

  set(key: string, data: any): void {
    try {
      sessionStorage.setItem(
        key,
        typeof data === 'string' ? data : JSON.stringify(data)
      );
    } catch (e) {
      throw new Error('Error saving data to sessionStorage');
    }
  }

  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      throw new Error('Error removing data from sessionStorage');
    }
  }

  clearAll(): void {
    try {
      sessionStorage.clear();
    } catch (e) {
      throw new Error('Error clearing data from sessionStorage');
    }
  }
}
