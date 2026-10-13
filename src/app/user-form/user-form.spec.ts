import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { UserInfoService } from '../user-info-service';
import { UserForm } from './user-form';

describe('UserForm', () => {
  let component: UserForm;
  let fixture: ComponentFixture<UserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserForm],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('requires both names and permits empty optional fields', () => {
    expect(component.userForm.invalid).toBeTrue();
    component.firstName.setValue('Jane');
    expect(component.userForm.invalid).toBeTrue();
    component.lastName.setValue('Doe');
    expect(component.userForm.valid).toBeTrue();
    component.firstName.setValue('');
    expect(component.userForm.invalid).toBeTrue();
  });

  it('accepts a blank phone or ten digits with nonzero first and fourth digits', () => {
    for (const phone of ['', '6135550123', '1001000000', '9999999999']) {
      component.phoneNumber.setValue(phone);
      expect(component.phoneNumber.valid).withContext(phone).toBeTrue();
    }
  });

  it('rejects incorrect phone lengths, prohibited zeroes, and nondigits', () => {
    for (const phone of ['613555012', '61355501234', '0135550123', '6130550123',
                         '613-555-0123', '613 5550123', '613abc0123', '          ']) {
      component.phoneNumber.setValue(phone);
      expect(component.phoneNumber.hasError('pattern')).withContext(phone).toBeTrue();
    }
  });

  it('validates email with Angular email rules', () => {
    for (const email of ['', 'jane@example.com', 'jane.doe+lab@example.ca']) {
      component.email.setValue(email);
      expect(component.email.valid).withContext(email).toBeTrue();
    }
    for (const email of ['invalid', 'jane@', '@example.com', 'jane doe@example.com']) {
      component.email.setValue(email);
      expect(component.email.hasError('email')).withContext(email).toBeTrue();
    }
  });

  it('shows required errors after interaction and blocks invalid submissions', () => {
    const router = TestBed.inject(Router);
    const navigate = spyOn(router, 'navigate').and.resolveTo(true);
    expect(fixture.nativeElement.querySelectorAll('[role="alert"]').length).toBe(0);

    component.onSubmit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('[role="alert"]').length).toBe(2);
    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBeTrue();
    expect(TestBed.inject(UserInfoService).getUserInfo()).toBeNull();
    expect(navigate).not.toHaveBeenCalled();
  });
});
