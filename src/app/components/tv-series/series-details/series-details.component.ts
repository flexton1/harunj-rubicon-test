import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss']
})
export class SeriesDetailsComponent implements OnInit {

serie: any;

  constructor(private seriesService: SeriesService,
    private location: Location){

  }


  ngOnInit(): void {
    this.seriesService.serie$
    .subscribe((serie) => {
      this.serie = serie;
    })
  }

  goBack(): void{
    this.location.back();
  }

}
