import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todo: Todo;
  todos: Todo[];
  actionLabel: String;

  constructor(private api: ApiService){}

  ngOnInit() {
    this.clear();

    //listando objetos
    this.api.getTodos().then((payload)=>{
      this.todos = payload.data;
    })
  }

  clear(){
    this.todo = new Todo();
    this.actionLabel = "ADD";

  }

  
  //adicionando objetos
  addTodo(){ 
    if(this.todo.id){
      this.update();
      return;
    }
    this.api.addTodo(this.todo).then((payload)=>{
    this.todos.push(payload.data[0]); //adicionando na lista e dando refresh automatico
    this.clear();
    })
  }

  seleciona(todo: Todo){ //método para selecionar o objeto
    this.todo = todo;
    this.actionLabel = "UPDATE";
  }

  //método atualizar
  update(){
    this.api.update(this.todo).then(()=>{
      let index = this.todos.findIndex(t=> t.id == this.todo.id);
      this.todos[index] = this.todo;
      this.clear();
    })
  }
  check(todo: Todo){
    this.todo = todo;
    this.todo.done = !todo.done
    this.update();
  }

  //métodos excluir
  arrayRemove(arry: Todo[], id:string){
    return arry.filter((ele)=>ele.id !=id);
  }
  delete(todo:Todo){
    this.api.deleteTodo(todo).then((dado)=> this.todos = this.arrayRemove(this.todos, todo.id));
  }



}
