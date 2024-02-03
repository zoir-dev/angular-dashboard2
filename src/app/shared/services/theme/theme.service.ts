import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnInit {
  darkMode: boolean = false;

  darkMode$ = new BehaviorSubject<boolean>(this.darkMode);
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    this.darkMode = JSON.parse(localStorage.getItem('theme') || 'true');
    this.darkMode$.next(this.darkMode);
  }

  changeMode(val: any) {
    localStorage.setItem('theme', val);
    this.darkMode$.next(val);
    if (val) {
      this.doc.body.classList.add('dark');
    } else {
      this.doc.body.classList.remove('dark');
    }
  }
}
