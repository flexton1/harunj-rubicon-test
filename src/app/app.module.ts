import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './services/movies.service';
import { SeriesService } from './services/series.service';
import { MoviesDetailsComponent } from './components/movies/movies-details/movies-details.component';
import { SeriesDetailsComponent } from './components/tv-series/series-details/series-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TvSeriesComponent,
    MoviesComponent,
    SearchBarComponent,
    MoviesDetailsComponent,
    SeriesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [MoviesService, SeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
