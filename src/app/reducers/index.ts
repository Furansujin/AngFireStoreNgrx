import { ActionReducerMap } from '@ngrx/store';
import { postReducer } from '../post/post.reducer';
import {articleReducer} from '../article/article.reducer';




export const reducers: ActionReducerMap<any> = {
    post: postReducer,
  article: articleReducer
};
