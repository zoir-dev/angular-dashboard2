import { Inject } from '@angular/core';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithPopup } from 'firebase/auth';
interface thisProps {
  // signWithPopup:()=>void
}
export class Auths implements thisProps {
  constructor(private auth: Auth) {}
}
const auth = Inject(Auth);

export function signWithPopup() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}
