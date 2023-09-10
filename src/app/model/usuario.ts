import { Persona } from "./persona";

export class Usuario extends Persona {

  public correo: string;
  public password: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;

  constructor(correo: string, password: string, preguntaSecreta: string, respuestaSecreta: string
      , nombre: string, apellido: string) {
    super();
    this.correo = correo;
    this.password = password;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
    this.setPersona(nombre, apellido);
  }

  public getCorreo(): string {
    return this.correo;
  }

  public getPassword(): string {
    return this.password;
  }

  public setUsuario(correo: string, password: string, preguntaSecreta: string, respuestaSecreta: string
    , nombre: string, apellido: string): void {
    this.correo = correo;
    this.password = password;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
    this.setPersona(nombre, apellido);
  }

  public listaUsuariosValidos(): Usuario[] {
    const lista = [];
    lista.push(new Usuario(
        'atorres@duocuc.cl'
      , '1234'
      , '¿Cuál es tu animal favorito?'
      , 'gato'
      , 'Ana'
      , 'Torres'));
    lista.push(new Usuario(
        'avalenzuela@duocuc.cl'
      , '5678'
      , '¿Cuál es el nombre de tu mejor amigo?'
      , 'juanito'
      , 'Alberto'
      , 'Valenzuela'));
    lista.push(new Usuario(
        'cfuentes@duocuc.cl'
      , '9123'
      , '¿Lugar de nacimiento de su madre?'
      , 'Valparaiso'
      , 'Carla'
      , 'Fuentes'));
    return lista;
  }

  public buscarUsuarioValido(correo: string, password: string): Usuario | undefined {
    const busu: Usuario | undefined = this.listaUsuariosValidos().find(
      usu => usu.correo === correo && usu.password === password);
    return busu;
  }

  public buscarRespuestaValida(respuestaSecreta: string): Usuario | undefined {
    const busr: Usuario | undefined = this.listaUsuariosValidos().find(
      usu => usu.respuestaSecreta === respuestaSecreta);
    return busr;
  }

  public validarCorreo(): string {
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (patronCorreo.test(this.correo)) {
      return '';
    } else {
      return 'El correo ingresado no tiene un formato válido.';
    }
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar una contraseña.';
    }
    for(let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarCredenciales(): string {
    const usu: Usuario | undefined = this.buscarUsuarioValido(this.correo, this.password);
    return usu? '' : 'El usuario no fue encontrado en el sistema.';
  }

  public validarUsuario(): string {
    return this.validarCorreo() || this.validarPassword() || this.validarCredenciales();
  }

}
