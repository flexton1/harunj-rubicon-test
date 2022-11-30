import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class SeriesService {

    tokenPath: string = `url`;

    token: string = 
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjE2M2Y3ZjVhYmRmNWU3NWM3YmNmOWNkNDg5N2IyNSIsInN1YiI6IjYzODYwMzAxNWVkOGU5MDA4NmFjNzY3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PpeDubf2PEW3vyjduUn-rrCdhHC_-8NnrP3dFdzdiQI';

    private searchQuery: string = '';
    public setSearchQuery(value: string) {
      this.searchQuery = value;
    }
    public getSearchQuery(): string {
      return this.searchQuery;
    }

    private _series: BehaviorSubject<any | null> =
      new BehaviorSubject(null);
    get series$(): Observable<any[]> {
      return this._series.asObservable();
    }

    private _serie: BehaviorSubject<any | null> =
    new BehaviorSubject(null);
  get serie$(): Observable<any> {
    return this._serie.asObservable();
  }
    
    constructor(private http: HttpClient)
    {}

    private setHeaders(): HttpHeaders {
        const headersConfig = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.token,
        };
        return new HttpHeaders(headersConfig);
      }


      getPopularSeries(): Observable<any>{
        return this.http.get(
            `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`,
            { headers: this.setHeaders() }
        ).pipe(
            tap((response: any) => {
                //there is no page size in api docs
                this._series.next(response.results.slice(0, 12));
            })
        )
      }

      searchSeries(query: string): Observable<any>{
        let split_query: string[] = query.split(" ");
        let searchString: string = "";
        for(let i = 0; i<split_query.length; i++){
            searchString = searchString + (i === 0 ? split_query[i] : '+' + split_query[i]);
        }
        return this.http.get(
            `https://api.themoviedb.org/3/search/tv?query=` + searchString,
            { headers: this.setHeaders() }
        ).pipe(
            tap((response: any) => {
                //there is no page size in api docs
                this._series.next(response.results.slice(0, 12));
            })
        )


      }

      getSeriesDetails(id: number): Observable<any>{
        return this.http.get(
            `https://api.themoviedb.org/3/tv/` + id + '?language=en-US',
            { headers: this.setHeaders() }
        ).pipe(
            tap((response: any) => {
                //there is no page size in api docs
                this._serie.next(response);
            })
        )
      }

    


  }