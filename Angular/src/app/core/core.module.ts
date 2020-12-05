import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AppInterceptorProvider } from './app.interceptor';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    declarations: [NavComponent, FooterComponent],
    imports: [CommonModule, RouterModule],
    providers: [AppInterceptorProvider, AuthGuard],
    exports: [NavComponent, FooterComponent],
})
export class CoreModule {}
