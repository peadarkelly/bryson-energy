import { FormGroup } from '@angular/forms'

export class PasswordMatcher {

  static MatchPassword(AC: FormGroup): null {
    const password: string = AC.get('password').value
    const confirmPassword: string = AC.get('confirmPassword').value

    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ matchPassword: true })
    }

    return null
  }
}
