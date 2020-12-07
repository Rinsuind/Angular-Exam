import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeService } from './home/home.service';

@NgModule({
    declarations: [AppComponent, HomeComponent, NotFoundComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        CoreModule,
        SharedModule,
    ],
    providers: [UserService, HomeService],
    bootstrap: [AppComponent],
})
export class AppModule {}
