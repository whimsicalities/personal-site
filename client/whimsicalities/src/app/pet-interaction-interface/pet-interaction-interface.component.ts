import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { faFaceLaughBeam } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { StatBarComponent } from '../stat-bar/stat-bar.component';
import { PetStat } from '../services/pet-stat/PetStat';
import { PetStatService } from '../services/pet-stat/pet-stat.service';
import { Observable, } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pet-interaction-interface',
  standalone: true,
  imports: [
    FontAwesomeModule,
    StatBarComponent,
    AsyncPipe,
  ],
  templateUrl: './pet-interaction-interface.component.html',
  styleUrl: './pet-interaction-interface.component.scss'
})
export class PetInteractionInterfaceComponent {
  private petStatService = inject(PetStatService);

  faAppleWhole = faAppleWhole;
  faFaceLaughBeam = faFaceLaughBeam;
  faHeart = faHeart;
  foodBarPercentage = 100;
  playBarPercentage = 100;

  foodValue$!: Observable<number>;

  private refreshValues(): void {
    this.updateFoodValue();
    setTimeout( // Check for updates
      () => this.refreshValues(),
      10000
    );
  }

  ngOnInit(): void {
    this.updateFoodValue();
    this.refreshValues();
  }

  updateFoodValue(): void {
    this.foodValue$ = this.petStatService.getStat(PetStat.Food);
    this.foodValue$.subscribe(
      (value) => {
        this.foodBarPercentage = value
      }
    )
  }

  getFunValue(): void {
    this.petStatService.getStat(PetStat.Fun);
  }

  feedClick(): void {
    this.petStatService.increaseStat(PetStat.Food)
      .subscribe({
        next: (v) => console.log(v),
        error: (error) => console.log(error),
        complete: () => this.updateFoodValue(),
      });
  }

  playClick(): void {
    this.petStatService.increaseStat(PetStat.Fun);
  }
}
