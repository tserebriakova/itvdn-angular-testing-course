import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {FigureDataService} from "../figure-data.service";
import { IFigureItem } from '../figure-item.model';

@Component({
  selector: 'app-figure-list',
  templateUrl: './figure-list.component.html',
})
export class FigureListComponent {
  public figureList$: BehaviorSubject<IFigureItem[]> = new BehaviorSubject<IFigureItem[]>([]);

  constructor(private dataService: FigureDataService) {
    this.dataService.getFigureItems().subscribe();
    this.figureList$ = this.dataService.data$;
  }

  public onRemoveHandler(id: string) {
    this.dataService.removeFigureItem(id).subscribe();
  }
}
