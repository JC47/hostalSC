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
  NbSelectModule, NbSidebarModule, NbTabsetModule,
  NbThemeModule, NbUserModule,
  NbActionsModule
} from '@nebular/theme';

//Plugins
import { AgmCoreModule } from '@agm/core';
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";



//Bootstrap theme
import { MDBBootstrapModulesPro,SidenavModule, AccordionModule,
  TabsModule,InputsModule,WavesModule,
  ModalModule,ButtonsModule,
  NavbarModule } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import {AuthService} from "./guards/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {AuthAdminGuard} from "./guards/auth-admin.guard";
import { AdministradoresComponent } from './components/admin/dashboard-admin/administradores/administradores.component';
import { UsuariosComponent } from './components/admin/dashboard-admin/usuarios/usuarios.component';
import { MensajesContactoComponent } from './components/admin/dashboard-admin/mensajes-contacto/mensajes-contacto.component';
import { ReservacionesComponent } from './components/admin/dashboard-admin/reservaciones/reservaciones.component';
import {UserService} from "./services/user.service";
import { ModalDeleteItemComponent } from './components/modal-delete-item/modal-delete-item.component';
import { ModalDeleteArrayComponent } from './components/modal-delete-array/modal-delete-array.component';
import { SureDeleteComponent } from './components/sure-delete/sure-delete.component';
import {AdminService} from "./services/admin.service";
import { HotelesComponent } from './components/admin/dashboard-admin/hoteles/hoteles.component';
import { HabitacionesComponent } from './components/admin/dashboard-admin/habitaciones/habitaciones.component';
import { ActivosCamasComponent } from './components/admin/dashboard-admin/activos-camas/activos-camas.component';

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
    DashboardAdminComponent,
    AdministradoresComponent,
    UsuariosComponent,
    MensajesContactoComponent,
    ReservacionesComponent,
    ModalDeleteItemComponent,
    ModalDeleteArrayComponent,
    SureDeleteComponent,
    HotelesComponent,
    HabitacionesComponent,
    ActivosCamasComponent
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
    NbUserModule,
    NbSelectModule,
    HttpClientModule,
    SidenavModule,
    AgmCoreModule,
    NbActionsModule,
    NbInputModule,
    NbSidebarModule.forRoot(),
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
    UserService,
    AuthGuard,
    AuthAdminGuard,
    HttpClient,
    JwtHelperService,
    AdminService
  ],
  schemas:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
