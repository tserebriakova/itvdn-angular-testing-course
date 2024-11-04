import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {FigureDataService} from './figure-data.service';
import {GeometryType, IFigureItem} from "./figure-item.model";
import {default as data} from '../../extra/data.json';
import {HttpErrorResponse} from "@angular/common/http";

describe('FigureDataService', () => {
  let figureDataService: FigureDataService;
  let httpMock: HttpTestingController;

  const basePath = 'http://localhost:3000/figure-items';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FigureDataService]
    });

    figureDataService = TestBed.inject(FigureDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get figure items', () => {
    figureDataService.getFigureItems().subscribe((items) => {
      expect(items).equal((data as Array<IFigureItem>));
      expect(figureDataService.data.length).be(51);
      expect(figureDataService.data).equal((data as Array<IFigureItem>));
    });

    const req = httpMock.expectOne(basePath);
    expect(req.request.method).be('GET');
    req.flush(data);
  });


  it('should add a figure item', () => {
    const figureItem = {id: 'test-id', name: 'Test Figure', size: 2, color: '#ffffff', geometryType: GeometryType.BOX};

    figureDataService.addFigureItem(figureItem).subscribe((item) => {
      expect(item).equal(figureItem);
      expect(figureDataService.data.length).be(1);
    });

    const req = httpMock.expectOne(basePath);
    expect(req.request.method).be('POST');
    req.flush(figureItem);
  });

  it('should update a figure item', () => {
    const figureItem = {id: 'test-id', name: 'Test Figure', size: 2, color: '#ffffff', geometryType: GeometryType.BOX};
    figureDataService.data = [figureItem];
    expect(figureDataService.data[0]).equal(figureItem);

    const updatedFigureItem = {id: 'test-id', name: 'Updated Test Figure', size: 1, color: '#000000', geometryType: GeometryType.SPHERE};
    expect(figureDataService.data[0]).not.equal(updatedFigureItem);

    figureDataService.updateFigureItem(updatedFigureItem).subscribe((item) => {
      expect(item).equal(updatedFigureItem);
      expect(figureDataService.data.length).be(1);
      expect(figureDataService.data[0]).equal(updatedFigureItem);
    });

    const req = httpMock.expectOne(`${basePath}/test-id`);
    expect(req.request.method).be('PUT');
    req.flush('test-id');
  });

  it('should remove a figure item', () => {
    const figureItem = {id: 'test-id', name: 'Test Figure', size: 2, color: '#ffffff', geometryType: GeometryType.BOX};

    figureDataService.data = [figureItem];

    figureDataService.removeFigureItem(figureItem.id).subscribe((removedFigureId) => {
      expect(removedFigureId).equal('test-id');
      expect(figureDataService.data.length).be(0);
    });

    const req = httpMock.expectOne(`${basePath}/test-id`);
    expect(req.request.method).be('DELETE');
    req.flush('test-id');
  });

  it('should handle error', () => {
    const figureItem = {id: 'test-id', name: 'Test Figure', size: 2, color: '#ffffff', geometryType: GeometryType.BOX};
    figureDataService.data = [figureItem];

    figureDataService.removeFigureItem('wrong-test-id').subscribe({
      next: () => fail('remove figure operation should have failed'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).be(400);
        expect(figureDataService.data.length).be(1);
      }});

    const req = httpMock.expectOne(`${basePath}/wrong-test-id`);
    expect(req.request.method).be('DELETE');
    req.flush('wrong-test-id', {status: 400, statusText: 'Cannot find figure with provided identifier.'});
  });

  it('should filter figure items and update data', () => {
    const size = 2;
    const color = '#ffffff';
    const geometryType = GeometryType.BOX;
    const sortOrder = 'asc';

    const figureItems: IFigureItem[] = [
        {"id": "test-id-1", "name": "cherry-ocean-lamp", "size": 5, "color": "#FF355E", "geometryType": GeometryType.CYLINDER},
        {"id": "test-id-2", "name": "mountain-book-chair", "size": 8, "color": "#8B4513", "geometryType": GeometryType.SPHERE},
        {"id": "test-id-3", "name": "sun-river-grape", "size": 2, "color": "#FFBF00", "geometryType": GeometryType.BOX},
        {"id": "test-id-4", "name": "starry-desk-strawberry", "size": 6, "color": "#C71585", "geometryType": GeometryType.SPHERE},
        {"id": "test-id-5", "name": "dog-moon-beach", "size": 2, "color": "#ffffff", "geometryType": GeometryType.CYLINDER},
        {"id": "test-id-6", "name": "clock-mango-forest", "size": 9, "color": "#808080", "geometryType": GeometryType.CYLINDER},
        {"id": "test-id-7", "name": "music-kiwi-watermelon", "size": 7, "color": "#FF00FF", "geometryType": GeometryType.BOX},
        {"id": "test-id-8", "name": "paper-tree-sky", "size": 4, "color": "#87CEEB", "geometryType": GeometryType.CYLINDER},
        {"id": "test-id-9", "name": "orange-pencil-cat", "size": 10, "color": "#FFA500", "geometryType": GeometryType.BOX},
        {"id": "test-id-10", "name": "lake-beach-butterfly", "size": 2, "color": "#008080", "geometryType": GeometryType.CYLINDER},
        {"id": "test-id-11", "name": "raspberry-car-jackfruit", "size": 5, "color": "#E30B5C", "geometryType": GeometryType.SPHERE},
        {"id": "test-id-12", "name": "painting-mountain-chair", "size": 3, "color": "#8B4513", "geometryType": GeometryType.CYLINDER},
        {"id": "test-id-13", "name": "lemon-cloud-movie", "size": 7, "color": "#FFFACD", "geometryType": GeometryType.SPHERE},
        {"id": "test-id-14", "name": "sky-fig-nature", "size": 2, "color": "#87CEEB", "geometryType": GeometryType.BOX},
        {"id": "test-id-15", "name": "river-banana-clock", "size": 6, "color": "#1E90FF", "geometryType": GeometryType.CYLINDER},
        {"id": "test-id-16", "name": "star-bird-lake", "size": 8, "color": "#FFD700", "geometryType": GeometryType.BOX},
        {"id": "test-id-17", "name": "sunflower-honeydew-desk", "size": 4, "color": "#FFC125", "geometryType": GeometryType.CYLINDER},
        {"id": "test-id-18", "name": "ocean-table-music", "size": 9, "color": "#1E90FF", "geometryType": GeometryType.BOX},
        {"id": "test-id-19", "name": "moonlight-flower-tangerine", "size": 1, "color": "#F0F8FF", "geometryType": GeometryType.SPHERE},
        {"id": "test-id-20", "name": "butterfly-painting-beach", "size": 2, "color": "#ffffff", "geometryType": GeometryType.CYLINDER},
      ];

    figureDataService.data = [...figureItems];

    const filteredFigureItems = [
      {"id": "test-id-20", "name": "butterfly-painting-beach", "size": 2, "color": "#ffffff", "geometryType": GeometryType.CYLINDER},
      {"id": "test-id-5", "name": "dog-moon-beach", "size": 2, "color": "#ffffff", "geometryType": GeometryType.CYLINDER},
    ];

    figureDataService.filterFigureItems(size, color, geometryType, sortOrder).subscribe((items) => {
      expect(items).equal(filteredFigureItems);
      expect(figureDataService.data.length).be(2);
      expect(figureDataService.data).equal(filteredFigureItems);
    });

    const req = httpMock.expectOne((req) => req.url === basePath);

    expect(req.request.method).be('GET');
    expect(req.request.params.get('size')).be(size.toString());
    expect(req.request.params.get('color')).be(color);
    expect(req.request.params.get('geometryType')).be(geometryType);
    expect(req.request.params.get('sortOrder')).be(sortOrder);

    req.flush(filteredFigureItems);
  });
});
