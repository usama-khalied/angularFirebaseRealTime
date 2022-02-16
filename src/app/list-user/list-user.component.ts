import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  Users: User[];
  displayedColumns: string[] = ['name', 'email', 'contact', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserList().subscribe((res) => {
      this.Users = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as User),
        } as User;
      });
      this.dataSource = new MatTableDataSource<User>(this.Users);
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('After ivew Init');
  }

  removeUser = (user) => this.userService.deleteUser(user);
}
