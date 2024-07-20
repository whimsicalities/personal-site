import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  standalone: true,
  imports: [
    NgStyle,
  ],
  templateUrl: './stat-bar.component.html',
  styleUrl: './stat-bar.component.scss'
})
export class StatBarComponent {
  @Input() BarPercentage = 0;

  applyBarWidthStyle() {
    const styles = {
      'width': `${this.BarPercentage}%`
    };
    return styles;
  }
}
