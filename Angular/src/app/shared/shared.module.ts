import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';
import { PricePipe } from './pipes/price.pipe';

@NgModule({
    declarations: [PricePipe],
    imports: [CommonModule],
    providers: [StorageService, NotificationService],
    exports: [PricePipe],
})
export class SharedModule {}
