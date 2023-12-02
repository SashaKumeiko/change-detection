import {Injectable, signal} from '@angular/core';
import {Observable, Subject} from "rxjs";

type User = {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class ClickService {
  user: User = { name : "no name"}
  user$: Observable<User> = new Observable<User>();
  userSubject: Subject<User> = new Subject()
  userSig = signal<User>({ name : "no name"})
  simpleValueSig = signal<string>("init value")
  constructor() {
    this.user$ = this.userSubject.asObservable()
  }
  setUserName(name: string) {
    this.user = { ...this.user, name: name}
  }

  setUserSignal(name: string) {
    this.userSig.update(user => ({ ...user, name: name}));
  }

  setSimpleSignal() {
    this.simpleValueSig.set("new value")
  }

  nextUser(name: string) {
    this.userSubject.next({ ...this.user, name: name})
  }
}
