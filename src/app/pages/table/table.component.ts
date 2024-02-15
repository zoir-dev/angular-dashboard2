import { Component, OnInit } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import axios from 'axios';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MainLayout,
    NzTableModule,
    NgFor,
    NgIf,
    RouterLink,
    NzIconModule,
    NzDividerModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  listOfData: User[] = [];
  loading = false;

  constructor(private msg: NzMessageService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.loading = true;
      await axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((d) => (this.listOfData = d.data));
    } catch (error: any) {
      this.msg.error(error.message);
    } finally {
      this.loading = false;
    }
  }
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
