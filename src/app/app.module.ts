import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAlertModule, NgbDatepickerModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LayautComponentComponent } from './components/layaut-component/layaut-component.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TopnavComponent } from './components/topnav/topnav.component';
import { MenunavComponent } from './components/menunav/menunav.component';
import { AdminComponent } from './views/admin/admin.component';
import { PosComponent } from './views/pos/pos.component';
import { HttpInterceptorProvider } from './interceptors/httpinterceptor';
import { NewproductComponent } from './components/modal/newproduct/newproduct.component';
import { RubroComponent } from './components/modal/rubro/rubro.component';
import { RubrosComponent } from './views/rubros/rubros.component';
import { AlertComponent } from './components/alert/alert.component';
import { ToastsContainer } from './components/alert/message.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { ClienteComponent } from './components/modal/cliente/cliente.component';
import { VentasComponent } from './views/ventas/ventas.component';
import { VentaComponent } from './components/modal/venta/venta.component';
import { CardproductoComponent } from './components/modal/cardproducto/cardproducto.component';
@NgModule({
  declarations: [
    AppComponent,
    LayautComponentComponent,
    LoginComponent,
    TopnavComponent,
    MenunavComponent,
    AdminComponent,
    PosComponent,
    NewproductComponent,
    RubroComponent,
    RubrosComponent,
    AlertComponent,
    ClientesComponent,
    ClienteComponent,
    VentasComponent,
    VentaComponent,
    CardproductoComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbTooltipModule, ToastsContainer,
    NgbDatepickerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorProvider,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
