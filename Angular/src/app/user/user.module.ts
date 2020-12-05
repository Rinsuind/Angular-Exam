import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserRouterModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [RegisterComponent, LoginComponent, ProfileComponent],
    imports: [
        CommonModule,
        UserRouterModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [UserService],
    exports: [],
})
export class UserModule {}
