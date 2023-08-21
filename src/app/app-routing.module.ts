import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayautComponentComponent } from './components/layaut-component/layaut-component.component';
import { LoginComponent } from './views/login/login.component';
import { PosComponent } from './views/pos/pos.component';
import { AdminComponent } from './views/admin/admin.component';
import { RubrosComponent } from './views/rubros/rubros.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { VentasComponent } from './views/ventas/ventas.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'admin'},
  {path:'login',component: LoginComponent},
  {
    path: '',
    canActivate: [authGuard],
    component: LayautComponentComponent,
    children: [
      {path:'pos',component: PosComponent},
      {path:'admin',component: AdminComponent},
      {path:'rubros',component: RubrosComponent},
      {path:'clientes',component: ClientesComponent},
      {path:'ventas',component: VentasComponent},
    ]
  },
  { path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
