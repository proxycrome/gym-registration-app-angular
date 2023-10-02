import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string =
    'https://gym-registration-app-39938-default-rtdb.europe-west1.firebasedatabase.app';
  constructor(private http: HttpClient) {}

  postRegisteration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}/enquiry.json`, registerObj);
  }

  getRegisteredUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/enquiry.json`).pipe(
      map((data) => {
        let users: User[] = [];
        for (let key in data) {
          users.push({ ...data[key], id: key });
        }
        return users;
      })
    );
  }

  updateRegisterUser(registerObj: User, userId: string) {
    const { id, ...others } = registerObj;
    const userData = {
      [userId]: { ...others },
    };
    return this.http.put<User>(`${this.baseUrl}/enquiry.json`, userData);
  }

  deleteRegistered(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/enquiry/${id}.json`);
  }

  getRegisteredUserId(id: string) {
    return this.http.get<User>(`${this.baseUrl}/enquiry/${id}.json`);
  }
}
