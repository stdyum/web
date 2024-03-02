import { Component, forwardRef, InjectionToken, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from '@ui/errors/control-error/control-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER, MatSelectModule } from '@angular/material/select';
import { IconComponent } from '@ui/images/icon.component';
import { BaseSelectComponent } from '@ui/selects/base-select.component';
import { debounceTime, from, map, Observable } from 'rxjs';
import { HDividerComponent } from '@ui/dividers/h-divider.component';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';
import { TranslatePipe } from 'i18n';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableSelectComponent),
      multi: true,
    },
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  ],
  imports: [
    CommonModule,
    ControlErrorComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    IconComponent,
    HDividerComponent,
    SkeletonLoaderComponent,
    TranslatePipe,
    OverlayModule,
  ],
  standalone: true,
})
export class SearchableSelectComponent<V> extends BaseSelectComponent<V> implements OnInit {
  searchControl = new FormControl('');
  search$!: Observable<string>;

  ngOnInit(): void {
    this.search$ = this.searchControl.valueChanges
      .pipe(debounceTime(150))
      .pipe(map(v => v?.toLowerCase() ?? ''));
  }

  show(search: string | null, display: string): boolean {
    return !search || display.toLowerCase().indexOf(search) !== -1;
  }
}
