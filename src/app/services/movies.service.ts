import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  export class MoviesService {

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

    private _movies: BehaviorSubject<any | null> =
      new BehaviorSubject(null);
    get movies$(): Observable<any[]> {
      return this._movies.asObservable();
    }

    private _movie: BehaviorSubject<any | null> =
      new BehaviorSubject(null);
    get movie$(): Observable<any[]> {
      return this._movie.asObservable();
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

      getPopularMovies(): Observable<any>{
        return this.http.get(
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
            { headers: this.setHeaders() }
        ).pipe(
            tap((response: any) => {
                //there is no page size in api docs
                this._movies.next(response.results.slice(0, 12));
            })
        )
      }

      searchMovies(query: string): Observable<any>{
        let split_query: string[] = query.split(" ");
        let searchString: string = "";
        for(let i = 0; i<split_query.length; i++){
            searchString = searchString + (i === 0 ? split_query[i] : '+' + split_query[i]);
        }
        return this.http.get(
            `https://api.themoviedb.org/3/search/movie?query=` + searchString,
            { headers: this.setHeaders() }
        ).pipe(
            tap((response: any) => {
                //there is no page size in api docs
                this._movies.next(response.results.slice(0, 12));
            })
        )


      }


      getMovieDetails(id: number): Observable<any>{
        return this.http.get(
            `https://api.themoviedb.org/3/movie/` + id + '?language=en-US',
            { headers: this.setHeaders() }
        ).pipe(
            tap((response: any) => {
                //there is no page size in api docs
                this._movie.next(response);
            })
        )
      }

  }