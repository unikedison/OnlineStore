import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path: "", component: DashboardComponent,
   children: [
     {path: "product", component:ProductComponent},
     {path: "add-product", component: AddProductComponent},
     {path: "update-product/:id", component: UpdateProductComponent},
     {path: "user", component:UserComponent},
     {path: "add-user", component: AddUserComponent},
     {path: "update-user/:id", component: UpdateUserComponent},
     {path: "", redirectTo: "/admin/product", pathMatch: "full"}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
