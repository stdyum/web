import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { filter, map, Subscription } from 'rxjs';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { StudyPlacesService } from '@shared/services/study-places.service';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  @Input({ required: true, alias: 'hasPermission' }) permission!: string;

  private studyPlacesService = inject(StudyPlacesService);
  private permissionSubscription?: Subscription;

  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private embeddedView: EmbeddedViewRef<any> | null = null;

  ngOnInit(): void {
    this.permissionSubscription = this.studyPlacesService.userEnrollment
      .pipe(map(e => e.permissions))
      .pipe(filterNotNull())
      .pipe(filter(p => p.includes(this.permission) || p.includes('admin')))
      .subscribe(this.placeItem.bind(this));
  }

  ngOnDestroy(): void {
    this.permissionSubscription?.unsubscribe();
  }

  private placeItem(): void {
    this.embeddedView?.destroy();
    this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}
