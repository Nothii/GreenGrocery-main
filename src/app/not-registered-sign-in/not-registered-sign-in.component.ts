import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-not-registered-sign-in',
  templateUrl: './not-registered-sign-in.component.html',
  styleUrls: ['./not-registered-sign-in.component.css']
})
export class NotRegisteredSignInComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  signup() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Registration successful:', userCredential.user);
        })
        .catch((error) => {
          console.error('Registration error:', error);
        });
    } else {
      console.log('Form is not valid');
    }
  }

  onlyNumbersAllowed(event: KeyboardEvent): boolean {
    const nonPrintableKeys = ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace', 'Tab', 'Enter'];

    if (nonPrintableKeys.includes(event.key) || (event.ctrlKey && ['v', 'c', 'x'].includes(event.key))) {
      return true;
    }

    if (!event.key.match(/^[0-9]$/)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
