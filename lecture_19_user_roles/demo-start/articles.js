class Entity {
    constructor(attrs) {
        Object.assign(this, attrs);
    }
}

export class Article extends Entity {};

const articles = [
    new Article({title: 'Test article 1', author_id: 1, published: false}),
    new Article({title: 'Test article 2', author_id: 2, published: true}),
];

export default articles;
