import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalSelectCategoryComponent } from './components/journal-select-category/journal-select-category.component';
import { RouterModule } from '@angular/router';
import { routes } from '@journal/modules/landing/journal-landing.routes';
import { Head2Component } from '@ui/text/head2.component';
import { JournalSelectOptionComponent } from './components/journal-select-option/journal-select-option.component';
import { P2Component } from '@ui/text/p2.component';
import { IconComponent } from '@ui/images/icon.component';
import { P1Component } from '@ui/text/p1.component';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JournalLandingComponent } from '@journal/modules/landing/journal-landing.component';
import { BaseJournalSelectComponent } from './components/base-journal-select/base-journal-select.component';
import { JournalSelectPlugComponent } from './components/journal-select-plug/journal-select-plug.component';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';
import { DefaultStateDirective, LoadedStateDirective, StateMapperComponent } from 'state-mapper';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { ScheduleEditModule } from '@schedule/modules/schedule-edit/schedule-edit.module';
import { SkeletonPlugComponent } from '@shared/components/skeleton-plug/skeleton-plug.component';

@NgModule({
  declarations: [
    JournalLandingComponent,
    JournalSelectCategoryComponent,
    JournalSelectOptionComponent,
    BaseJournalSelectComponent,
    JournalSelectPlugComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Head2Component,
    P2Component,
    IconComponent,
    P1Component,
    TextInputComponent,
    ReactiveFormsModule,
    SkeletonLoaderComponent,
    StateMapperComponent,
    HasPermissionDirective,
    PrimaryContainerComponent,
    ScheduleEditModule,
    SkeletonPlugComponent,
    DefaultStateDirective,
    LoadedStateDirective,
  ],
})
export class JournalLandingModule {}
