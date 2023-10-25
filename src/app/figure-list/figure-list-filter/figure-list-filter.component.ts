import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { GeometryType } from 'src/app/figure-item.model';

interface IFilterUpdate {
  searchName: string;
  searchGeometryType: GeometryType;
  size: {
    from: number;
    to: number;
  }
}

@Component({
  selector: 'app-figure-list-filter',
  templateUrl: './figure-list-filter.component.html',
  styleUrls: ['./figure-list-filter.component.css']
})
export class FigureListFilterComponent implements OnInit {

  public geometryTypesSelectOptions: GeometryType[] = Object.values(GeometryType);

  public showAdvancedOptionsMenu = false;

  @Output()
  public onFilterApply: EventEmitter<IFilterUpdate> = new EventEmitter<IFilterUpdate>();

  public filterFormGroup = new FormGroup({
    searchName: new FormControl<string>(''),
    searchGeometryType: new FormControl<GeometryType>(GeometryType.BOX),
    searchFigureSizeMin: new FormControl<number>(1),
    searchFigureSizeMax: new FormControl<number>(10),
  });

  public toggleAdvancedOptionsMenu(): void {
    this.showAdvancedOptionsMenu = !this.showAdvancedOptionsMenu;
  }

  public onFilterApplyHandler(filterData: IFilterUpdate): void {
    this.onFilterApply.emit(filterData);
  }

  public ngOnInit(): void {
    this.filterFormGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((formValue) => {
        this.onFilterApplyHandler({
          searchName: formValue.searchName!,
          searchGeometryType: formValue.searchGeometryType!,
          size: {
            from: formValue.searchFigureSizeMin!,
            to: formValue.searchFigureSizeMax!,
          }
        });
      });
  }
}
