import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModule } from '../models/users/users.module';

@Injectable()
export class UsersService {

  selectedUser: UsersModule; //Selecciona un usuario desde la clase o modulo UsersModule.
  user: UsersModule[]; //Almacena un array de usuarios
  readonly URL_API = ('http://localhost:3000/api/users');

  constructor(private http: HttpClient) { 
   this.selectedUser = new UsersModule();
  }

  getUsers(){
    return this.http.get(this.URL_API);
  }

  postUser(User: UsersModule){
    return this.http.post(this.URL_API, User);
  }

  putUser(User: UsersModule){
    return this.http.put(this.URL_API + `/${User._id}`, User);
  }

  deleteUser(_id: UsersModule){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
