import { inject } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

type NewType = boolean;

export class SwalMethods{
  private  _router=inject(Router);
    ModalError(mensaje?:string){
        Swal.fire({      
          icon: "error",
          title: "Ha ocurrido un error!",
          text:mensaje,
          showConfirmButton: true,
          confirmButtonColor :"#00A45A"
        });      
      }
      ModalCorrecto(mensaje:string){
        Swal.fire({      
          icon: "success",
          title: "La operación fue existosa!",
          text:mensaje,
          showConfirmButton: true,
          confirmButtonColor :"#00A45A"
        });      
      }
      ModalCamposVacios(mensaje:string){
        Swal.fire({      
          icon: "error",
          title: "Hay campos vacios que son obligatorios",
          text:mensaje,
          showConfirmButton: true,
          confirmButtonColor :"#00A45A"
        });      
      }
      ModalInformation(title:string,mensaje:string){
        Swal.fire({      
          icon: "info",
          title: title,
          text:mensaje,
          showConfirmButton: true,
          confirmButtonColor :"#00A45A"
        }); 
    
      }
      modalLoading(text?:string){
        Swal.fire({
          icon:'info',
          title:'Cargando...',
          text:text,
          showConfirmButton: false,
          allowOutsideClick:false,
          allowEscapeKey:false,
        })
        Swal.showLoading()
      }
      modalAcceptReload(text:string){
        Swal.fire({
          title: "Notificación",
          text:text,                    
          icon: "info",
          showCancelButton: false,
          confirmButtonColor :"#00A45A",
          confirmButtonText: "Ok"
        }).then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      }
      ChangesMessage(error:string){
        let message=error;
        if(message!=null && message.includes("System.Exception:")){
          message=error.split("\n")[0].split("System.Exception:")[1]
        }else{
          message="Comuniquese con el departamente de desarrollo"
        }
        return message;
      }
      modalAcceptRouter(text:string, ruta:string){
        Swal.fire({
          title: "Notificación",
          text:text,                    
          icon: "info",
          showCancelButton: false,
          confirmButtonColor :"#00A45A",
          confirmButtonText: "Ok"
        }).then((result) => {
          if(result.isConfirmed){
            this._router.navigateByUrl(ruta);           
          }
        })
      }
}