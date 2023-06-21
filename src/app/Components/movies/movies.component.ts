import { Component  , Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GetdataService } from 'src/app/Servies/getdata.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  activeItem = new BehaviorSubject<any[]>([])  ;
  
  
  router:any;
  pageNum:number = 1;
  WantWatchIt:number[]=[];
  WatchedMovie:number[]=[];
  favorite:number[]=[];
  InputSearch:string="";
  genres:any[]=[
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    
  ]
  halfImg:string = 'http://image.tmdb.org/t/p/w500';
  TheMovies:any[]=[];
  constructor(private _GetdataService:GetdataService , private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    
    if(typeof this._ActivatedRoute.snapshot.paramMap.get('typeName') == 'string'){
      this.router = this._ActivatedRoute.snapshot.paramMap.get('typeName');
    }else{
      this.router = 'now_playing'
    }
   
    
      this.getMovies(this.router,1);
    
  }
  page(num:number){
    this.pageNum = num
    this.getMovies(this.router,num) 
    setTimeout(() => {
      this.GenresShow(num)
    }, 50); 
  }
  getMovies(type:string, num:number){
    if(type == 'trend'){
      this._GetdataService.getTrend('movie',num).subscribe({
        next:(res:any)=> this.TheMovies = res.results,
        error:(err)=> console.log(err)
      })
      this._GetdataService.getTrend('movie',num+1).subscribe({
        next:(res:any)=>{
          res.results.forEach((e:any)=> this.TheMovies.push(e))
        },
        error:(err)=> console.log(err)
      })
    }else{
      this._GetdataService.getdate('movie',type,num).subscribe({
        next:(res)=> {
         this.TheMovies = res.results
        },
        error:(err)=> console.log(err)
      })
      this._GetdataService.getdate('movie',type,num+1).subscribe({
        next:(res)=>{
          res.results.forEach((e:any)=> this.TheMovies.push(e))
        },
        error:(err)=> console.log(err)
      })
    }
    this.ActivePages(num);
  }
  
  GenresClick(){
    let item = document.querySelectorAll('.genre') as  NodeListOf<HTMLInputElement>;
        item.forEach(e=>{
          if(e.checked){
            e.classList.add('activeGenre')
          }else{
            e.classList.remove('activeGenre')

          }
        })
          this.GenresShow(this.pageNum)    
  }
  GenresShow(num:number){
    let idItem:any[]=[]
    this.activeItem.next(document.querySelectorAll('.activeGenre') as NodeListOf<HTMLInputElement> | any);
    this.activeItem.subscribe({
    })
      this.activeItem.subscribe({
        next:(res)=>{
          res.forEach(e=> idItem.push(e.id))
          //   if(res.length > 0){
          //     // action comedy
          //       res.forEach(e=>{
          //        this.TheMovies = this.TheMovies.filter(m=>{
          //         for(let i = 0 ; i < m.genre_ids.length; i++){
          //           if(m.genre_ids[i] == Number(e.id)){
          //             return m
          //           }
          //         }
          //       })
          //     })
          //   }else{
          //    this.getMovies(this.router,num)
          //   }
        }
      })
      if(idItem.length > 0){
        idItem.forEach(e=>{
          this.TheMovies = this.TheMovies.filter(m=>{
            for(let i = 0 ; i < m.genre_ids.length ; i++){
              if(m.genre_ids[i] == Number(e)){
                return m
              }
            }
          })
        })
      }
    console.log(idItem)
            // if(this.activeItem.length > 0){
            //   this.activeItem.forEach(s=>{
            //     this.TheMovies = this.TheMovies.filter(m=>{
            //     for(let i = 0 ; i < m.genre_ids.length; i++){
            //       if(m.genre_ids[i] == s.id){
            //         return m
            //       }
            //     }
            //   })
            //   })
            // }else{
            //   this.getMovies(this.router,num)
              
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
    } else{
      unit.forEach(e=> e.checked = false)
      active.classList.remove('activeItem')

      if(Input_id == "A"){
        if(this._GetdataService.Lists.Movies.WantWatchIt.indexOf(checkbox_id) > -1){
          this._GetdataService.Lists.Movies.WantWatchIt.splice(this._GetdataService.Lists.Movies.WantWatchIt.indexOf(checkbox_id),1)
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

}
