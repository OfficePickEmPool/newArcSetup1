"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ViewPlayerModel {
    constructor() {
        this.From = '';
        this.UserName = '';
    }
}
exports.ViewPlayerModel = ViewPlayerModel;
class ViewPlayer {
    constructor() {
    }
    setplayerEmailBodyFactory(item) {
        this.UserName = item.UserName;
        this.From = item.From;
        this.To = item.UserName;
        this.PlayerId = item.Id;
    }
}
exports.ViewPlayer = ViewPlayer;
