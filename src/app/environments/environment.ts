import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from "../app-routing.module";
import { provideFirebaseApp } from "@angular/fire/app";
import { initializeApp } from "firebase/app";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore())
    )
  ]
};


export const environment = {
    production: true,
    firebase: {
      apiKey: "AIzaSyAdaUcwrlQOpaXFQGZf-f4PFTa8kVLIbxw",
      authDomain: "goodfellas-green-grocery-698a9.firebaseapp.com",
      projectId: "goodfellas-green-grocery-698a9",
      storageBucket: "goodfellas-green-grocery-698a9.appspot.com",
      messagingSenderId: "330964039954",
      appId: "1:330964039954:web:afbadbd115e671c16cdbcb",
      measurementId: "G-C2C13ZBFPF"
    }
  };
  