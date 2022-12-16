export interface IPostLine {
    postId?: string;
    lineId?: string;
}

export class PostLine implements IPostLine {
    constructor(
        public postId?: string,
        public lineId?: string,
    ) {
        this.postId = postId;
        this.lineId = lineId;
    }
}