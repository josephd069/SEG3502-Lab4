import {Component, inject} from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {UserInfoService} from '../user-info-service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {
  private builder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private userInfoService: UserInfoService = inject(UserInfoService);

  userForm = this.builder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.pattern('[1-9][0-9]{2}[1-9][0-9]{6}')],
    email: ['', Validators.email]
  });

  get firstName(): AbstractControl<string> {return this.userForm.controls.firstName; }
  get lastName(): AbstractControl<string> {return this.userForm.controls.lastName; }
  get phoneNumber(): AbstractControl<string> {return this.userForm.controls.phoneNumber; }
  get email(): AbstractControl<string> {return this.userForm.controls.email; }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.userInfoService.setUserInfo(this.userForm.getRawValue());
    this.router.navigate(['/user-result']).then(() => {});
  }
}
