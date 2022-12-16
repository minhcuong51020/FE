export interface IPostTwitter {
    postId?: string;
    twitterId?: string;
}

export class PostTwitter implements IPostTwitter {
    constructor(
        public postId?: string,
        public twitterId?: string,
    ) {
        this.postId = postId;
        this.twitterId = twitterId;
    }
}