import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import { ContactService } from "./../../shared/contact.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";

@Component({
	selector: "Contactleagueadmin",
	moduleId: module.id,
	templateUrl: "./contactleagueadmin.component.html",
	styleUrls: ['./contactleagueadmin.component.css']
})
export class ContactleagueadminComponent implements OnInit {
	isBusy: boolean = true;

	contactFrom = this.appService.userDetails.UserName;
	contactTo = "League Admin";
	contactSubject = "Contact League Admin";
	contactMessage = "";

	constructor(private appService: AppService, private contactService: ContactService, private route: Router) {
	}

	sendContactLeagueAdmin() {
		this.isBusy = true;
		let leagueId = this.appService.leagueDetails.LeagueId;

		this.contactService.sendcontactLeagueAdmin(leagueId, this.contactSubject, this.contactMessage).subscribe((response: Response) => {
			if (response.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(response, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					dialogs.alert({
						title: "Office Pick Em Pool",
						message: "Successfully Sent ",
						okButtonText: "ok"
					}).then(() => {
						this.isBusy = false;
						//this.route.navigate(["/contactleagueadmin"]);
						this.contactMessage = "";
					});
				}
				else {
					this.isBusy = false;
				}
			} else {
				this.isBusy = false;
				//console.log("Error :" + response);
			}
		}, (error) => { this.isBusy = false; })
	}
	ngOnInit(): void {
		this.isBusy = false;
	}
}