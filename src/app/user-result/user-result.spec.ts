import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { UserForm } from '../user-form/user-form';
import { UserResult } from './user-result';

describe('UserResult', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserResult],
      providers: [provideRouter([
        {path: 'user-form', component: UserForm},
        {path: 'user-result', component: UserResult}
      ])]
    }).compileComponents();
  });

  it('handles visiting the results page without a submission', () => {
    const fixture: ComponentFixture<UserResult> = TestBed.createComponent(UserResult);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No information has been submitted.');
    expect(fixture.nativeElement.querySelector('table')).toBeNull();
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('/user-form');
  });

  it('routes a valid form submission to a table containing all four values', async () => {
    const harness = await RouterTestingHarness.create();
    const form = await harness.navigateByUrl('/user-form', UserForm);
    form.userForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '6135550123',
      email: 'jane@example.com'
    });
    harness.detectChanges();
    harness.routeNativeElement!.querySelector('form')!.dispatchEvent(new Event('submit'));
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/user-result');
    const values = Array.from(harness.routeNativeElement!.querySelectorAll('tbody td'))
      .map(cell => cell.textContent!.trim());
    expect(values).toEqual(['Jane', 'Doe', '6135550123', 'jane@example.com']);
  });

  it('displays a submission with the optional fields empty', async () => {
    const harness = await RouterTestingHarness.create();
    const form = await harness.navigateByUrl('/user-form', UserForm);
    form.userForm.setValue({firstName: 'Jane', lastName: 'Doe', phoneNumber: '', email: ''});
    form.onSubmit();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/user-result');
    const values = Array.from(harness.routeNativeElement!.querySelectorAll('tbody td'))
      .map(cell => cell.textContent!.trim());
    expect(values).toEqual(['Jane', 'Doe', 'Not provided', 'Not provided']);
  });
});
