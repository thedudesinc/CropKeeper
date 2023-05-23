import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  refreshGardenPlotList: Subject<boolean> = new Subject();
  gardenPlotListRefresh$: Observable<boolean> = this.refreshGardenPlotList.asObservable();
}
