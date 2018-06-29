import {NgModule, ModuleWithProviders} from "@angular/core";
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HelperService} from "./services/helper.service";
import {ApiService} from './services/api.service';
import {NotificationService} from './services/notification.service';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NavbarComponent} from './components/navbar/navbar.component';

@NgModule({
    imports: [CommonModule, FormsModule,ReactiveFormsModule],
  exports: [
               SpinnerComponent,
               NavbarComponent 
            ],
  declarations: [
                  SpinnerComponent,
                  NavbarComponent
                ]
})
export class SharedModule {

    static forRoot():ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [HelperService,ApiService,NotificationService]
        };
    }
}