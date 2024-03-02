import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { JournalCategory, JournalOption } from '@journal/modules/landing/entities/options';
import { FormControl } from '@angular/forms';
import { JournalOptionsSearchService } from '@journal/modules/landing/services/journal-options-search.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-base-journal-select',
  templateUrl: './base-journal-select.component.html',
  styleUrls: ['./base-journal-select.component.scss'],
  providers: [provideTranslationSuffix('select')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalSelectComponent implements OnInit, OnDestroy {
  @Input({ alias: 'data', required: true }) categories!: JournalCategory[];

  searchControl = new FormControl<string>('');

  private searchService = inject(JournalOptionsSearchService);
  private router = inject(Router);
  private searchSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.searchSubscription = this.searchService.registerSearch(this.searchControl.valueChanges);
  }

  onSelect(option: JournalOption): void {
    this.router
      .navigate(['journal', 'view'], {
        queryParams: {
          teacherID: option.teacher.id,
          subjectID: option.subject.id,
          groupID: option.group.id,
        },
      })
      .then();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
