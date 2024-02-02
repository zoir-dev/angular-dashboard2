import { DOCUMENT } from '@angular/common';
import { HostBinding, Inject, Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {
  darkMode: boolean = true

  darkMode$ = new BehaviorSubject<boolean>(this.darkMode)
  constructor(@Inject(DOCUMENT) private doc:Document) {
  }

  ngOnInit(): void {
    this.darkMode = JSON.parse(localStorage.getItem('theme') || 'false')
    this.darkMode$.next(this.darkMode)
  }

  changeMode(val: any) {
    localStorage.setItem('theme', val)
    this.darkMode$.next(val)
    if(val){
      this.doc.body.classList.add('dark')
    }else{
      this.doc.body.classList.remove('dark')
    }
  }
}
