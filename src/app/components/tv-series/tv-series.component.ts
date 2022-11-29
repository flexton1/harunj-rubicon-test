import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss']
})
export class TvSeriesComponent implements OnInit, OnDestroy {

  constructor(private seriesService: SeriesService){}

  series?: Observable<any[]>;

  ngOnInit():void{
    this.series = this.seriesService.series$;
  }



  ngOnDestroy(): void {
    
  }
}