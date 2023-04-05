import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");
import { ChatService } from "./../../shared/chat.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { Chat, DeleteIds } from "./../../modal/chat";
import { ChatModel } from "./../../modal/chatModel";
import { UserChatList } from "./../../modal/userChat";
// import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListView } from 'tns-core-modules/ui/list-view';
import { RadListView, SwipeActionsEventData, ListViewEventData } from "nativescript-ui-listview";

@Component({
	selector: "Newchat",
	moduleId: module.id,
	templateUrl: "./newchat.component.html",
	styleUrls: ['./newchat.component.css']
})
export class NewchatComponent implements OnInit {
	glyphs = [];
	sendIcon: string = "";
	pullupIcon: string = "";
	deleteIcon: string = "";
	plusIcon: string = "";
	minusIcon: string = "";
	//currentChatDetails = new Chat();
	currentChatDetails = new UserChatList();
	currentUserName = this.appService.userDetails.UserName;
	currentUserFullName = "";
	selectedChatForDelete: Array<Chat> = new Array<Chat>();
	deletedIds: Array<DeleteIds> = new Array<DeleteIds>();

	realChats: ObservableArray<Chat> = new ObservableArray<Chat>();
	tempChats: ObservableArray<Chat> = new ObservableArray<Chat>();
	realChatModel: ObservableArray<ChatModel> = new ObservableArray<ChatModel>();
	chatNewModel = new ChatModel();
	textMessage = "";
	processing = true;
	checked = "None";
	checkeds = "Press";
	public selectedusercount: number = 0;
	showDeleteIcon = 0;
	expand: string = "";
	@ViewChild('lv', { static: true }) listViewElem: ElementRef;

	private scrollToBottom(lv: ListView) {
		if (this.realChats.length > 0) {
			lv.scrollToIndex(this.realChats.length);
			//	lv.refresh();
		}
	}
	ngAfterViewInit() {
		setTimeout(() => {
			this.scrollToBottom(this.listViewElem.nativeElement);
		}, 1000);
	}

	btnsendMessage(): void {
		this.processing = true;
		if (this.textMessage != '') {
			this.chatNewModel.Sender = this.currentUserName;

			this.chatNewModel.Receiver = this.currentChatDetails.Sender == this.currentUserName ? this.currentChatDetails.Receiver : this.currentChatDetails.Sender;
			this.chatNewModel.UserMessage = this.currentUserName;
			this.chatNewModel.ChatMessage = this.textMessage;
			var date = new Date();
			let nowDateTime = new Date();
			this.chatNewModel.ChatDateTime = nowDateTime;
			this.chatNewModel.FullUserName = this.currentUserFullName;
			if (this.currentChatDetails.ChatGroupName == '') {
				this.chatNewModel.ChatGroupName = "";
				this.chatNewModel.ReceiverFullName = "";
			} else {
				//for group
				this.chatNewModel.UserMessage = this.currentUserName + "@" + this.currentChatDetails.ChatGroupName;
				this.chatNewModel.ChatGroupName = this.currentChatDetails.ChatGroupName;
				this.chatNewModel.GroupMembers = this.currentChatDetails.GroupMembers;
				this.chatNewModel.ReceiverFullName = this.currentChatDetails.Sender == this.currentUserName ? this.currentChatDetails.ReceiverFullName : this.currentChatDetails.FullUserName;
				this.chatNewModel.Receiver = ""
			}

			this.insertMessage(this.chatNewModel);
		}
		this.processing = false;
	}


	textFieldValue: string = "";
	screenHeight: number;

	constructor(private appService: AppService, private chatService: ChatService) {

	}

	ngOnInit(): void {
		this.processing = true;
		this.screenHeight = this.appService.screenInformation.heightPixels;
		this.currentChatDetails = this.appService.selectedchat;

		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}

		this.glyphs.forEach((element) => {
			if (element.code == "e949") {
				this.sendIcon = element.icon;
			}
			if (element.code == "ea32") {
				this.pullupIcon = element.icon;
			}
			if (element.code == "e9ac") {
				this.deleteIcon = element.icon;
			}
			if (element.code == "ea0a") {
				this.plusIcon = element.icon;
			}
			if (element.code == "ea0b") {
				this.minusIcon = element.icon;
			}
		});
		this.expand = this.plusIcon;
		this.getChatDetails();
		this.getFullName(this.currentUserName);
		// this.processing = false;
	}

	insertMessage(modelData) {
		this.processing = true;
		this.chatService.insertMessage(modelData).subscribe((response) => {
			let data = this.appService.map(response, new ApiSuccessCollectionResponce());
			this.textMessage = "";
			this.processing = false;
			this.getChatDetails();
		}, (error) => {
			this.processing = false;
		});
	}

	getFullName(currentUserName: string): any {
		let fullName = "";
		this.chatService.getFullName(currentUserName).subscribe((response) => {
			let data = this.appService.map(response, new ApiSuccessCollectionResponce());
			this.currentUserFullName = data.Result;
		});
		return fullName;
	}

	getChatDetails() {
		this.processing = true;
		this.chatService.getChatDetails().subscribe((response) => {
			let data = this.appService.map(response, new ApiSuccessCollectionResponce());
			this.tempChats = data.Result;

			this.realChats = new ObservableArray<Chat>();
			if (this.currentChatDetails.ChatGroupName == '' || this.currentChatDetails.ChatGroupName == null) {
				for (var i = 0; i < this.tempChats.length; i++) {
					if (this.tempChats[i].ChatGroupName == '' &&
						(this.tempChats[i].Sender == this.currentUserName
							||
							this.tempChats[i].Receiver == this.currentUserName)

						&&
						(this.tempChats[i].Sender == this.currentChatDetails.Sender
							||
							this.tempChats[i].Receiver == this.currentChatDetails.Sender)

						&&
						(this.tempChats[i].Receiver == this.currentChatDetails.Receiver
							||
							this.tempChats[i].Sender == this.currentChatDetails.Receiver)
					) {
						this.realChats.push(this.tempChats[i]);
					}
				}
				this.processing = false;
			}
			else {
				for (var i = 0; i < this.tempChats.length; i++) {
					if (this.tempChats[i].ChatGroupName == this.currentChatDetails.ChatGroupName) {
						this.realChats.push(this.tempChats[i]);
					}
				}
				this.processing = false;
			}

		}, (error) => {
			this.processing = false;
		});
	}
	public onItemSwipe(e) {

		//e.direction=8 for Swipe Top
		//e.direction = 4 for Swipe Bottom
		if (e.direction == 4) {
			this.getChatDetails();
		}

	}
	onLabelLoaded(args: observable.EventData) {
		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17);
		}
	}
	public onItemTap() {
		this.toggle();
	}
	public toggle() {
		if (this.checked == "None") {
			this.showDeleteIcon = 1;
			this.checked = "Press";
			this.checkeds = "None";
		}
		else {
			this.checked = "None";
			this.checkeds = "Press";
			this.showDeleteIcon = 0;
		}
		if (this.expand == this.plusIcon) {
			this.expand = this.minusIcon;
		}
		else {
			this.expand = this.plusIcon;
			this.selectedusercount = 0;
		}
	}
	public onDeleteItemTap() {

		if (this.selectedusercount != 0 && this.deletedIds != null) {
			this.processing = true;
			//console.log(this.deletedIds);
			this.chatService.deleteMessage(this.deletedIds).subscribe((response) => {
				let data = this.appService.map(response, new ApiSuccessCollectionResponce());
				this.processing = false;

				this.expand = this.plusIcon;
				this.selectedusercount = 0;
				this.checked = "None";
				this.showDeleteIcon = 0;
				this.getChatDetails();
			}, (error) => {
				this.processing = false;
				this.expand = this.plusIcon;
				this.selectedusercount = 0;
				this.checked = "None";
				this.showDeleteIcon = 0;
			});
		}
	}
	public onItemSelected(args: ListViewEventData) {

		this.deletedIds = [];
		const listview = args.object as RadListView;
		const selectedItems = listview.getSelectedItems();
		this.selectedChatForDelete = listview.getSelectedItems();

		for (let i = 0; i < this.selectedChatForDelete.length; i++) {
			let id = new DeleteIds();
			id.Id = this.selectedChatForDelete[i].Id;
			this.deletedIds.push(id);
		}
		this.selectedusercount = selectedItems.length;
		//setTimeout(() => {

		//}, 1000);
	}

	public onItemDeselected(args: ListViewEventData) {
		this.deletedIds = [];
		const listview = args.object as RadListView;
		const selectedItems = listview.getSelectedItems();
		this.selectedChatForDelete = listview.getSelectedItems();
		for (let i = 0; i < this.selectedChatForDelete.length; i++) {
			let id = new DeleteIds();
			id.Id = this.selectedChatForDelete[i].Id;
			this.deletedIds.push(id);
		}
		this.selectedusercount = selectedItems.length;
	}
}