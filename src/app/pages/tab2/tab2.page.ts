import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment,  { static: true } ) segment: IonSegment;

  categorias: string[] = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasServices: NoticiasService) {}


  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticiasByCategoria(this.segment.value);
  }


  loadData(event: any){
    this.cargarNoticiasByCategoria(this.segment.value, event );
  }

  cambioCategoria(event: any){
    this.noticias = [];
    this.cargarNoticiasByCategoria(event.detail.value);       
  }

  

  cargarNoticiasByCategoria(categoria: string, event?){
    this.noticiasServices.getTopHeadLinesCategoria(categoria)
    .subscribe( resp => {
      if (resp.articles.length>0){
        this.noticias.push(...resp.articles);
      }
      if (event){
        event.target.complete();
        //event.target.disabled=(resp.articles.length==0);
      }
    })
  }

}
