import { Action } from '@ngrx/store';
import {Article} from './article.reducer';

export const QUERY    = '[Article] query posts';

export const ADDED    = '[Article] added';
export const PUSH    = '[Article] pushed';
export const MODIFIED = '[Article] modified';
export const REMOVED  = '[Article] removed';

export const UPDATE   = '[Article] update';
export const SUCCESS  = '[Article] update success';

export class Query implements Action {
    readonly type = QUERY;
    constructor() {}
}

export class Added  implements Action {
    readonly type = ADDED;
    constructor(public payload: Article) { }
}

export class Pushed  implements Action {
    readonly type = PUSH;
    constructor(public payload: Article) { }
}

export class Modified implements Action {
    readonly type = MODIFIED;
    constructor(public payload: Article) {}
}

export class Removed implements Action {
    readonly type = REMOVED;
    constructor(public payload: Article) {}
}


// Run a Firestore Update
export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Article>,
      ) { }
}

export class Success implements Action {
    readonly type = SUCCESS;
    constructor() {}
}

export type ArticleActions
= Query | 
Added | 
Pushed |
Modified |
Removed | 
Update | 
Success;
