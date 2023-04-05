export class ViewPlayerModel {
    public From: string = '';
    public UserName: string = '';
    Id: number;

}

export class ViewPlayer {
    public UserName: string;
    public From: string;
    public To: string;
    public PlayerId: number;
    constructor() {
    }
    setplayerEmailBodyFactory(item) {
        this.UserName = item.UserName;
        this.From = item.From;
        this.To = item.UserName;
        this.PlayerId = item.Id;
    }

}




