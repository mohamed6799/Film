import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetdataService } from 'src/app/Servies/getdata.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {
  halfImg:string = 'http://image.tmdb.org/t/p/w500';
  id:string|null = "";
  Details:any[]= []
  casts:any[]= [];
constructor(private _ActivatedRoute: ActivatedRoute , private _GetdataService:GetdataService){}
ngOnInit(): void {
  this.id = this._ActivatedRoute.snapshot.paramMap.get('id')
  this._GetdataService.getDetails('movie',Number(this.id)).subscribe({
    next:(res)=> {
      this.Details.push(res);
      console.log(res)
    },
    error:(err)=> console.log(err)
  })
  this._GetdataService.getCastToMovies('movie',Number(this.id)).subscribe({
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
      if(this._GetdataService.Lists.Movies.WantWatchIt.indexOf(checkbox_id) == -1){
        this._GetdataService.Lists.Movies.Wanted.forEach((ele:any,index:any)=>{
          if(ele == checkbox_id){
            this._GetdataService.Lists.Movies.Wanted.splice(index,1)
          }
        })
        this._GetdataService.Lists.Movies.WantWatchIt.push(checkbox_id)

      }
    }else{
      if(this._GetdataService.Lists.Movies.Wanted.indexOf(checkbox_id) == -1){
        this._GetdataService.Lists.Movies.WantWatchIt.forEach((ele:any,index:any)=>{
          if(ele == checkbox_id){
            this._GetdataService.Lists.Movies.WantWatchIt.splice(index,1)
          }
        })
        this._GetdataService.Lists.Movies.Wanted.push(checkbox_id)
      }
    }
  }else{
    unit.forEach(e=> e.checked = false)
    active.classList.remove('activeItem')

    if(Input_id == "A"){
      if(this._GetdataService.Lists.Movies.WantWatchIt.indexOf(checkbox_id) > -1){
        this._GetdataService.Lists.Movies.WantWatchIt.splice(this._GetdataService.Lists.Movies.WantWatchIt.indexOf(checkbox_id))
      }
    }else{
      if(this._GetdataService.Lists.Movies.Wanted.indexOf(checkbox_id) > -1){
        this._GetdataService.Lists.Movies.Wanted.splice(this._GetdataService.Lists.Movies.Wanted.indexOf(checkbox_id),1)
      }
    }
    
      
  }
console.log(this._GetdataService.Lists.Movies.WantWatchIt,this._GetdataService.Lists.Movies.Wanted)
}
favoriteList(id:number){
let fav = <HTMLInputElement> document.querySelectorAll(`.fav${id}`)[0];
if(fav.checked){
        if(this._GetdataService.Lists.Movies.favorite.every((e:any)=> e == id ? false : true)){
          this._GetdataService.Lists.Movies.favorite.push(id)
        }
      }else{
        if(this._GetdataService.Lists.Movies.favorite.some((e:any)=> e == id ? true : false)){
          this._GetdataService.Lists.Movies.favorite.splice(this._GetdataService.Lists.Movies.favorite.indexOf(id),1);
        }
      }
console.log(this._GetdataService.Lists.Movies.favorite)

}

}