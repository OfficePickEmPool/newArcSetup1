import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");
import { ChatService } from "./../../shared/chat.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Router } from "@angular/router";
import { Chat, UserModel } from "./../../modal/chat";
import { UserChatList } from "./../../modal/userChat";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
	selector: "Chathome",
	moduleId: module.id,
	templateUrl: "./chathome.component.html",
	styleUrls: ['./chathome.component.css']
})
export class ChathomeComponent implements OnInit {
	screenHeight: number;
	processing = true;
	glyphs = [];
	pulldownIcon: string = "";

	plusIcon: string = "";
	deleteIcon: string = "";
	public tempChats: ObservableArray<UserChatList> = new ObservableArray<UserChatList>();
	public realChats: ObservableArray<UserChatList> = new ObservableArray<UserChatList>();

	selectedUserForDelete = new Array<UserModel>();


	currentUserName = this.appService.userDetails.UserName;

	constructor(private appService: AppService, private chatService: ChatService, private route: Router) {
	}

	ngOnInit(): void {
		this.screenHeight = this.appService.screenInformation.heightPixels;
		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}

		this.glyphs.forEach((element) => {

			if (element.code == "ea36") {
				this.pulldownIcon = element.icon;
			}
			if (element.code == "ea0a") {
				this.plusIcon = element.icon;
			}
			if (element.code == "e9ac") {
				this.deleteIcon = element.icon;
			}
		});
		//get all chat details		
		this.getCureentChats();
	}

	getCureentChats() {
		this.processing = true;
		this.chatService.getChatUserList().subscribe((response) => {
			let data = this.appService.map(response, new ApiSuccessCollectionResponce());
			let chatdata = JSON.stringify(data.Result);
			// this.realChats = <ObservableArray<Chat>>JSON.parse(chatdata);
			// this.tempChats = <ObservableArray<Chat>>JSON.parse(chatdata);
			this.realChats = <ObservableArray<UserChatList>>JSON.parse(chatdata);
			this.tempChats = <ObservableArray<UserChatList>>JSON.parse(chatdata);

			this.processing = false;
		}, (error) => {
			this.processing = false;
		});
	}

	selectedUserChat(chat) {
		this.appService.selectedchat = chat;
		this.route.navigate(["/newchat"]);
	}

	//search bar    
	public onTextChanged(args) {
		let searchBar = <SearchBar>args.object == undefined ? null : <SearchBar>args.object;
		if (searchBar != null && searchBar.text != undefined && searchBar.text != null) {
			let searchValue = searchBar.text.toLowerCase();
			this.realChats = new ObservableArray<UserChatList>();
			if (searchValue !== "") {
				for (let i = 0; i < this.tempChats.length; i++) {
					if (this.tempChats[i].FullUserName.toLowerCase().indexOf(searchValue) !== -1) {
						this.realChats.push(this.tempChats[i]);
					}
				}
			}
		}
	}

	// clear search bar
	public onClear(args) {
		this.realChats = new ObservableArray<UserChatList>();
		this.tempChats.forEach(item => {
			this.realChats.push(item);
		});

	}


	onLabelLoaded(args: observable.EventData) {

		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17)
		}
	}
	public onItemSwipe(e) {
		this.processing = true;
		//e.direction=8 for Swipe Top
		//e.direction = 4 for Swipe Bottom
		if (e.direction == 8) {
			this.getCureentChats();
		}
		this.processing = false;
	}

	deleteUserChat(model) {
		this.selectedUserForDelete = [];
		var name = (model.FullUserName.indexOf("@") > -1) ? model.FullUserName.split("@")[1] : model.FullUserName;
		var userModel = new UserModel;
		userModel.UserName = model.UserMessage;
		userModel.FullName = model.FullName;
	
		this.selectedUserForDelete.push(userModel);

		dialogs.confirm({
			title: "Delete",
			message: "Are you sure you want delete " + name + " Chat.",
			okButtonText: "Yes",
			cancelButtonText: "No"
		}).then(result => {
			if (result) {
				this.deleteUser();
			}
		});

	}



	deleteUser() {	
		this.processing = true;
		this.chatService.deleteUserChat(this.selectedUserForDelete).subscribe((response) => {
			let data = this.appService.map(response, new ApiSuccessCollectionResponce());			
			this.processing = false;
			this.getCureentChats();
		}, (error) => {
			this.processing = false;
			console.log("error ");
		});
	}
}