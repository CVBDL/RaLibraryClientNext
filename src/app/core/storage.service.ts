import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  private storage: Object = {}

  getItem(key: string): any {
    return this.storage[key];
  }

  setItem(key: string, value: any): void {
    this.storage[key] = value;
  }

  removeItem(key: string): void {
    this.storage[key] = undefined;
  }

  clear(): void {
    this.storage = {}
  }
}
