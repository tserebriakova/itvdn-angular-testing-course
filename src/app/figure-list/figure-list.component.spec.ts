import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FigureListComponent } from "./figure-list.component";
import { FigureListItemComponent } from "./figure-list-item/figure-list-item.component";
import { DataService } from "../data.service";
import { DebugElement } from "@angular/core";
import { GeometryType } from "../figure-item.model";
import { BehaviorSubject, of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("figure-list component", () => {

  let fixture: ComponentFixture<FigureListComponent>;
  let component: FigureListComponent;
  let el: DebugElement;
  let dataService: DataService | jasmine.SpyObj<DataService>;;

  const dataSericeSpyObj = jasmine.createSpyObj("DataService", ["removeFigureItem"], {
    "data$": new BehaviorSubject([
      { id: '1234', color: "rgb(255, 222, 174)", geometryType: GeometryType.BOX, name: "Test Box 1234", size: 3 },
      { id: '5678', color: "rgb(169, 234, 31)", geometryType: GeometryType.SPHERE, name: "Test Sphere 5678", size: 5 },
    ]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FigureListComponent, FigureListItemComponent],
      providers: [{ provide: DataService, useValue: dataSericeSpyObj }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FigureListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        dataService = TestBed.inject(DataService);
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

  it("should recieve event from list-item event emitter", () => {
    const onRemoveHandlerSpy = spyOn(component, "onRemoveHandler");

    const figureListItem = el.queryAll(By.css("app-figure-list-item"))[1];
    const deleteButton = figureListItem.query(By.css(".delete-button"));
    deleteButton.nativeElement.click();

    expect(onRemoveHandlerSpy).toHaveBeenCalledWith("5678");
  });
});
