import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './profile.routes';
import { ProfileComponent } from './components/profile/profile.component';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';
import { UserPreferencesComponent } from '@user/modules/profile/components/profile/user-preferences/user-preferences.component';
import { ProfileCardComponent } from './components/profile/profile-card/profile-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ImageComponent } from '@ui/images/image.component';
import { Head2Component } from '@ui/text/head2.component';
import { P1Component } from '@ui/text/p1.component';
import { SecondaryButtonComponent } from '@shared/modules/ui/components/buttons/secondary-button.component';
import { WarnButtonComponent } from '@shared/modules/ui/components/buttons/warn-button.component';
import { HDividerComponent } from '@ui/dividers/h-divider.component';
import { UrlComponent } from '@ui/text/url.component';
import { IconComponent } from '@ui/images/icon.component';
import { StudyPlaceInfoComponent } from './components/profile/study-place-info/study-place-info.component';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { EditProfileComponent } from '@user/modules/profile/dialogs/edit-profile/edit-profile.component';
import { CharacterComponent } from '@ui/images/character.component';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { provideTranslationSuffix } from 'i18n';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    UserPreferencesComponent,
    ProfileCardComponent,
    StudyPlaceInfoComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DefaultFormComponent,
    MatButtonModule,
    ImageComponent,
    Head2Component,
    P1Component,
    SecondaryButtonComponent,
    WarnButtonComponent,
    HDividerComponent,
    UrlComponent,
    IconComponent,
    PrimaryButtonComponent,
    CharacterComponent,
    PrimaryContainerComponent,
  ],
  providers: [provideTranslationSuffix('profile')],
})
export class ProfileModule {}
