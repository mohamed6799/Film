import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetdataService {
    Lists:any = {
      Movies:{
        WantWatchIt:[],
        Wanted:[],
        favorite:[]
      },
      Series:{
        WantWatchIt:[],
        Wanted:[],
        WatchNow:[],
        favorite:[]
      }
    }
    

    
      genresMovies:any[]= [
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
          "id": 99,
          "name": "Documentary"
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
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
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
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ]

      genresSeries:any[]= [
          {
            "id": 10759,
            "name": "Action & Adventure"
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
            "id": 99,
            "name": "Documentary"
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
            "id": 10762,
            "name": "Kids"
          },
          {
            "id": 9648,
            "name": "Mystery"
          },
          {
            "id": 10763,
            "name": "News"
          },
          {
            "id": 10764,
            "name": "Reality"
          },
          {
            "id": 10765,
            "name": "Sci-Fi & Fantasy"
          },
          {
            "id": 10766,
            "name": "Soap"
          },
          {
            "id": 10767,
            "name": "Talk"
          },
          {
            "id": 10768,
            "name": "War & Politics"
          },
          {
            "id": 37,
            "name": "Western"
          }
        ]




  constructor(private _HttpClient:HttpClient) { }
  getdate(m:string,type:string,page:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${m}/${type}?api_key=53a8bb497c96cf1250d55b6425391276&language=en-US&page=${page}`)
  }
  getTrend(type:string,page:number){
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=53a8bb497c96cf1250d55b6425391276&language=en-US&page=${page}`)
  }
  getCastToMovies(type:string,movieId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${type}/${movieId}?api_key=53a8bb497c96cf1250d55b6425391276&language=en-US&append_to_response=credits`)
  }
  getDetails(type:string,id:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=53a8bb497c96cf1250d55b6425391276&language=en-US`)
  }
  getGenres(type:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=53a8bb497c96cf1250d55b6425391276&language=en`)
  }
  
}
//'https://api.themoviedb.org/3/movie/movie_id?language=en-US'