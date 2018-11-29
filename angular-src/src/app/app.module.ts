//Angular components
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//Rutas
import {APP_ROUTING} from "./app.routes";


//Components
import { PageComponent } from './components/page/page.component';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/page/inicio/inicio.component';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/page/nosotros/nosotros.component';
import { ServiciosComponent } from './components/page/servicios/servicios.component';
import { ContactoComponent } from './components/page/contacto/contacto.component';
import { ReservacionComponent } from './components/page/reservacion/reservacion.component';
import { ReactiveFormsModule} from "@angular/forms";
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';




//Servicios
import {ContactoService} from "./services/contacto.service";


//Nebular theme
import {
  NbButtonModule,
  NbCardModule, NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule, NbTabsetModule,
  NbThemeModule, NbUserModule
} from '@nebular/theme';

//Plugins
import { AgmCoreModule } from '@agm/core';
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";



//Bootstrap theme
import { MDBBootstrapModulesPro,TabsModule,InputsModule,WavesModule,ModalModule,ButtonsModule, NavbarModule } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import {AuthService} from "./guards/auth.service";
import {AuthGuard} from "./guards/auth.guard";

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
    TabsModule,
    InputsModule,
    NavbarModule,
    ModalModule,
    ButtonsModule,
    JwtModule,
    MDBBootstrapModulesPro.forRoot(),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbTabsetModule,
    WavesModule,
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
    ContactoService,
    MDBSpinningPreloader,
    AuthService,
    AuthGuard,
    HttpClient,
    JwtHelperService
  ],
  schemas:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
