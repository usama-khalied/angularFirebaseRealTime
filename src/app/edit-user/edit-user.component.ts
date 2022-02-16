import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  public editForm: FormGroup;
  userRef: any;

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      email: [''],
      contact: [''],
    });
  }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');

    this.userService.getUserDoc(id).subscribe((res) => {
      this.userRef = res;
      this.editForm = this.formBuilder.group({
        name: [this.userRef.name],
        email: [this.userRef.email],
        contact: [this.userRef.contact],
      });
    });
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');

    this.userService.updateUser(this.editForm.value, id);
    this.router.navigate(['list-users']);
  }
}
