import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubscriptionService } from "./../../shared/subscription.service";
import { AppService } from "./../../shared/app.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { SubscribeType } from "./../../modal/subscribeType";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
import * as dialogs from "tns-core-modules/ui/dialogs";
@Component({
	selector: "Subscribe",
	moduleId: module.id,
	templateUrl: "./subscribe.component.html",
	styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
	isBusy: boolean = true;

	glyphs = [];
	payIcon: string = "";
	subscriptionTypeList = new Array<SubscribeType>();
	subscription = new Subscription();
	exp_month: string = "";
	exp_year: string = "";
	amount = 0;

	validatepassword = () => {
		if ((/^[0-9]/.test(this.subscription.Payment.PaymentMethod.CardCode) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Security code must contain only numbers.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/^[0-9]+$/.test(this.subscription.Payment.PaymentMethod.CardCode) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Security code must be 3-4 digits.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.subscription.Payment.PaymentMethod.FirstName == "" || this.subscription.Payment.PaymentMethod.FirstName == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter firstname",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.subscription.Payment.PaymentMethod.LastName == "" || this.subscription.Payment.PaymentMethod.LastName == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter Lastname",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.subscription.Payment.PaymentMethod.Address == "" || this.subscription.Payment.PaymentMethod.Address == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter address",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.subscription.Payment.PaymentMethod.City == "" || this.subscription.Payment.PaymentMethod.City == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter city",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.subscription.Payment.PaymentMethod.Zip == "" || this.subscription.Payment.PaymentMethod.Zip == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter zipcode",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.subscription.Payment.PaymentMethod.CardNumber == "" || this.subscription.Payment.PaymentMethod.CardNumber == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter cardnumber",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.subscription.Payment.PaymentMethod.CardCode == "" || this.subscription.Payment.PaymentMethod.CardCode == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter cardcode",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/^[0-9]{15,16}$/.test(this.subscription.Payment.PaymentMethod.CardNumber) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Credit card must be 15-19 digits.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/^[0-9]/.test(this.subscription.Payment.PaymentMethod.CardNumber) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Credit card must consist of only numbers.",
				okButtonText: "OK"
			});
			return false;
		}
		//Visa
		else if ((/^[0-9]+$/.test(this.subscription.Payment.PaymentMethod.CardNumber) === false)) {
			//console.log("visa");
			alert({
				title: "Office Pick Em Pool",
				message: "Credit card must be a valid Amex, Visa, Discover, or Master Card.",
				okButtonText: "OK"
			});
			return false;
		}


		else if ((this.exp_month == "" || this.exp_month == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter Exp.month",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/[0-9\-\(\)]*/.test(this.exp_month) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Provided expiration date is invalid.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.exp_year == "" || this.exp_year == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Subscription failed. Enter Exp.year",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/[0-9\-\(\)]*/.test(this.exp_year) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Provided expiration date is invalid.",
				okButtonText: "OK"
			});
			return false;
		}

		else if (this.subscription.Payment.PaymentMethod.FirstName == "" || this.subscription.Payment.PaymentMethod.FirstName == undefined && this.subscription.Payment.PaymentMethod.LastName == "" || this.subscription.Payment.PaymentMethod.LastName == undefined
			&& this.subscription.Payment.PaymentMethod.Address == "" || this.subscription.Payment.PaymentMethod.Address == undefined && this.subscription.Payment.PaymentMethod.City == "" || this.subscription.Payment.PaymentMethod.City == undefined
			&& this.subscription.Payment.PaymentMethod.Zip == "" || this.subscription.Payment.PaymentMethod.Zip == undefined && this.subscription.Payment.PaymentMethod.CardNumber == "" || this.subscription.Payment.PaymentMethod.CardNumber == undefined
			&& this.subscription.Payment.PaymentMethod.CardCode == "" || this.subscription.Payment.PaymentMethod.CardCode == undefined && this.exp_month == "" || this.exp_month == undefined
			&& this.exp_year == "" || this.exp_year == undefined) {
			alert({
				title: "Office Pick Em Pool",
				message: "fill all mandatory fields.",
				okButtonText: "OK"
			});
			return false;
		}



		else {
			return true;
		}
	};

	constructor(private subscriptionService: SubscriptionService, private appService: AppService, private route: Router) {

	}

	onTapSubscriptionType(e) {
		this.isBusy = true;
		this.subscriptionTypeList.forEach((item) => { item.IsChecked = false });
		this.subscriptionTypeList[e].IsChecked = true;
		this.amount = this.subscriptionTypeList[e].Price;
		this.subscription.SubscriptionType = this.subscriptionTypeList[e];
		this.subscription.SubscriptionTypeId = this.subscriptionTypeList[e].Id;
		this.isBusy = false;
	}

	onPaymentClick() {
		this.isBusy = true;
		if (this.validatepassword()) {
			this.subscription.UserInfoId = this.appService.userDetails.ID;
			this.subscription.UserInfo = this.appService.userDetails;

			let count = 0;
			if (this.exp_month.length == 1) {
				this.exp_month = "0" + this.exp_month;
				count++;
			}
			this.subscription.Payment.PaymentMethod.Expiration = this.exp_month + this.exp_year;
			this.subscription.Payment.Amount = this.amount;

			this.subscriptionService.proceedPayment(this.subscription).subscribe((data: any) => {

				if (data.Result.Payment != undefined && !data.Result.Payment.IsSuccessful) {
					if (data.Result.Payment.Message != null) {
						alert({
							title: "Office Pick Em Pool",
							message: data.Result.Payment.Message,
							okButtonText: "OK"
						});
					}
					else {
						alert({
							title: "Office Pick Em Pool",
							message: 'Payment Failed.',
							okButtonText: "OK"
						});
					}

				}
				else {
					if (data.Result.Payment == undefined && !data.Result.IsSuccessful) {
						alert({
							title: "Office Pick Em Pool",
							message: 'Subscription failed.',
							okButtonText: "OK"
						});
					}
					else {
						dialogs.alert({
							title: "Office Pick Em Pool",
							message: "Subscription is done.",
							okButtonText: "OK"
						}).then(() => {
							this.route.navigate(["/subscriptiondetail"]);
						});
						// alert({
						// 	title: "Office Pick Em Pool",
						// 	message: 'Subscription is done.',
						// 	okButtonText: "OK"
						// });

					}

				}
			}, (error) => {
				let er = this.appService.map(error, new ApiErrorResponce());
				this.isBusy = false;
				alert({
					title: "Office Pick Em Pool",
					message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
					okButtonText: "OK"

				})
			});
		}
		this.isBusy = false;

	}

	ngOnInit(): void {
		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}
		this.glyphs.forEach((element) => {
			if (element.code == "ea52") {
				this.payIcon = element.icon;
			}
		});
		this.subscriptionService.getSubscriptionTypes().subscribe((response: Response) => {

			if (response.hasOwnProperty("ErrorMessage")) {

				let data = this.appService.map(response, new ApiSuccessCollectionResponce());
				if (data.StatusCode == "200") {

					this.subscriptionTypeList = data.Result;
					if (this.subscriptionTypeList.length > 0) {

						this.subscriptionTypeList[0].IsChecked = true;
						this.amount = this.subscriptionTypeList[0].Price;
						this.subscription.SubscriptionType = this.subscriptionTypeList[0];
						this.subscription.SubscriptionTypeId = this.subscriptionTypeList[0].Id;
					}
					this.isBusy = false;
				} else {

					this.isBusy = false;
				}
			}
			else {

				this.isBusy = false;
			}
		}, (error) => {
			let er = this.appService.map(error, new ApiErrorResponce());
			this.isBusy = false;
			alert({
				title: "Office Pick Em Pool",
				message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
				okButtonText: "OK"

			})
		})
	}
}

class Subscription {
	constructor() {

	}

	IsSuccessful: boolean = false;
	StartDate: Date = new Date();
	EndDate: Date = new Date();
	Payment: Payment = new Payment();
	UserInfoId: number = 0;
	UserInfo: object = null;
	SubscriptionTypeId: number = 0;
	SubscriptionType: object = null;
	PaymentId: number = null;
	Id: number = 0;
	Status: number = 0;
}

class Payment {
	constructor() { }
	PaymentMethodId: number = null;
	PaymentDate: Date = new Date();
	Amount: number = 0.0;
	Message: string = null;
	TransactionCode: string = null;
	IsSuccessful: boolean = false;
	Id: number = 0;
	Status: number = 0;
	PaymentMethod: PaymentMethod = new PaymentMethod();
}

class PaymentMethod {
	constructor() { }
	CardNumber: string = "";
	Expiration: string = "";
	CardCode: string = "";
	FirstName: string = "";
	LastName: string = "";
	Address: string = "";
	City: string = "";
	Zip: string = "";
	Id: number = 0;
	Status: number = 0;
}