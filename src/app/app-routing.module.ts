import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { PostComponent }      from './post/post/post.component';
import {Article} from './article/article.reducer';
import {ArticleComponent} from './article/article/article.component';

const routes: Routes = [
  { path: '', component: PostComponent },
  { path: 'a', component: ArticleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
