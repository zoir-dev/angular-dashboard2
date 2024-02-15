import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  drawer: boolean = false;
  constructor() {}
}
