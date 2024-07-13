import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthcheckComponent } from './healthcheck/healthcheck.component';
import { PetComponent } from './pet/pet.component';
import { TitleComponent } from './title/title.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HealthcheckComponent, PetComponent, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'whimsicalities';
}
