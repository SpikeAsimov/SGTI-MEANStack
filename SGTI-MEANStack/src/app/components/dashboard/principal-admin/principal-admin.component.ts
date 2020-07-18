import { Component, OnInit } from '@angular/core';


//sweetalert2
import Swal from 'sweetalert2'
//PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {UsuarioService} from "../../services/usuario.service";
import {usersModule} from "../../models/user.module";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }
  usuarios: usersModule[];
  usuario: usersModule;

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usuarioService
      .getAllUser()
      .subscribe((data: any) => (this.usuarios = data.usuarios))
  }

  deleteUser(usuario: usersModule) {

    console.log(usuario);

    if (usuario._id === this.usuarioService.selectedUser._id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes eliminar tu propia cuenta'
      })
      return
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Estas a punto de eliminar a " + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this.usuarioService.deleteUserById(usuario._id)
          .subscribe(res => {
            console.log(res);
            //Swal.fire("Bien hecho", "Usuario eliminado correctamente", "success");
            this.usuarioService.getAllUser();
          });
      }
    })
  }

  editUser(usuario: usersModule){
    //console.log(usuario);
  }

  obtenerPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

}
