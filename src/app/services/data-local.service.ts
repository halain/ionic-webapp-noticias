import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
              private toastController: ToastController) {
    this.cargarNoticiasFav();
   }

   async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  guardarNoticiaFav(noticia: Article){

    //conprobar si existe ya la noticia en el arreglo
    const existe = this.noticias.find( noti => noti.title === noticia.title);

    if  (!existe){
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias);
    }
    this.presentToast('Agregado a favoritos');
  }

  async cargarNoticiasFav(){
    const favoritos = await this.storage.get('favoritos');
    if (favoritos){
      this.noticias = favoritos;
    } 
  }


  borrarNoticiaFav(noticia: Article){
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos');
  }

}
