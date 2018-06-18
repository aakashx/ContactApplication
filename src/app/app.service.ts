import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Info} from './app.interface';
import {groupInfo} from './app.interface';
import 'rxjs/add/operator/map';

const CONTACTS_API: string = 'http://localhost:3000/contacts';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }


  getContact(): Observable<Info[]> {
    return this.http
      .get('http://localhost:3000/contacts')
      .map((response: Info[]) => response);
  }

  getGroup(): Observable<groupInfo[]> {
    return this.http
      .get('http://localhost:3000/groups')
      .map((response: groupInfo[]) => response);
  }

  updateContact(contact: Info): Observable<Info> {
    return this.http
      .put(`${CONTACTS_API}/${contact.id}`, contact)
      .map((response: Info) => response);
  }

  deleteContact(contact: Info): Observable<Info> {
    return this.http
      .delete(`${CONTACTS_API}/${contact.id}`)
      .map((response: Info) => response);
  }


}
