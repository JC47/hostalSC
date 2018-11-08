
import { RouterModule, Routes } from '@angular/router';
import {PageComponent} from "./components/page/page.component";
import {AdminComponent} from "./components/admin/admin.component";
import {InicioComponent} from "./components/page/inicio/inicio.component";
import {NosotrosComponent} from "./components/page/nosotros/nosotros.component";
import {ReservacionComponent} from "./components/page/reservacion/reservacion.component";
import {ServiciosComponent} from "./components/page/servicios/servicios.component";
import {ContactoComponent} from "./components/page/contacto/contacto.component";


const APP_ROUTES: Routes = [
  { path: 'home', component: PageComponent,
      children:[
        { path: 'inicio', component: InicioComponent },
        { path: 'nosotros', component: NosotrosComponent },
        { path: 'reservacion', component: ReservacionComponent },
        { path: 'servicios', component: ServiciosComponent },
        { path: 'contacto', component: ContactoComponent }
      ]},
  { path: 'admin', component: AdminComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home/inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
