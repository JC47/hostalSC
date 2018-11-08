import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule, NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule, NbTabsetModule,
  NbThemeModule, NbUserModule
} from '@nebular/theme';

import { AppComponent } from './app.component';
import {APP_ROUTING} from "./app.routes";
import { PageComponent } from './components/page/page.component';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/page/inicio/inicio.component';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/page/nosotros/nosotros.component';
import { ServiciosComponent } from './components/page/servicios/servicios.component';
import { ContactoComponent } from './components/page/contacto/contacto.component';
import { ReservacionComponent } from './components/page/reservacion/reservacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {InputsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule} from "@angular/forms";
import {ContactoService} from "./services/contacto.service";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import {NbTabComponent, NbTabsetComponent} from "@nebular/theme/components/tabset/tabset.component";
import {NbAuthModule, NbPasswordAuthStrategy} from "@nebular/auth";


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    AdminComponent,
    InicioComponent,
    HomeComponent,
    NosotrosComponent,
    ServiciosComponent,
    ContactoComponent,
    ReservacionComponent,
    LoginAdminComponent,
    DashboardAdminComponent
  ],
  imports: [
    BrowserModule,
    NbMenuModule,
    APP_ROUTING,
    MDBBootstrapModule.forRoot(),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbTabsetModule,
    NbSelectModule,
    HttpClientModule,
    NbInputModule,
    BrowserAnimationsModule,
    NbButtonModule,
    NbUserModule,
    ReactiveFormsModule,
    NbCardModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyBp9oQFtlc8ldsDWQcCqQ7yPCinm0LRoFw"
    })

  ],
  providers: [
    ContactoService
  ],
  schemas:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
