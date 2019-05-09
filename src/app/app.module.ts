import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {MetaReducer, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { PostModule } from './post/post.module';
import { reducers } from './reducers';
import { AppRoutingModule } from './/app-routing.module';

import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { ArticleComponent } from './article/article/article.component';
import {ArticleModule} from './article/article.module';
export const firebaseConfig =  environment.firebaseConfig;
import { storeFreeze } from 'ngrx-store-freeze';


export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    PostModule,
    ArticleModule,
    AppRoutingModule,
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
