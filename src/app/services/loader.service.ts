import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {defer, NEVER} from 'rxjs';
import {finalize, share} from 'rxjs/operators';
import {SpinnerComponent} from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public readonly loader$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => this.hide())
    );
  }).pipe(share());
  private overlayRef: OverlayRef = undefined;

  constructor(private readonly overlay: Overlay) {
  }

  public show(): void {
    void Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
    });
  }

  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef = undefined;
  }
}
