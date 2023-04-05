import { ItemEventData } from "tns-core-modules/ui/list-view";
import { SubscriptionService } from "./../../shared/subscription.service";
import { AppService } from "./../../shared/app.service";
import { Component, OnInit } from "@angular/core";
import { Subscribe } from "./../../modal/subscribe";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";

@Component({
    selector: "Subscriptiondetail",
    moduleId: module.id,
    templateUrl: "./subscriptiondetail.component.html",
    styleUrls: ['./subscriptiondetail.component.css']
})
export class SubscriptiondetailComponent implements OnInit {
    isBusy: boolean = true;
    subscriptionList = new Array<Subscribe>();
    glyphs = [];
    addIcon: string = "";
    screenHeight: number;
    // screenWidth: number;

    onItemTap(args: ItemEventData): void {
        //console.log('Item with index: ' + args.index + ' tapped');
    }

    constructor(private subscriptionService: SubscriptionService, private appService: AppService) {
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
            if (element.code == "ea0a") {
                this.addIcon = element.icon;
            }

        });

        this.subscriptionService.getSubscriptionList().subscribe((response: Response) => {
            if (response.hasOwnProperty("ErrorMessage")) {
                let data = this.appService.map(response, new SubscribeListResponce())
               
                if (data.StatusCode == "200") {

                    let list = this.appService.mapCollection(data.Result, new Array<Subscribe>());
                    list.forEach(item => {

                        item.StartDate = new Date(item.StartDate);
                        item.EndDate = new Date(item.EndDate);
                    });
                    this.isBusy = false;
                    this.subscriptionList = list.sort((a, b) => {

                        this.isBusy = false;
                        return <any>new Date(b.StartDate) - <any>new Date(a.StartDate)
                    })

                }
                else {
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
        });
    }
}

class SubscribeListResponce {
    constructor() {

    }
    Version: string = "";
    StatusCode: string = "";
    ErrorMessage: string = "";
    Result: object = [];

}