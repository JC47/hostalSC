import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbThemeModule
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

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule} from "@angular/forms";


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
    ReservacionComponent
  ],
  imports: [
    BrowserModule,
    NbMenuModule,
    APP_ROUTING,
    MDBBootstrapModule.forRoot(),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSelectModule,
    BrowserAnimationsModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbCardModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyBp9oQFtlc8ldsDWQcCqQ7yPCinm0LRoFw"
    })

  ],
  providers: [],
  schemas:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
