import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/Servies/getdata.service';

@Component({
  selector: 'app-home-series',
  templateUrl: './home-series.component.html',
  styleUrls: ['./home-series.component.scss']
})
export class HomeSeriesComponent implements OnInit{
  halfImg:string = 'http://image.tmdb.org/t/p/w500';
  movies:any[]=[];
  trend:any[]=[];
  type:string[]=['on_the_air','top_rated','popular']
  
  constructor(private _GetdataService:GetdataService){}
  ngOnInit(): void {
    for(let i = 0 ; i < this.type.length; i++){
      this._GetdataService.getdate('tv',this.type[i],1).subscribe({
        next:(res)=> this.movies[i] = res.results.slice(0,5)
      })
    }
    this._GetdataService.getTrend('tv',1).subscribe({
      next:(res:any)=> this.trend = res.results.slice(0,5),
      error:(err)=> console.log(err),
      complete:()=> console.log(this.trend)
    })
  }

  genress(id:Number):any {
    for(let item  of this._GetdataService.genresSeries){
      if(item["id"] == id){
        return item["name"]
      }
    }
  }
  year(date:any){
    return new Date(date).getFullYear();
  }
}
