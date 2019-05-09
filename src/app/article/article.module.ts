import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { articleReducer } from './article.reducer';
import { ArticleEffects } from './article.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('article', articleReducer),
    EffectsModule.forFeature([ArticleEffects])
  ],
  exports: [ArticleComponent],
  declarations: [ArticleComponent]
})
export class ArticleModule { }
