import { ComponentRef, inject, Injectable, Injector, StaticProvider, Type } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MAT_POPUP_DATA } from '@shared/material/popup/mat-popup.tokens';

@Injectable()
export class MatPopup {
  private currentRef: DialogRef<any, any> | null = null;

  private overlay = inject(Overlay);
  private dialog = inject(Dialog);

  private closeOnClickListener = this.closeOnClick.bind(this);

  open<D = any, T = any>(
    component: Type<T>,
    element: HTMLElement,
    data: D | null = null,
    parentInjector: Injector | undefined = undefined
  ): ComponentRef<T> {
    window.document.removeEventListener('click', this.closeOnClickListener);
    this.dialog.closeAll();

    const rect = element.getBoundingClientRect();
    const position: { [key: string]: string } = {};

    if (rect.left < window.innerWidth - rect.left) {
      position['originX'] = 'start';
      position['overlayX'] = 'start';
    } else {
      position['originX'] = 'end';
      position['overlayX'] = 'end';
    }

    if (rect.top < window.innerHeight - rect.top) {
      position['originY'] = 'bottom';
      position['overlayY'] = 'top';
    } else {
      position['originY'] = 'top';
      position['overlayY'] = 'bottom';
    }

    const providers: StaticProvider[] = [{ provide: MAT_POPUP_DATA, useValue: data }];

    const injector = Injector.create({ parent: parentInjector, providers: providers });

    const config = {
      injector: injector,
      hasBackdrop: false,
      autoFocus: 'first-heading',
      restoreFocus: false,
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(element)
        .withPositions([
          {
            originX: position['originX'] as 'start' | 'end' | 'center',
            originY: position['originY'] as 'bottom' | 'center' | 'top',
            overlayX: position['overlayX'] as 'start' | 'end' | 'center',
            overlayY: position['overlayY'] as 'bottom' | 'center' | 'top',
          },
        ]),
    };
    this.currentRef = this.dialog.open(component, config);
    setTimeout(() => window.document.addEventListener('click', this.closeOnClickListener), 100);

    return this.currentRef.componentRef!!;
  }

  private closeOnClick(e: MouseEvent): void {
    const t = e.target as HTMLElement;
    const close = t.closest('.cdk-overlay-container') === null;
    if (!close || this.currentRef?.config?.disableClose) return;

    this.currentRef?.close();
  }
}
