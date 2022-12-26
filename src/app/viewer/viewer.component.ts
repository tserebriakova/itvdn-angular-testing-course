import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  Mesh,
  BoxGeometry,
  MeshPhongMaterial,
  AmbientLight,
  HemisphereLight,
  SphereGeometry,
  CylinderGeometry,
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { DataService } from '../data.service';
import { GeometryType, IFigureItem } from '../figure-item.model';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
})
export class ViewerComponent implements AfterViewInit {

  @ViewChild('viewerRoot')
  private canvasRef!: ElementRef;

  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private controls!: OrbitControls;

  private drawnFiguresUUIDs: string[] = [];

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.createScene();
    this.animate();

    this.dataService.data$.subscribe((figureList: IFigureItem[]) => {
      figureList.forEach((figure: IFigureItem) => !this.drawnFiguresUUIDs.includes(figure.id) && this.draw(figure));

      const figureListIDs = figureList.map(figure => figure.id);
      this.drawnFiguresUUIDs.forEach((drawnFigureUUID) => !figureListIDs.includes(drawnFigureUUID) && this.remove(drawnFigureUUID));
    });
  }

  private createScene(): void {
    this.scene = new Scene();
    this.scene.background = new Color(0x434343);

    this.camera = new PerspectiveCamera(70, this.canvasRef.nativeElement.clientWidth / this.canvasRef.nativeElement.clientHeight, 1, 1000);
    this.camera.position.z = 20;

    this.renderer = new WebGLRenderer({ canvas: this.canvasRef.nativeElement, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);

    window.addEventListener('resize', () => {
      this.camera.aspect = this.canvasRef.nativeElement.clientWidth / this.canvasRef.nativeElement.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);

      this.canvasRef.nativeElement.style.width = `100%`;
      this.canvasRef.nativeElement.style.height = `100%`;
    });

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 0.7);
    hemisphereLight.position.set(2.5, 10, 5);
    this.scene.add(new AmbientLight(0x404040), hemisphereLight);
  }

  private animate(): void {
    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      this.animate();
    });
  }

  public draw(figure: IFigureItem): void {
    let geometry: BoxGeometry | SphereGeometry | CylinderGeometry;

    switch (figure.geometryType) {
      case GeometryType.BOX: {
        geometry = new BoxGeometry(figure.size, figure.size, figure.size);
        break;
      }

      case GeometryType.SPHERE: {
        geometry = new SphereGeometry(figure.size);
        break;
      }

      case GeometryType.CYLINDER: {
        geometry = new CylinderGeometry(figure.size, figure.size, this.getRandomNumber(1, 5));
        break;
      }
    }

    const mesh = new Mesh(geometry, new MeshPhongMaterial({ color: figure.color }));
    mesh.position.set(this.getRandomNumber(-5, 5), this.getRandomNumber(-2.5, 2.5), this.getRandomNumber(-5, 5));
    mesh.userData["meshID"] = figure.id;
    this.scene.add(mesh);
    this.drawnFiguresUUIDs.push(figure.id);
  }

  remove(drawnFigureUUID: string): void {
    // TODO: improve removing with detaching material and geometry
    const meshForRemove = this.scene.children.find(obj => obj.userData["meshID"] === drawnFigureUUID);
    meshForRemove && this.scene.remove(meshForRemove);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
