import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/productos.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})

export class ListProductComponent implements OnInit{

  listProductos : Producto [] = [];

  constructor(private _productoService: ProductosService,
              private toastr: ToastrService){}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data=>{
      console.log(data);
      this.listProductos = data
      
    }, error=>{
      console.log(error);
      this.toastr.error('Error de capa 8 ', 'Error')
    })
  }

  eliminarProducto(id:any){
    this._productoService.eliminarProducto(id).subscribe(data=>{
      this.toastr.error('Producto eliminado correctamente', 'Eliminado')
      this.obtenerProductos();

    }, error =>{
      console.log(error);
      this.toastr.error('Error de capa 8', 'Error')
    })
  }
}
