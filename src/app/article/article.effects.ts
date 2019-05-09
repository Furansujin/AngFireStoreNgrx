import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Action } from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import { Article  } from './article.reducer';
import * as articleActions from './article.actions';

import { AngularFirestore } from '@angular/fire/firestore';

import { switchMap, mergeMap, map } from 'rxjs/operators';
import * as postActions from '../post/post.actions';

@Injectable()
export class ArticleEffects {

    constructor(private actions$: Actions, private afs: AngularFirestore) { }

    @Effect()
    query$: Observable<Action> = this.actions$.pipe(
        ofType(articleActions.QUERY),
        switchMap(action => {
            return this.afs.collection<Article>('articles', query => query.orderBy('title')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            return {
                type: `[Article] ${action.type}`,
                payload: { id: action.payload.doc.id, ...action.payload.doc.data() }
            };
        })
    );



    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
      ofType(articleActions.UPDATE),
        map((action: articleActions.Update) => action),
        switchMap(data => {
            const ref = this.afs.doc<Article>(`articles/${data.id}`)
            return from(ref.update(data.changes));
        }),
        map(() => new articleActions.Success())
    );


  @Effect()
  added$: Observable<Action> = this.actions$.pipe(
    ofType(articleActions.PUSH),
    map((action: articleActions.Pushed) => action),
    switchMap(data => {
      const ref = this.afs.collection('articles').doc(data.payload.id);
      return from(ref.set(data.payload));
    }),
    map(() => new articleActions.Success())
  );




}
