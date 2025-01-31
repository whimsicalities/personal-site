import { Component } from '@angular/core';
import { HealthcheckComponent } from '../healthcheck/healthcheck.component';
import { InteractionLogComponent } from '../interaction-log/interaction-log.component';
import { PetInteractionInterfaceComponent } from '../pet-interaction-interface/pet-interaction-interface.component';
import { PetComponent } from '../pet/pet.component';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [
    HealthcheckComponent,
    PetComponent,
    PetInteractionInterfaceComponent,
    InteractionLogComponent,
  ],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.scss'
})
export class PetPageComponent {
}
