import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { url } from 'node:inspector';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  supabaseUrl = "digite aqui a url base da sua tabela do supabase";
  supabaseKey = "digite aqui a key da sua tabela do supabase";
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey)
  }

  async addTodo(todo: Todo) { //adicionando objetos
    const { data, error } = await this.supabase.from<Todo>('todos').insert(todo);
    return { data, error }
  }

  async getTodos(){ //método get (listar objetos)
    const {data, error} = await this.supabase.from<Todo>('todos').select('*').limit(10) //dando select na tabela / ('*') ->pegando todos os campos / limit(10)->limitando a 10 objetos
    return {data, error}

  }

  //método atualizar
  async update(todo: Todo){
    const {data, error} = await this.supabase.from<Todo>('todos').update(todo).match({id: todo.id}); //pegando objeto por id
    return {data, error};
  }

  //método excluir
  async deleteTodo(todo: Todo){
    const {data, error} = await this.supabase.from<Todo>('todos').delete().match({id: todo.id});
    return{data, error}
  }
}
