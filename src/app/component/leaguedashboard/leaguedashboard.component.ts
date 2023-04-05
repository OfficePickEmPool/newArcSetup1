import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
    selector: "Leaguedashboard",
    moduleId: module.id,
    templateUrl: "./leaguedashboard.component.html",
    styleUrls: ['./leaguedashboard.component.css']
})
export class LeaguedashboardComponent implements OnInit {
    glyphs = [];
    scheduleIcon: string = "";
    homeIcon: string = "";
    scoreIcon: string = "";
    noteIcon: string = "";
    viewIcon: string = "";

    private _activatedUrl: string;


    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        this._activatedUrl = this.router.url;
        
        for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
            let glyph = {
                icon: String.fromCharCode(charCode),
                code: charCode.toString(16)
            };
            this.glyphs.push(glyph);
        }


        this.glyphs.forEach((element) => {
            if (element.code == "e953") {
                this.scheduleIcon = element.icon;
            }
            if (element.code == "e921") {
                this.homeIcon = element.icon;
            }
            if (element.code == "e941") {
                this.scoreIcon = element.icon;
            }
            if (element.code == "e91f") {
                this.noteIcon = element.icon;
            }
            if (element.code == "e9ce") {
                this.viewIcon = element.icon;
            }
        });
    }

    ngOnInit(): void {
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }
    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            },
            clearHistory: true
        });
    }
}