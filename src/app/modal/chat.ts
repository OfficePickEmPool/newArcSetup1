export class Chat {
    public Id: number;
    public UserMessage: string = '';
    public Sender: string = '';
    public Receiver: string = '';
    public ChatMessage: string = '';
    public ChatDateTime: Date;
    public ChatGroupName: string = '';
    public FullUserName: string = '';
    public DisplayTag: string = '';
    public GroupMembers: string = '';


    constructor() {
    }
}
export class UserModel {
    public UserName: string = '';
    public FullName: string = '';
}

export class DeleteIds {
    public Id: number;
}