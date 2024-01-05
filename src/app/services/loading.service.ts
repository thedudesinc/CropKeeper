import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  changeLoadingVisible: Subject<boolean> = new Subject();
  isLoadingVisible$: Observable<boolean> =
    this.changeLoadingVisible.asObservable();
}
