import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup,  NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form'
import { NzInputModule} from 'ng-zorro-antd/input'
import { NzDividerModule} from 'ng-zorro-antd/divider'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { capitalizeWord } from '../../../shared/functions/capitalize';

@Component({
  selector: 'app-auth',
  standalone:true,
  imports:[NzFormModule,NzInputModule,NzButtonModule,ReactiveFormsModule,NgIf,RouterLink,NzDividerModule,NzIconModule,AsyncPipe],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  @Input() type!:string
  @Input() sign!:boolean

  validateForm: FormGroup<{
    userName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]],
  });

  loading$=new BehaviorSubject<boolean>(false)

  constructor(private fb: NonNullableFormBuilder,private auth:Auth,private router:Router,private msg:NzMessageService,private authService:AuthService) {}

  async submitForm() {
    if (this.sign?this.validateForm.valid:(this.validateForm.controls.email.valid&&this.validateForm.controls.password.valid)) {
      if(this.sign){
        try {
          this.loading$.next(true)
          await createUserWithEmailAndPassword(this.auth,this.validateForm.value.email||'',this.validateForm.value.password||'')
          .then(d=>{
            updateProfile(d.user,{displayName:capitalizeWord(this.validateForm.value.userName)})
            .then(()=>this.authService.userInfo$.next({name:d.user.displayName,email:d.user.email,img:''}))})
            this.msg.success('Successfully authed')
            this.router.navigate([''])
          } catch (error:any) {
            this.msg.error(error.message)
          }finally{
            this.loading$.next(false)
          }
        }else{
          try {
            this.loading$.next(true)
            await signInWithEmailAndPassword(this.auth,this.validateForm.value.email||'',this.validateForm.value.password||'')
            this.msg.success('Successfully authed')
            this.router.navigate([''])
          } catch (error:any) {
            this.msg.error(error.message)
          }finally{
            this.loading$.next(false)
          }
      }

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async withGoogle(){
    try {
      const provider=new GoogleAuthProvider()
      await signInWithPopup(this.auth,provider)
      this.msg.success('Successfully authed')
      this.router.navigate(['/'])

    } catch (error:any) {
      this.msg.error(error.message)
    }finally{
    }
  }

  getError(name:'userName'|'email'|'password'){
    if(name){
      return this.validateForm.controls[name].hasError('required')?`${name.slice(0,1).toUpperCase()+name.slice(1)} is required`:(this.validateForm.controls[name].hasError('email')?`Should be email`:'')
    }
    return ''
  }
}
