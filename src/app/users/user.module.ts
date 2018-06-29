
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import {reducer} from './user.reducer';
import {UserComponent} from './components/user/user.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../shared/shared.module';
import {UserService} from './services/user.service';
import {UserEffects} from './user.effect';


@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        StoreModule.forFeature('userState',reducer),
        EffectsModule.forRoot([UserEffects]),
    ],
    exports: [UserComponent],
    declarations: [UserComponent],
    providers: [UserService]
})
export class UserModule {}