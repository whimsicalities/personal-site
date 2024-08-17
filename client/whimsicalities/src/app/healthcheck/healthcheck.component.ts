import { Component, inject } from '@angular/core';
import { HealthService } from '../services/health/health.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-healthcheck',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './healthcheck.component.html',
  styleUrl: './healthcheck.component.scss'
})
export class HealthcheckComponent {
  healthService = inject(HealthService);
  healthy$!: Observable<boolean>;

  private checkStatus(): void {
    this.healthy$ = this.healthService.healthCheck();
    setTimeout(
      () => this.checkStatus(),
      10000
    );
  }

  ngOnInit(): void {
    this.checkStatus();
  }
}
