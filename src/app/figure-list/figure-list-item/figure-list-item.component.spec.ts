import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FigureListItemComponent } from "./figure-list-item.component";
import { GeometryType } from "src/app/figure-item.model";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("figure-list-item component", () => {
  let component: FigureListItemComponent;
  let fixture: ComponentFixture<FigureListItemComponent>;
  let el: DebugElement;
  const mockFigureItem = { id: '1234', color: "rgb(255, 222, 174)", geometryType: GeometryType.BOX, name: "Test Box 1234", size: 3 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FigureListItemComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FigureListItemComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        component.item = { ...mockFigureItem };
        fixture.detectChanges();
      });
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should render the name of the component", () => {
    const elementWithName = el.query(By.css("h3"));
    expect(elementWithName.nativeElement).toBeTruthy();
    expect(elementWithName.nativeElement.innerText).toBe(mockFigureItem.name);
  });

  it("should render the color of the figure correctly", () => {
    const colorPreviewElement = el.query(By.css(".color-preview"));
    expect(colorPreviewElement.nativeElement).toBeTruthy();
    expect(colorPreviewElement.nativeElement.style.backgroundColor).toBe(mockFigureItem.color);
  });

  it("should render the geometry details correctly", () => {
    const geometryDetailsElement = el.query(By.css(".geometry-details"));
    expect(geometryDetailsElement.nativeElement).toBeTruthy();
    expect(geometryDetailsElement.nativeElement.textContent).toBe(`| ${mockFigureItem.geometryType} | ${mockFigureItem.size}`);
  });
});
