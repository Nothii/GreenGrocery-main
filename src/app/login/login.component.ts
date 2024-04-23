import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';  // Make sure to import firebase auth

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('firebaseui').then((firebaseui) => {
        // Initialize FirebaseUI here
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        const uiConfig = {
          signInSuccessUrl: '/',
          signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ],
          tosUrl: '/terms',
          privacyPolicyUrl: '/privacy'
        };
        ui.start('#firebaseui-auth-container', uiConfig);
      });
    }
  }
}
