import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormComponent} from "./form/form.component";
import {ViewerComponent} from "./viewer/viewer.component";
import {FigureListComponent} from "./figure-list/figure-list.component";
import {FigureListItemComponent} from "./figure-list/figure-list-item/figure-list-item.component";
import { DataService } from "./data.service";
import { FigureDataService } from "./figure-data.service";
import { LOCAL_STORAGE_DATA_KEY } from "./providers";
import {HttpClientModule} from "@angular/common/http";
import { LuckyDiceComponent } from './lucky-dice/lucky-dice.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ViewerComponent,
    FigureListComponent,
    FigureListItemComponent,
    LuckyDiceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, FigureDataService, {useValue: 'figure-items', provide: LOCAL_STORAGE_DATA_KEY}],
  bootstrap: [AppComponent]
})
export class AppModule { }
