import { InteractionLogService } from './interaction-log.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('InteractionLogService', () => {
  let service: InteractionLogService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new InteractionLogService(httpClientSpy);
  });

  it('Should map response to an InteractionLog', () => {
    const logId = "logId";
    const time = new Date();
    const message = "message";
    httpClientSpy.get.and.returnValue(of([
      {
        log_id: logId,
        time,
        message
      }
    ]));
    const response = service.getInteractionLog();
    expect(httpClientSpy.get).toHaveBeenCalled();
    response.subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.length).toBe(1);
      expect(response[0].logId).toEqual(logId);
      expect(response[0].time).toEqual(new Date(time));
      expect(response[0].message).toEqual(message);
    });
  });

  it('Should throw an error if http response errors', () => {
    const createErrorResponse = () => new HttpErrorResponse({
      status: 500,
    });
    httpClientSpy.get.and.returnValue(throwError(createErrorResponse));
    const response = service.getInteractionLog();
    response.subscribe({
      next: () => {
        fail("Error should have been raised");
      },
      error: (error) => {
        expect(error.status).toEqual(500);
      },
      complete: () => {
        fail("Error should have been raised");
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });
});