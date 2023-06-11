import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormComponent } from "./form/form.component";
import { ViewerComponent } from "./viewer/viewer.component";
import { FigureListComponent } from "./figure-list/figure-list.component";
import { FigureListItemComponent } from "./figure-list/figure-list-item/figure-list-item.component";
import { DataService } from "./data.service";
import { LOCAL_STORAGE_DATA_KEY } from "./providers";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FormComponent,
        ViewerComponent,
        FigureListComponent,
        FigureListItemComponent,
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [DataService, {useValue: 'figure-items', provide: LOCAL_STORAGE_DATA_KEY}],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-shaper'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-shaper');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.left.sidebar p')?.textContent).toContain('Make your own 3D space with different figures');
  });
});

describe('something else', () => {
  it('should check something', () => {
    expect(2 + 2).toBe(4);
  });
});
