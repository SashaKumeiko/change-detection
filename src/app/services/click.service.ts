import {Injectable, signal} from '@angular/core';
import {Observable, Subject} from "rxjs";

type User = {
  name: string
}

function equalFunc(a: User, b: User) {
  return JSON.stringify(a) === JSON.stringify(b)
}

@Injectable({
  providedIn: 'root'
})
export class ClickService {
  user: User = { name : "no name"}
  user$: Observable<User> = new Observable<User>();
  userSubject: Subject<User> = new Subject()
  userSig = signal<User>({ name : "initial property of object"},{
    equal: equalFunc
  })
  simpleValueSig = signal<string>("initial string")
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
