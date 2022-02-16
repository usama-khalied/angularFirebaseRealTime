import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      contact: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService.createUser(this.userForm.value);
    this.router.navigate(['list-users']);
  }
}
