import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {

  movie: any;

  constructor(private moviesService: MoviesService,
    private location: Location){

  }


  ngOnInit(): void {
    this.moviesService.movie$
    .subscribe((movie) => {
      this.movie = movie;
    })
  }

  goBack(): void{
    this.location.back();
  }


}
