import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController } from '@ionic/angular';

//plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article = null;
  @Input() indice:number = null;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService) { }

  ngOnInit() {}


  abrirNoticia(){
    //console.log('Noticia ', this.noticia.url);
    const browser = this.iab.create( this.noticia.url, '_system');
  }


  async lanzarMenu(){

    let guardarBorrarBoton;

    if (this.enFavoritos){//borrar de favoritos
      guardarBorrarBoton = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de Favorito');
          this.dataLocalService.borrarNoticiaFav(this.noticia);
        }
      }
    }else { //agregar a favorito
      guardarBorrarBoton = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.guardarNoticiaFav(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({
     
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
      guardarBorrarBoton,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  

  

}
