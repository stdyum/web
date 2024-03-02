import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'character',
  standalone: true,
  imports: [],
  template: `<img
    [alt]="'character_' + position"
    [src]="'assets/character/' + position + '.webp'"
  />`,
  styles: [
    `
      :host {
        display: flex;
        aspect-ratio: 1;
      }

      img {
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  @Input({ required: true }) position!: string;

  private hostRef = inject(ElementRef<HTMLElement>);

  get host(): HTMLElement {
    return this.hostRef.nativeElement;
  }

  @Input() set flipHorizontally(value: boolean) {
    this.host.style.transform = `scaleX(${value ? -1 : 1})`;
  }
}
