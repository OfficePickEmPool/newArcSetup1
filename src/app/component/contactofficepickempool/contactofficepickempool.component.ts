import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { ContactService } from "./../../shared/contact.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
@Component({
	selector: "Contactofficepickempool",
	moduleId: module.id,
	templateUrl: "./contactofficepickempool.component.html",
	styleUrls: ['./contactofficepickempool.component.css']
})
export class ContactofficepickempoolComponent implements OnInit {
	isBusy: boolean = true;

	contactFrom = this.appService.userDetails.UserName;
	contactTo = "League Admin";
	contactSubject = "Contact Office Pick Em Pool";
	contactMessage = "";

	constructor(private appService: AppService, private contactService: ContactService) {
	}

	ngOnInit(): void {
		this.isBusy = false;
	}

	sendOfficePick() {
		this.isBusy = true;
		let leagueId = this.appService.leagueDetails.LeagueId;
		//console.log("sub: " + this.contactSubject);
		this.contactService.sendcontactOpem(leagueId, this.contactSubject, this.contactMessage).subscribe((response: Response) => {
			let data = this.appService.map(response, new ApiSuccessCollectionResponce());
			if (data.StatusCode = "200") {
				dialogs.alert({
					title: "Office Pick Em Pool",
					message: "Successfully Sent ",
					okButtonText: "ok"
				}).then(() => {
					this.contactMessage = "";
					this.isBusy = false;
					//this.route.navigate(["/contactofficepickempool"]);
				});

			}
			else {
				this.isBusy = false;
			}
		}, (error) => { this.isBusy = false; });

	}

}