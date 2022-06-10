import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: "", component: DashboardComponent,
   children: [
     {path: "home", component:HomeComponent},
     {path: "cart", component: CartComponent},
     {path: "", redirectTo: "/user/home", pathMatch: "full"}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
