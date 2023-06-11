import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {IFigureItem, mapToFigureItem} from './figure-item.model';
import {LOCAL_STORAGE_DATA_KEY} from './providers';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data: IFigureItem[] = [];
  public readonly data$: BehaviorSubject<IFigureItem[]> = new BehaviorSubject<IFigureItem[]>([]);

  constructor(@Inject(LOCAL_STORAGE_DATA_KEY) private key: string) {
    this.unstashData();
  }

  addFigureItem(figureItem: IFigureItem): void {
    this.data.push(figureItem);
    this.refreshSubject();
  }

  removeFigureItem(id: string): IFigureItem {
    const removedElements = this.data.splice(this.data.findIndex((item) => item.id === id), 1);
    this.refreshSubject();
    return removedElements[0];
  }

  public stashData(): void {
    window.localStorage.setItem(this.key, JSON.stringify(this.data));
    console.info(`Stashed ${this.data.length} items successfully.`);
  }

  public unstashData(): void {
    const items: string | null = window.localStorage.getItem(this.key);
    this.data = items ? JSON.parse(items).map((item: any) => mapToFigureItem(item)) : [];
    console.info(`Unstashed ${this.data.length} items successfully.`);
    this.refreshSubject();
  }

  private refreshSubject(): void {
    this.data$.next(this.data);
  }

}
