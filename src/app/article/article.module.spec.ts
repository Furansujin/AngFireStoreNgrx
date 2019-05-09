import { ArticleModule } from './article.module';

describe('ArticleModule', () => {
  let postModule: ArticleModule;

  beforeEach(() => {
    postModule = new ArticleModule();
  });

  it('should create an instance', () => {
    expect(postModule).toBeTruthy();
  });
});
