import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),provideAuth(()=>getAuth())
  ]
})
export class AppModule { }
