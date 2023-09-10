import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; 
import { ToastController } from '@ionic/angular'; 
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '', '')
  
    this.usuario.setUsuario('atorres@duocuc.cl', '1234', '¿Cuál es tu animal favorito?', 'gato', 'Ana', 'Torres');
    this.usuario.setUsuario('avalenzuela@duocuc.cl', '5678', '¿Cuál es el nombre de tu mejor amigo?', 'juanito', 'Alberto', 'Valenzuela');
    this.usuario.setUsuario('cfuentes@duocuc.cl', '9123', '¿Lugar de nacimiento de su madre?', 'Valparaiso', 'Carla', 'Fuentes');
  }

  public ngOnInit(): void {
  }

  public recuperar(): void {
  
      const usu: Usuario | undefined = this.usuario.buscarRespuestaValida(this.usuario.respuestaSecreta);
      
      if (usu) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.router.navigate(['/correcto'], navigationExtras); 
      } else {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.router.navigate(['/incorrecto'], navigationExtras);
      }
    }
  
}
