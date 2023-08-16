import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent implements OnInit {

  productoForm: FormGroup;
  titulo = "Crear - Producto";
  id: string | null;

  constructor(private fb: FormBuilder,
    private _productoService: ProductosService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService) {

    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  agregarProducto() {
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }
    if (this.id !== null) {
      // Editar

      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
        this.toastr.success('Producto editado correctamente', 'Editado')
        this.router.navigate(['/']);
      })
      
    } else {
      // crear
      this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
        this.toastr.success('Producto guardado correctamente', 'Guardado')
        this.router.navigate(['/']);
      }, error =>{
        console.log(error);
        this.toastr.error('Error de capa 8', 'Error')
        this.productoForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar Producto"
      this._productoService.obtenerProducto(this.id).subscribe(data=>{
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }
  }


  ngOnInit(): void {
    this.esEditar();
  }
}
