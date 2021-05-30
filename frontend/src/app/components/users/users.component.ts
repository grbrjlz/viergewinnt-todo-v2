import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface IUserObj {
  username: string;
  password: string;
  isSelected: boolean;
}

interface IUsersObj {
  users: IUserObj[];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUsersObj  = { users: [] };

  constructor(private client: HttpClient) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  ngOnInit(): void {
    this.getUsers();

  }

  getUsers(){
    
    this.client.get('User').subscribe(data => {
      this.users.users = (data as IUsersObj).users;
      console.log(this.users);
    });
  }

  save(){
    console.log("save", {value: this.form.value});
    let user: IUserObj = {
      username: this.form.get('username')?.value, 
      password: this.form.get('password')?.value,
      isSelected: false}
    this.client.post('/User', {value: user}).subscribe(res => {
      this.users.users = (res as IUsersObj).users;
      console.log(this.users.users);
    }, err => {
      console.log(err);
    });
    this.form.reset();
  }

  clickItem(user: IUserObj){
    user.isSelected = !user.isSelected;
    this.client.patch('User', {value: user.username}).subscribe(res => {
      this.users.users = (res as IUsersObj).users;
    }, (err) => {
      console.log(err);
    });
  }

  remove(){
    this.client.delete('User', undefined).subscribe(res => {
      this.users.users = (res as IUsersObj).users;
    }, err => {
      console.log(err);
    });
  }
}
