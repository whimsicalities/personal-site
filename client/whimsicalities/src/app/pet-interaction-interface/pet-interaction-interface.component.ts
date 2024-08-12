import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { faFaceLaughBeam } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { StatBarComponent } from '../stat-bar/stat-bar.component';
import { PetStat } from '../services/pet-stat/PetStat';
import { PetStatService } from '../services/pet-stat/pet-stat.service';
import { catchError, Observable, tap } from 'rxjs';
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
  foodBarPercentage = 50;
  playBarPercentage = 50;

  foodValue$!: Observable<number>;

  ngOnInit() {
    this.updateFoodValue();
  }

  updateFoodValue() {
    this.foodValue$ = this.petStatService.getStat(PetStat.Food);
  }

  getFunValue() {
    this.petStatService.getStat(PetStat.Fun);
  }

  feedClick() {
    this.petStatService.increaseStat(PetStat.Food)
      .subscribe({
        next: (v) => console.log(v),
        error: (error) => console.log(error),
        complete: () => this.updateFoodValue(),
      });
  }

  playClick() {
    this.petStatService.increaseStat(PetStat.Fun);
  }
}
