import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apikey;
const apiURL = environment.apiUrl;

const headers = new HttpHeaders ({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriActual: string = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }


  private ejecutarQuery<T>( query: string){
    query = `${apiURL}${query}`
    return this.http.get<T>(query, {headers});
  }

  
  getTopHeadLines(){
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }


  getTopHeadLinesCategoria( categoria: string){
    if (this.categoriActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriActual = categoria
    }
      
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }

}
