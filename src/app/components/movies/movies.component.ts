import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  constructor(private moviesService: MoviesService){}

  movies?: Observable<any[]>;

  ngOnInit():void{
    this.movies = this.moviesService.movies$;
  }



  ngOnDestroy(): void {
    
  }
}
