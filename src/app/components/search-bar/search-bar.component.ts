import { ReturnStatement } from '@angular/compiler';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, skip, debounceTime, Subject } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Input() mode!: 'series' | 'movies';
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>;

  searchInputControl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private moviesService: MoviesService,
    private seriesService: SeriesService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.router.events
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() : void => {
      this.loadSearchString();
    })

    this.searchInputControl.valueChanges
    .pipe(
      takeUntil(this._unsubscribeAll),
      skip(2),
      debounceTime(300)
    )
    .subscribe((query: string): void => {
      if(!query || query.length < 3) {
        
        if(this.mode === 'movies'){
        this.moviesService.getPopularMovies()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe();
        this.moviesService.setSearchQuery('');
      }else{
        this.seriesService.getPopularSeries()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe();
        this.seriesService.setSearchQuery('');
      }
        return;
      }
      if(this.mode === 'movies'){
        this.isLoading.emit(true);
        this.moviesService.setSearchQuery(query);
        this.moviesService.searchMovies(query)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((): void => {
          this.isLoading.emit(false);
        })
      }else{
        this.seriesService.setSearchQuery(query);
        this.seriesService.searchSeries(query)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((): void => {

        })
      }
    })

  }



  loadSearchString(): void{
    if(this.mode === 'movies'){
        if(this.moviesService.getSearchQuery() != ''){
          this.moviesService.searchMovies(this.moviesService.getSearchQuery())
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((): void => {
            this.searchInputControl.patchValue(this.moviesService.getSearchQuery())
          })
      }
    }else{
      if(this.seriesService.getSearchQuery() != ''){
        this.seriesService.searchSeries(this.seriesService.getSearchQuery())
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((): void =>{
          this.searchInputControl.patchValue(this.seriesService.getSearchQuery())
        })
    }
    }
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
