import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { MainComponent } from './main/main.component';
import { MyOffersComponent } from './my-offers/my-offers.component';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        data: {
            token: true,
        },
        children: [
            {
                path: 'main',
                component: MainComponent,
            },
            {
                path: 'create',
                component: CreateComponent,
            },
            {
                path: 'detail/:id',
                component: DetailComponent,
            },
            {
                path: 'own/offers',
                component: MyOffersComponent,
            },
            {
                path: 'edit/:id',
                component: EditComponent,
            },
        ],
    },
];

export const CarRouterModule = RouterModule.forChild(routes);
