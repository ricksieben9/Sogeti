// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {
//
//   constructor() { }
// }
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

interface User {
  name: string
}

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4001/api/v1/users/')
  }

  getUser(name: string): Observable<User> {
    return this.http.get<User>('http://localhost:4001/api/v1/users/' + name)
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:4001/api/v1/users/data/', user)
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>(
      'http://localhost:8000/api/cats/' + user.name,
      user
    )
  }

  deleteUser(name: string) {
    return this.http.delete('http://localhost:4001/api/v1/users/' + name)
  }
}
