import { PostModule } from './post.module';

describe('ArticleModule', () => {
  let postModule: PostModule;

  beforeEach(() => {
    postModule = new PostModule();
  });

  it('should create an instance', () => {
    expect(postModule).toBeTruthy();
  });
});
