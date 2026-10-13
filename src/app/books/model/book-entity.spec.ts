import { BookEntity } from './book-entity';

describe('BookEntity', () => {
  it('should create an instance', () => {
    expect(new BookEntity(1001, 'Tech', 'Introduction to Angular', 50.25)).toBeTruthy();
  });
});
