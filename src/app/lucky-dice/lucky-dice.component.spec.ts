import {ComponentFixture, TestBed} from '@angular/core/testing';
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

  it('should roll the dice after click (with done function)', (done) => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.lastRoll).not.toBe(0);
      done();
    }, 500);
  });

  it('should roll the dice after click (with fakeTimers)', () => {
    jest.useFakeTimers();

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    jest.advanceTimersByTime(1000);

    expect(component.lastRoll).not.toBe(0);
  });

  it('should roll the dice after click (with async/await)', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => expect(component.lastRoll).not.toBe(0));
  });
});
