import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { faFaceLaughBeam } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { StatBarComponent } from '../stat-bar/stat-bar.component';

@Component({
  selector: 'app-pet-interaction-interface',
  standalone: true,
  imports: [
    FontAwesomeModule,
    StatBarComponent,
  ],
  templateUrl: './pet-interaction-interface.component.html',
  styleUrl: './pet-interaction-interface.component.scss'
})
export class PetInteractionInterfaceComponent {
  faAppleWhole = faAppleWhole;
  faFaceLaughBeam = faFaceLaughBeam;
  faHeart = faHeart;
  foodBarPercentage = 50;
  playBarPercentage = 50;
}
