import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {By} from "@angular/platform-browser";

import {LuckyDiceComponent} from './lucky-dice.component';

describe('Lucky Dice Component', () => {
  let component: LuckyDiceComponent;
  let fixture: ComponentFixture<LuckyDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LuckyDiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LuckyDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should roll the dice after click (with done function)', (done: DoneFn) => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.lastRoll).not.toBe(0);
      done();
    }, 500);
  });

  it('should roll the dice after click (with fakeAsync zone)', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    tick(1000);

    expect(component.lastRoll).not.toBe(0);
  }));

  it('should roll the dice after click (with waitAsync zone)', waitForAsync(() => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.lastRoll).not.toBe(0);
    });
  }));

  it('should roll the dice after click (with async/await)', async() => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.lastRoll).not.toBe(0);
  });
});
