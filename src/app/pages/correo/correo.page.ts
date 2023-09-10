import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; 
import { ToastController } from '@ionic/angular'; 
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

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
    
    if (this.usuario) {
      
      const mensajeError = this.usuario.validarUsuario();
      if (mensajeError) {
        this.mostrarMensaje(mensajeError);
        return;
      }

      const usu: Usuario | undefined = this.usuario.buscarUsuarioValido(this.usuario.correo, this.usuario.password);
      
      if (usu) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.router.navigate(['/pregunta'], navigationExtras); 
      }
    }
  }
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}
