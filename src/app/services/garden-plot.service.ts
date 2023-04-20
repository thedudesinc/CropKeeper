import { Injectable } from '@angular/core';
import { GardenPlotOutput } from './models/garden-plot.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GardenPlotService {
  private baseUrl = environment.baseUrl + '/gardenPlot/';

  constructor(private http: HttpClient) { }

  getGardenPlot(gardenPlotId: string): Observable<GardenPlotOutput> {
    return this.http.get<GardenPlotOutput>(this.baseUrl + gardenPlotId);
  }
}
