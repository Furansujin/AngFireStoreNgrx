import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromArticle from '../article.reducer';
import {AngularFirestore} from '@angular/fire/firestore';
import * as actions from '../article.actions';
import {Localisation} from '../article.reducer';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent  implements OnInit {

  articles: Observable<any>;
  constructor(private store: Store<fromArticle.State>, private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.articles = this.store.select(fromArticle.selectAll);
    this.store.dispatch(new actions.Query());
  }

  addArticle() {
    //const id: string = new Date().getUTCMilliseconds().toString();
    const localisation: Localisation = {
      lon: 81.201033,
      lat: 6.208641
    };
    const id = this.afs.createId();

    const article: fromArticle.Article = {
      id: id,
      title: `Title #${id}`,
    content: `content #${id}`,
    postId: `postId #${id}`,
      localisation: localisation,
    rating: 1,
    stars: 1,
    photos: ['http:\/\/photo.hotellook.com\/image_v2\/limit\/h1399511245_8\/320\/240.auto'],
    address: `address #${id}`,
    };
    //this.afs.collection('articles').doc(id).set(article);
    this.store.dispatch( new actions.Pushed(article));
  }

  updateArticle(id, content) {
    this.store.dispatch( new actions.Update(id, { content }) )
  }
}
