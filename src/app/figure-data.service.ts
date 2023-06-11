import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

import {GeometryType, IFigureItem, mapToFigureItem} from './figure-item.model';

@Injectable({
  providedIn: 'root'
})
export class FigureDataService {
  public data: IFigureItem[] = [];
  public readonly data$: BehaviorSubject<IFigureItem[]> = new BehaviorSubject<IFigureItem[]>([]);
  private basePath: string;

  constructor(private http: HttpClient) {
    this.basePath = 'http://localhost:3000/figure-items';
  }

  getFigureItems(): Observable<IFigureItem[]> {
    return this.http.get<any>(this.basePath).pipe(
      map((raw: any[]) => raw.map((rawItem: any) => mapToFigureItem(rawItem))),
      map((figureItems: IFigureItem[]) => {
        this.data = figureItems;
        this.refreshSubject();
        return figureItems;
      })
    );
  }

  addFigureItem(figureItem: IFigureItem): Observable<IFigureItem> {
    return this.http.post<any>(this.basePath, figureItem).pipe(
      map((raw: any) => mapToFigureItem(raw)),
      map((figureItem: IFigureItem) => {
        this.data.push(figureItem);
        this.refreshSubject();
        return figureItem;
      })
    );
  }

  updateFigureItem(figureItem: IFigureItem): Observable<IFigureItem> {
    return this.http.put<any>(`${this.basePath}/${figureItem.id}`, figureItem).pipe(
      map((figureId: string) => {
        const index = this.data.findIndex((element) => element.id === figureId);
        if (index !== -1) {
          this.data[index] = figureItem;
          this.refreshSubject();
        }
        return figureItem;
      })
    );
  }

  removeFigureItem(id: string): Observable<string> {
    return this.http.delete<any>(`${this.basePath}/${id}`).pipe(
      map((figureId: string) => {
        const index = this.data.findIndex((element) => element.id === figureId);
        if (index !== -1) {
          this.data.splice(index, 1);
          this.refreshSubject();
        }
        return figureId;
      })
    );
  }

  filterFigureItems(size: number, color: string, geometryType: GeometryType, sortOrder = 'asc'): Observable<IFigureItem[]> {
    return this.http.get(this.basePath, {
      params: new HttpParams()
        .set('size', size.toString())
        .set('color', color)
        .set('geometryType', geometryType)
        .set('sortOrder', sortOrder)
    }).pipe(
      map((raw: any) => raw.map((rawItem: any) => mapToFigureItem(rawItem))),
      map((filteredFigureItems: IFigureItem[]) => {
        this.data = filteredFigureItems;
        this.refreshSubject();
        return filteredFigureItems;
      }),
    );
  }

  private refreshSubject(): void {
    this.data$.next(this.data);
  }
}
