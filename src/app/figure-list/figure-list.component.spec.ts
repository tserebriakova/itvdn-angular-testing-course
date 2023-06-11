import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FigureListComponent } from "./figure-list.component";
import { FigureListItemComponent } from "./figure-list-item/figure-list-item.component";
import { DebugElement } from "@angular/core";
import { GeometryType } from "../figure-item.model";
import { BehaviorSubject } from "rxjs";
import { By } from "@angular/platform-browser";
import {FigureDataService} from "../figure-data.service";

describe("figure-list component", () => {

  let fixture: ComponentFixture<FigureListComponent>;
  let component: FigureListComponent;
  let el: DebugElement;
  let dataService: FigureDataService | jasmine.SpyObj<FigureDataService>;

  const dataServiceSpyObj = jasmine.createSpyObj("FigureDataService", {"getFigureItems": {subscribe: () => null}, "removeFigureItem": null}, {
    "data$": new BehaviorSubject([
      { id: '1234', color: "rgb(255, 222, 174)", geometryType: GeometryType.BOX, name: "Test Box 1234", size: 3 },
      { id: '5678', color: "rgb(169, 234, 31)", geometryType: GeometryType.SPHERE, name: "Test Sphere 5678", size: 5 },
    ]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FigureListComponent, FigureListItemComponent],
      providers: [{ provide: FigureDataService, useValue: dataServiceSpyObj }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FigureListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        dataService = TestBed.inject(FigureDataService);
        fixture.detectChanges();
      });
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should retrieve data and render correct amount of list-items", () => {
    const figureListItems = el.queryAll(By.css("app-figure-list-item"));

    expect(dataService.data$.getValue().length).toBe(2);
    expect(figureListItems.length).toBe(2);
  });

  it("should receive event from list-item event emitter", () => {
    const onRemoveHandlerSpy = spyOn(component, "onRemoveHandler");

    const figureListItem = el.queryAll(By.css("app-figure-list-item"))[1];
    const deleteButton = figureListItem.query(By.css(".delete-button"));
    deleteButton.nativeElement.click();

    expect(onRemoveHandlerSpy).toHaveBeenCalledWith("5678");
  });
});
