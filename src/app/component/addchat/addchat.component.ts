import { Component, OnInit } from "@angular/core";
import { RadListView, SwipeActionsEventData, ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ChatService } from "./../../shared/chat.service";
import { AppService } from "./../../shared/app.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { Router } from "@angular/router";
import { ChatModel } from "./../../modal/chatModel";
import { UserModel } from "./../../modal/chat";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");
import { SearchBar } from "tns-core-modules/ui/search-bar";

@Component({
	selector: "Addchat",
	moduleId: module.id,
	templateUrl: "./addchat.component.html",
	styleUrls: ['./addchat.component.css']
})
export class AddchatComponent implements OnInit {
	textFieldValue: string = "";
	glyphs = [];
	sendIcon: string = "";
	public selectedusercount: number = 0;
	currentUserName = this.appService.userDetails.UserName;
	public _allusers: { UserName: string, FullName: string }[] = [];
	public _tempallusers: { UserName: string, FullName: string }[] = [];

	public allusers = new ObservableArray<UserModel>();
	public tempallusers = new ObservableArray<UserModel>();


	selectedUserList: { UserName: string, FullName: string }[] = [];
	chatNewModel = new ChatModel();
	chatMessaage = "";
	chatGroupName = "";
	groupMember = "";
	processing = false;
	constructor(private appService: AppService, private chatService: ChatService, private route: Router) {
	}

	ngOnInit(): void {
		this.getAllUser();
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
		});

	}

	getAllUser() {
		this.processing = true;
		this.chatService.getAllUsers().subscribe((response) => {
			let data = this.appService.map(response, new ApiSuccessCollectionResponce());
			//this._allusers = data.Result;
			this.allusers = data.Result;
			this.tempallusers = data.Result
			this.processing = false;
		}, (error) => {
			this.processing = false;

		});
	}

	btnSendMessage() {


		if (this.selectedusercount == 1) {
			this.processing = true;
			this.chatNewModel = new ChatModel();
			this.chatNewModel.UserMessage = this.currentUserName;
			this.chatNewModel.Sender = this.currentUserName;
			this.chatNewModel.Receiver = this.selectedUserList[0].UserName;
			this.chatNewModel.FullUserName = this.selectedUserList[0].FullName;
			var date = new Date();
			this.chatNewModel.ChatDateTime = new Date();
			this.chatNewModel.ChatGroupName = "";
			this.chatNewModel.GroupMembers = "";
			this.chatNewModel.ChatMessage = this.chatMessaage;
			this.chatNewModel.ReceiverFullName = "";

			this.insertMessage(this.chatNewModel);



		} else {
			if ((/[!@]/).test(this.chatGroupName) === false && this.chatMessaage != '' && this.chatGroupName != '') {
				this.processing = true;

				for (let i = 0; i < this.selectedusercount; i++) {
					if (i == 0) {
						this.groupMember = this.currentUserName + "," + this.selectedUserList[i].UserName;
					} else {
						this.groupMember = this.groupMember + "," + this.selectedUserList[i].UserName;
					}
				}
				this.chatNewModel = new ChatModel();
				this.chatNewModel.UserMessage = this.currentUserName + "@" + this.chatGroupName;
				this.chatNewModel.Sender = this.currentUserName;
				this.chatNewModel.Receiver = "";
				this.chatNewModel.FullUserName = this.currentUserName;
				var date = new Date();
				this.chatNewModel.ChatDateTime = new Date();
				this.chatNewModel.ChatGroupName = this.chatGroupName;
				this.chatNewModel.GroupMembers = this.groupMember;
				this.chatNewModel.ChatMessage = this.chatMessaage;
				this.chatNewModel.ReceiverFullName = "";

				this.insertMessage(this.chatNewModel);
			}
		}
	}

	insertMessage(modelData) {
		this.processing = true;
		this.chatService.createMessage(modelData).subscribe((response) => {
			let data = this.appService.map(response, new ApiSuccessCollectionResponce());
			this.chatMessaage = "";
			this.chatGroupName = "";
			this.groupMember = "";
			this.processing = false;
			//same group
			if (data.Result == 2) {
				alert({
					title: "Group name should not be same",
					okButtonText: "OK"
				});
			}
			//success
			if (data.Result == 1) {
				this.route.navigate(["/chathome"]);
			}
		}, (error) => {
			console.log(error);
			this.processing = false;
		});
	}

	public onItemSelected(args: ListViewEventData) {
		const listview = args.object as RadListView;
		const selectedItems = listview.getSelectedItems();
		this.selectedUserList = listview.getSelectedItems();
		this.selectedusercount = selectedItems.length;
	}
	public onItemDeselected(args: ListViewEventData) {
		const listview = args.object as RadListView;
		const selectedItems = listview.getSelectedItems();
		this.selectedUserList = listview.getSelectedItems();
		this.selectedusercount = selectedItems.length;
	}
	onLabelLoaded(args: observable.EventData) {
		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17)
		}
	}

	//search bar    
	public onTextChanged(args) {
		let searchBar = <SearchBar>args.object == undefined ? null : <SearchBar>args.object;
		if (searchBar != null && searchBar.text != undefined && searchBar.text != null) {
			let searchValue = searchBar.text.toLowerCase();
			this.allusers = new ObservableArray<UserModel>();
			if (searchValue !== "") {
				for (let i = 0; i < this.tempallusers.length; i++) {
					if (this.tempallusers[i].FullName.toLowerCase().indexOf(searchValue) !== -1) {
						this.allusers.push(this.tempallusers[i]);
					}
				}
			}
		}
	}

	//clear search bar
	public onClear(args) {
		this.allusers = new ObservableArray<UserModel>();
		this.tempallusers.forEach(item => {
			this.allusers.push(item);
		});
	}


}
