import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { Validators } from '@angular/forms';
import { LoginFormConfig } from '@user/modules/auth/components/login/login.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { provideTranslationSuffix } from 'i18n';
import { Observable } from 'rxjs';
import { UserLoginResponse } from '@shared/entities/user';
import { JwtService } from '@jwt/jwt.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [provideTranslationSuffix('login')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  formConfig: FormConfig<LoginFormConfig> = {
    elements: {
      login: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'login',
        },
        validators: [Validators.required],
      },
      password: {
        type: FormConfigElementTypes.PASSWORD,
        typeConfig: {
          label: 'password',
        },
        validators: [Validators.required],
      },
    },
  };
  options: SubmitOptions = {
    url: '/api/users/v1/login',
    method: 'POST',
    subscribe: false,
  };

  private jwtService = inject(JwtService);
  private userService = inject(UserService);

  onFormSubmit(response: Observable<UserLoginResponse>): void {
    response.subscribe(r => {
      this.jwtService.access = r.tokens.access;
      this.jwtService.refresh = r.tokens.refresh;

      this.userService.user$.next(r.user);
    });
  }
}
