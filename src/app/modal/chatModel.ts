export class ChatModel {
    public UserMessage: string = '';
    public Sender: string = '';
    public Receiver: string = '';
    public ChatMessage: string = '';
    public ChatDateTime: Date;
    public ChatGroupName: string = '';
    public FullUserName: string = '';
    public GroupMembers: string = '';
    public ReceiverFullName: string = '';
    constructor() {
    }
}