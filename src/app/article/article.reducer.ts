import * as actions from './article.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface
export interface Localisation {
  lon: number;
  lat: number;
}
export interface Article {
  id?: string;
    title: string;
    content: string;
    postId: string;
  localisation: Localisation;
  rating: number;
  stars: number;
    photos: Array<string>;
  address: string;
}

// Entity adapter
export const articleAdapter = createEntityAdapter<Article>();
export interface State extends EntityState<Article> { }

export const initialState: State = articleAdapter.getInitialState();

export function articleReducer(
    state: State = initialState,
    action: actions.ArticleActions) {

    switch (action.type) {
        case actions.ADDED:
            return articleAdapter.addOne(action.payload, state);

        case actions.MODIFIED:
            return articleAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state);
        case actions.REMOVED:
            return articleAdapter.removeOne(action.payload.id, state);

        default:
            if (state.entities[0]) {
              state.entities[0].content = 'aaaaaa';
            }
          return state;
        }

}

export const getArticleState = createFeatureSelector<State>('article');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = articleAdapter.getSelectors(getArticleState);
