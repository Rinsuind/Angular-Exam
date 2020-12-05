import { Routes, RouterModule } from '@angular/router';
import { CarModule } from './car/car.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./user/user.module').then((x) => x.UserModule),
    },
    {
        path: 'car',
        loadChildren: () => import('./car/car.module').then((x) => x.CarModule),
    },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
