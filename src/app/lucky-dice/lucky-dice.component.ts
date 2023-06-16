import {Component} from '@angular/core';

@Component({
  selector: 'lucky-dice',
  template: '<button (click)="rollDice()">🎲</button>'
})
export class LuckyDiceComponent {
  public lastRoll = 0;

  public rollDice(): void {
    setTimeout(() => this.lastRoll = Math.floor(Math.random() * 6) + 1, 500);
  }
}
