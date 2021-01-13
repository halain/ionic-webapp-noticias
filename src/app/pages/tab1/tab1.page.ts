import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;
 
   noticias: Article[] = [];

  constructor( private noticiasServices: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
    this.content.scrollToTop()
  }

  loadData(event: any){
    this.cargarNoticias( event );
  }


  cargarNoticias( event? ){
    this.noticiasServices.getTopHeadLines()
    .subscribe( resp => {
      if (resp.articles.length === 0){
        //cancelar infinitescroll
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push( ...resp.articles );
      if (event){
        //infinitescroll
        event.target.complete();
      }
    });
  }


}
