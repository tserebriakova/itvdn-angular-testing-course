import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FigureDataService} from "../figure-data.service";
import { GeometryType, mapToFigureItem } from '../figure-item.model';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public shapeFormGroup = new FormGroup({
    figureName: new FormControl<string>('', [Validators.required]),
    geometryType: new FormControl<GeometryType>(GeometryType.BOX),
    figureSize: new FormControl<number>(2),
    figureColor: new FormControl<string>('#A9EA1F'),
  });

  public geometryTypesSelectOptions: GeometryType[] = Object.values(GeometryType);

  constructor(private dataService: FigureDataService) {}

  public onSubmit() {
    if (this.shapeFormGroup.valid) {
      this.dataService.addFigureItem(mapToFigureItem({
        id: uuid(),
        name: this.shapeFormGroup.value.figureName,
        size: this.shapeFormGroup.value.figureSize,
        color: this.shapeFormGroup.value.figureColor,
        geometryType: this.shapeFormGroup.value.geometryType,
      })).subscribe();

      this.shapeFormGroup.controls['figureName'].setValue('');
    }
  }
}
