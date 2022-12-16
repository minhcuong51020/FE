export interface IPostRedditRequest {
    postId?: string;
    redditIds?: string[];
    redditId?: string;
    redditNameUrls?: string[];
        
}

export class PostRedditRequest implements IPostRedditRequest {
    constructor(
        public postId?: string,
        public redditIds?: string[],
        public redditId?: string,
        public redditNameUrls?: string[],
    ) {
        this.postId = postId;
        this.redditIds = redditIds;
        this.redditNameUrls = redditNameUrls;
        this.redditId = redditId;
    }
}

export interface IPostRedditResponse {
    id?: string;
    redditName?: string;
    redditUrl?: string;
    timePostReddit?: Date;
}

export class PostRedditResponse implements IPostRedditResponse {
    constructor(
        public id?: string,
        public redditName?: string,
        public redditUrl?: string,
        public timePostReddit?: Date
    ) {
        this.id = id;
        this.redditName = redditName;
        this.redditUrl = redditUrl;
        this.timePostReddit = timePostReddit;
    }
}