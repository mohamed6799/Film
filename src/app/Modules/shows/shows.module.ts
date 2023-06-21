import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../Components/home/home.component';
import { MoviesComponent } from '../../Components/movies/movies.component';
import { SeriesComponent } from '../../Components/series/series.component';
import { HomeMoviesComponent } from '../../Components/home-movies/home-movies.component';
import { HomeSeriesComponent } from '../../Components/home-series/home-series.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from '../../Components/shows/shows.component';
import { FormsModule } from '@angular/forms';
import { InputSearchPipe } from '../../pipes/InputSearch/input-search.pipe';
import { MoviesDetailsComponent } from '../../Components/movies-details/movies-details.component';
import { SeriesDetailsComponent } from '../../Components/series-details/series-details.component';
import { DescPipe } from 'src/app/pipes/desc.pipe';

const routes:Routes = [
  {path:"",component:ShowsComponent,children:[
    {path:"",redirectTo:"home",pathMatch:'full'},
    {path:"home",component:HomeComponent,children:[
      {path:"",redirectTo:"movies",pathMatch:"full"},
    {path:"movies",component:HomeMoviesComponent},
    {path:"series",component:HomeSeriesComponent}
  ]},
  {path:'movies',component:MoviesComponent},
  {path:'series',component:SeriesComponent },
  {path:'movies/:typeName',component:MoviesComponent},
  {path:'series/:typeName',component:SeriesComponent },
  {path:'movieDetails/:id',component:MoviesDetailsComponent},
  {path:'serieDetails/:id',component:SeriesDetailsComponent}
  ]}
]

@NgModule({
  declarations: [
    HomeComponent,
    MoviesComponent,
    SeriesComponent,
    HomeMoviesComponent,
    HomeSeriesComponent,
    ShowsComponent,
    InputSearchPipe,
    DescPipe,
    MoviesDetailsComponent,
    SeriesDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ShowsModule { }
