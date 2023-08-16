import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/list-product/list-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

const routes: Routes = [
  {path:'', component: ListProductComponent},
  {path:'crearProduct', component:CreateProductComponent},
  {path:'editar-producto/:id', component:CreateProductComponent},
  {path:'**', pathMatch:'full', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
