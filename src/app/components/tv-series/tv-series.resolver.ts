import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, catchError, throwError, tap } from "rxjs";
import { MoviesService } from "src/app/services/movies.service";
import { SeriesService } from "src/app/services/series.service";

@Injectable({
    providedIn: 'root',
  })
  export class PopularSeriesResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
      private seriesService: SeriesService,
      private _router: Router,
      private spinner: NgxSpinnerService
     // private processService: ProcessService
    ) {}
  
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
  
    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<any> {
        this.spinner.show();
     // this.processService.appendProcess('get-playlist-details-resolver');
      return this.seriesService
        .getPopularSeries()
        .pipe(
          // Error here means the requested product is not available
         tap(() => this.spinner.hide()),
          catchError((error) => {
            this.spinner.hide();
            // Log the error
           // this.processService.removeProcess('get-playlist-details-resolver');
            console.error('greska', error);
  
            // this.uiService.handleErrorMessage(error);
  
            // Get the parent url
            const parentUrl = state.url
              .split('/')
              .slice(0, -1)
              .join('/');
  
            // Navigate to there
            this._router.navigateByUrl(parentUrl);
  
            // Throw an error
            return throwError(error);
          })
        );
    }
  }


  @Injectable({
    providedIn: 'root',
  })
  export class SeriesDetailsResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
      private seriesService: SeriesService,
      private _router: Router,
      private spinner: NgxSpinnerService
    //  private processService: ProcessService
    ) {}
  
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
  
    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<any> {
        this.spinner.show();
     // this.processService.appendProcess('get-playlist-details-resolver');
      return this.seriesService
        .getSeriesDetails(Number(route.paramMap.get('id')))
        .pipe(
          // Error here means the requested product is not available
          tap(() => {this.spinner.hide();}),
          catchError((error) => {
            // Log the error
            this.spinner.hide();
          //  this.processService.removeProcess('get-playlist-details-resolver');
            console.error('greska', error);
  
            // this.uiService.handleErrorMessage(error);
  
            // Get the parent url
            const parentUrl = state.url
              .split('/')
              .slice(0, -1)
              .join('/');
  
            // Navigate to there
            this._router.navigateByUrl(parentUrl);
  
            // Throw an error
            return throwError(error);
          })
        );
    }
  }
  