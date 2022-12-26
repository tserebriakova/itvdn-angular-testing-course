import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormComponent} from "./form/form.component";
import {ViewerComponent} from "./viewer/viewer.component";
import {FigureListComponent} from "./figure-list/figure-list.component";
import {FigureListItemComponent} from "./figure-list/figure-list-item/figure-list-item.component";
import { DataService } from "./data.service";
import { LOCAL_STORAGE_DATA_KEY } from "./providers";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ViewerComponent,
    FigureListComponent,
    FigureListItemComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, {useValue: 'figure-items', provide: LOCAL_STORAGE_DATA_KEY}],
  bootstrap: [AppComponent]
})
export class AppModule { }
