export interface IFileResponse {
    location?: string
}

export class FileResponse implements IFileResponse {
    constructor(public location?: string){
        this.location = location;
    }
}