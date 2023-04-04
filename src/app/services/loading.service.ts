import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoadingVisible: Subject<boolean> = new Subject();
  isLoadingVisible$: Observable<boolean> = this.isLoadingVisible.asObservable();
}
