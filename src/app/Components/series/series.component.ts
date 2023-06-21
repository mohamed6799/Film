import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetdataService } from 'src/app/Servies/getdata.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent {
  halfImg:string = 'http://image.tmdb.org/t/p/w500';
  InputSearch:string='';
  router:any;
  WantWatchIt:number[]=[];
  WatchedMovie:number[]=[];
  WatchNow:number[]=[]
  favorite:number[]=[]
  
  TheSeries:any[]=[];
  constructor(private _GetdataService:GetdataService , private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    if(typeof this._ActivatedRoute.snapshot.paramMap.get('typeName') == 'string'){
      this.router = this._ActivatedRoute.snapshot.paramMap.get('typeName');
    }else{
      this.router = 'on_the_air'
    }
   
    
      this.getMovies(this.router,1);
    
    
  }
  page(num:number){
    this.getMovies(this.router,num)   
   }
  getMovies(type:string,num:number){
    if(type == 'trend'){
      this._GetdataService.getTrend('tv',num).subscribe({
        next:(res:any)=> this.TheSeries = res.results,
        error:(err)=> console.log(err)
      })
      this._GetdataService.getTrend('tv',num+1).subscribe({
        next:(res:any)=>{
          res.results.forEach((e:any)=> this.TheSeries.push(e))
        },
        error:(err)=> console.log(err)
      })
    }else{
      this._GetdataService.getdate('tv',type,num).subscribe({
        next:(res)=> {
          this.TheSeries = res.results
          
        },
        error:(err)=> console.log(err)
      })
      this._GetdataService.getdate('tv',type,num+1).subscribe({
        next:(res)=>{
          // let x:any[] ;
          
          // let item = document.querySelectorAll('.genre') as NodeListOf <HTMLInputElement>;
          
          //   item.forEach(e=>{
          //     if(e.checked){
          //       x  = res.results.filter((m:any)=>{
          //         for(let i = 0 ; i < m.genre_ids.length ; i++ ){
          //           if(m.genre_ids[i] == e.id){
          //             return  m
          //           }
          //         }
          //       })
          //     }else{
          //       x = res.results
          //     }
          //   })
          // setTimeout(() => {
          //   x.forEach((e:any)=> this.TheSeries.push(e))
          // }, 500);
          res.results.forEach((e:any)=> this.TheSeries.push(e))
        },
        error:(err)=> console.log(err)
      })
    }
    this.ActivePages(num)

  }
  
  ActivePages(num:number):void{
  let lis = document.querySelectorAll(".pages ul li");
lis.forEach(e=>{
  if(e.classList[0] == "active"){
    e.classList.remove('active')
  }
})
lis.forEach(()=>{
  lis[((num+1)/2)-1].classList.add('active');
})
}
   GenresClick(genreId:number){
      let item = <HTMLInputElement> document.querySelectorAll(`.C${genreId}`)[0];
        // if(item.checked){
        //   this.GenresPipes.push(genreId)
        // }else{
        //   this.GenresPipes.forEach(e=> {
        //     if(e == genreId){
        //       this.GenresPipes.splice(this.GenresPipes.indexOf(e),1)
        //     }
        //   });
        // }
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
// console.log(this._GetdataService.Lists.Series.WantWatchIt,this._GetdataService.Lists.Series.Wanted , this._GetdataService.Lists.Series.WatchNow)
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
  // console.log(this._GetdataService.Lists.Series.favorite)

}
}
