import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UtilsService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if notification shown', () => {
    service.showNotification('test');
    expect(document.querySelectorAll('.mdc-snackbar').length).toBeTruthy();
  })
});
