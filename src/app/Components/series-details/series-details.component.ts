import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetdataService } from 'src/app/Servies/getdata.service';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss']
})
export class SeriesDetailsComponent {
  halfImg:string = 'http://image.tmdb.org/t/p/w500';
  id:string|null = "";
  favorite:number[]=[]
  Details:any[]= []
  casts:any[]=[]
constructor(private _ActivatedRoute: ActivatedRoute , private _GetdataService:GetdataService){}
ngOnInit(): void {
  this.id = this._ActivatedRoute.snapshot.paramMap.get('id')
  this._GetdataService.getDetails('tv',Number(this.id)).subscribe({
    next:(res)=> this.Details.push(res),
    error:(err)=> console.log(err),
    complete:()=> console.log(this.Details)
  })
  this._GetdataService.getCastToMovies('tv',Number(this.id)).subscribe({
    next:(res)=> this.casts = res.credits.cast,
    error:(err)=> console.log(err),
    complete:()=> console.log(this.casts)
  })
}
funcList(checkbox_id:any , Input_id:string){
  let unit = document.querySelectorAll(`.I${checkbox_id}`) as NodeListOf<HTMLInputElement>;
  let active = <HTMLInputElement> document.getElementById(`${Input_id}${checkbox_id}`);
  
  if(active.checked){
    unit.forEach(e=> e.checked = false)
    active.checked = true;
    active.classList.add('activeItem')

    if(Input_id == "A"){
      if(this._GetdataService.Lists.Series.WantWatchIt.indexOf(checkbox_id) == -1){
        this._GetdataService.Lists.Series.Wanted.forEach((ele:any,index:any)=>{
          if(ele == checkbox_id){
            this._GetdataService.Lists.Series.Wanted.splice(index,1)
          }
        })
        this._GetdataService.Lists.Series.WatchNow.forEach((ele:any,index:any)=>{
          if(ele == checkbox_id){
            this._GetdataService.Lists.Series.WatchNow.splice(index,1)
          }
        })
        this._GetdataService.Lists.Series.WantWatchIt.push(checkbox_id)

      }
  
    }
    else if(Input_id == "C"){
      if(this._GetdataService.Lists.Series.WatchNow.indexOf(checkbox_id) == -1){
        this._GetdataService.Lists.Series.Wanted.forEach((ele:any,index:any)=>{
          if(ele == checkbox_id){
            this._GetdataService.Lists.Series.Wanted.splice(index,1)
          }
        })
        this._GetdataService.Lists.Series.WantWatchIt.forEach((ele:any,index:any)=>{
          if(ele == checkbox_id){
            this._GetdataService.Lists.Series.WantWatchIt.splice(index,1)
          }
        })
        this._GetdataService.Lists.Series.WatchNow.push(checkbox_id)
      }


      }
    
    else{
      if(this._GetdataService.Lists.Series.Wanted.indexOf(checkbox_id) == -1){
        this._GetdataService.Lists.Series.WantWatchIt.forEach((ele:any,index:any)=>{
          if(ele == checkbox_id){
            this._GetdataService.Lists.Series.WantWatchIt.splice(index,1)
          }
        })
        this._GetdataService.Lists.Series.WatchNow.forEach((ele:any,index:any)=>{
          if(ele == checkbox_id){
            this._GetdataService.Lists.Series.WatchNow.splice(index,1)
          }
        })
        this._GetdataService.Lists.Series.Wanted.push(checkbox_id)
      }
    }

  }
  else{
    unit.forEach(e=> e.checked = false)
    active.classList.remove('activeItem')

    if(Input_id == "A"){
      if(this._GetdataService.Lists.Series.WantWatchIt.indexOf(checkbox_id) > -1){
        this._GetdataService.Lists.Series.WantWatchIt.splice(this._GetdataService.Lists.Series.WantWatchIt.indexOf(checkbox_id),1)
      }
    }
    else if(Input_id == "C"){
      if(this._GetdataService.Lists.Series.WatchNow.indexOf(checkbox_id) > -1){
        this._GetdataService.Lists.Series.WatchNow.splice(this._GetdataService.Lists.Series.WatchNow.indexOf(checkbox_id),1)
      }
    }
    else{
      if(this._GetdataService.Lists.Series.Wanted.indexOf(checkbox_id) > -1){
        this._GetdataService.Lists.Series.Wanted.splice(this._GetdataService.Lists.Series.Wanted.indexOf(checkbox_id),1)
      }
    }
      
  }
console.log(this._GetdataService.Lists.Series.WantWatchIt,this._GetdataService.Lists.Series.Wanted , this._GetdataService.Lists.Series.WatchNow)
}
favoriteList(id:number){
  let fav = <HTMLInputElement> document.querySelectorAll(`.fav${id}`)[0];
  if(fav.checked){
          if(this._GetdataService.Lists.Series.favorite.every((e:any)=> e == id ? false : true)){
            this._GetdataService.Lists.Series.favorite.push(id)
          }
        }else{
          if(this._GetdataService.Lists.Series.favorite.some((e:any)=> e == id ? true : false)){
            this._GetdataService.Lists.Series.favorite.splice(this._GetdataService.Lists.Series.favorite.indexOf(id),1);
          }
        }
   console.log(this._GetdataService.Lists.Series.favorite)

}
}
