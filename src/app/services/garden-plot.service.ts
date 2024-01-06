import { Injectable } from '@angular/core';
import {
  GardenPlotOutput,
  GardenPlotPartialInput,
} from './models/garden-plot.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GardenPlotService {
  private baseUrl = environment.baseUrl + '/gardenPlot';

  constructor(private http: HttpClient) {}

  getGardenPlot(gardenPlotId: string): Observable<GardenPlotOutput> {
    return this.http.get<GardenPlotOutput>(this.baseUrl + '/' + gardenPlotId);
  }

  getAllGardenPlots(): Observable<GardenPlotOutput[]> {
    return this.http.get<GardenPlotOutput[]>(this.baseUrl);
  }

  getGardenPlotsByUserId(userId: string): Observable<GardenPlotOutput[]> {
    return this.http.get<GardenPlotOutput[]>(
      this.baseUrl + '/getByUserId/' + userId
    );
  }

  create(gardenPlot: GardenPlotPartialInput): Observable<GardenPlotOutput> {
    return this.http.post<GardenPlotOutput>(this.baseUrl, gardenPlot);
  }

  update(gardenPlot: GardenPlotPartialInput): Observable<GardenPlotOutput> {
    return this.http.put<GardenPlotOutput>(
      this.baseUrl + '/' + gardenPlot.id,
      gardenPlot
    );
  }

  delete(gardenPlotId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + gardenPlotId);
  }
}
