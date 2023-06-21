import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { GetdataService } from 'src/app/Servies/getdata.service';

@Component({
  selector: 'app-home-movies',
  templateUrl: './home-movies.component.html',
  styleUrls: ['./home-movies.component.scss']
})
export class HomeMoviesComponent implements OnInit{
  
  halfImg:string = 'http://image.tmdb.org/t/p/w500';
  movies:any[]=[];
  trend:any[]=[];
  
  type:string[]=['now_playing','popular','top_rated','upcoming']
  constructor(private _GetdataService:GetdataService,private _HttpClient:HttpClient){}
  ngOnInit(): void {
    for(let i = 0 ; i < this.type.length; i++){
      this._GetdataService.getdate('movie',this.type[i],1).subscribe({
        next:(res:any)=> this.movies[i] = res.results.slice(0,5),
        complete:()=> console.log(this.movies[i])
      })
    }
    this._GetdataService.getTrend('movie',1).subscribe({
      next:(res:any)=> this.trend = res.results.slice(0,5)
    })
  }

  // favorite(id:any,letter:string){
  //   if(this._GetdataService.Lists.Movies.favorite.indexOf(Number(id)) == -1){
  //     this._GetdataService.Lists.Movies.favorite.push(Number(id))
      
  //   }else{
  //     this._GetdataService.Lists.Movies.favorite.splice(this._GetdataService.Lists.Movies.favorite.indexOf(Number(id)),1)
  //   }
  //   console.log(this._GetdataService.Lists.Movies.favorite)
  // }
  genress(id:Number):any {
    for(let item  of this._GetdataService.genresMovies){
      if(item["id"] == id){
        return item["name"]
      }
    }
  }
  year(date:any){
    return new Date(date).getFullYear();
  }
}

