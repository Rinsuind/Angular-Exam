import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    token: false,
                },
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    token: false,
                },
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    token: true,
                },
            },
            {
                path: 'checkout',
                component: CheckoutComponent,
                data: {
                    token: true,
                },
            },
        ],
    },
];

export const UserRouterModule = RouterModule.forChild(routes);
