import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MoviesDetailsComponent } from './components/movies/movies-details/movies-details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsResolver, PopularMoviesResolver } from './components/movies/movies.resolvers';
import { SeriesDetailsComponent } from './components/tv-series/series-details/series-details.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { PopularSeriesResolver, SeriesDetailsResolver } from './components/tv-series/tv-series.resolver';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  enableTracing: false,
};

const routes: Routes = [
  // { path: '**', redirectTo: '/tv-series', pathMatch: 'full' },
  {
    path: 'tv-series', 
    component: TvSeriesComponent,
    resolve: {
      series: PopularSeriesResolver
    }
  },
  {
    path: 'tv-series/:id', 
    component: SeriesDetailsComponent,
    resolve: {
      serie: SeriesDetailsResolver
    }
  },
  {
    path: 'movies',
   component: MoviesComponent,
    resolve: {
      movies: PopularMoviesResolver
    }
},
{
  path: 'movies/:id',
 component: MoviesDetailsComponent,
  resolve: {
    movies: MovieDetailsResolver
  }
},
  {path: '**', redirectTo: 'tv-series', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
