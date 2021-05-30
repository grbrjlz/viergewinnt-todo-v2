import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { config } from 'rxjs';
import { SERVER_URL } from '../../../environments/environment'

interface IToDoObj {
  title: string;
  description: string;
  id: string;
  isSelected: boolean;
}

interface IToDosObj {
  toDos: IToDoObj[];
}


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  //SERVER_URL = 'http://localhost:8000/';
  //baseUrl = 'https://viergewinnt-backend-dot-viergewinnt-ss21.ew.r.appspot.com/';

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl()
  });

  toDos: IToDosObj = {toDos: []};
  
  constructor(private client: HttpClient) { }
  
  ngOnInit(): void {
    this.getToDos();
  }

  getToDos(){
    this.client.get('Todos').subscribe(data => {
      this.toDos.toDos = (data as IToDosObj).toDos;
      console.log(this.toDos);
    });
  }

  clickItem(toDo: IToDoObj){
        console.log("PATCH")
        toDo.isSelected = !toDo.isSelected;
        this.client.patch('Todos', {value: toDo}).subscribe(res => {
          this.toDos.toDos = (res as IToDosObj).toDos;
          console.log(this.toDos.toDos);
        }, err => {
          console.log(err);
        });
    
  }

  save(){
    console.log("save", {value: this.form.value});
    this.client.post('Todos', {value: this.form.value}).subscribe(res => {
      this.toDos.toDos = (res as IToDosObj).toDos;
    }, err => {
      console.log(err);
    });
    this.form.reset();
  }

  reset(){
    this.form.reset();
    this.getToDos();
  }

  remove(){
    this.client.delete('Todos', undefined).subscribe(res => {
      this.toDos.toDos = (res as IToDosObj).toDos;
    }, err => {
      console.log(err);
    });
  }
  
}
