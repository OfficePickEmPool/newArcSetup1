// >> (hide)
import * as applicationModule from 'tns-core-modules/application';
import * as imageModule from 'nativescript-image';

if (applicationModule.android) {
  applicationModule.on('launch', () => {
    imageModule.initialize();
  });
}
// << (hide)

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ExamplesListDepthComponents, OptionsComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    CommonDirectivesModule,
    TNSImageModule,
    NativeScriptFormsModule,
    NativeScriptUIListViewModule,
    NativeScriptRouterModule,
  ],
  exports: [NativeScriptModule, NativeScriptRouterModule],
  providers: [OptionsService, ExampleItemService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

import {
  NgModule,
  NgModuleFactoryLoader,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { registerElement } from 'nativescript-angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
registerElement(
  'PreviousNextView',
  () => require('nativescript-iqkeyboardmanager').PreviousNextView
);

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UsersService } from './shared/users.service';
import { AppService } from './shared/app.service';
import { SubscriptionService } from './shared/subscription.service';
import { LeagueService } from './shared/league.service';
import { NotesService } from './shared/notes.service';
import { SchedulesService } from './shared/schedules.service';
import { ScoreService } from './shared/score.service';
import { MakePickService } from './shared/makePick.service';
import { InviteService } from './shared/invite.service';
import { ViewPlayersService } from './shared/viewplayers.service';
import { HeadToHeadService } from './shared/headtohead.service';
import { StatisticsService } from './shared/statistics.service';
import { LeaderService } from './shared/leader.service';
import { ContactService } from './shared/contact.service';
import { PlayoffService } from './shared/playoff.service';
import { ChatService } from './shared/chat.service';

import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { BodyComponent } from './component/body/body.component';
import { InstructionsComponent } from './component/instructions/instructions.component';
import { SubscribeComponent } from './component/subscribe/subscribe.component';
import { SubscriptiondetailComponent } from './component/subscriptiondetail/subscriptiondetail.component';
import { CreateleagueComponent } from './component/createleague/createleague.component';
import { AvailableleagueComponent } from './component/availableleague/availableleague.component';
import { LeaguedashboardComponent } from './component/leaguedashboard/leaguedashboard.component';
import { LeaguedashboardhomeComponent } from './component/leaguedashboardhome/leaguedashboardhome.component';
import { SchedulesComponent } from './component/schedules/schedules.component';
import { ScoresComponent } from './component/scores/scores.component';
import { NotesComponent } from './component/notes/notes.component';
import { ViewplayersComponent } from './component/viewplayers/viewplayers.component';
import { InvitefriendComponent } from './component/invitefriend/invitefriend.component';
import { SendemailtoplayerComponent } from './component/sendemailtoplayer/sendemailtoplayer.component';
import { LeagueinstructionsComponent } from './component/leagueinstructions/leagueinstructions.component';
import { LeagueorganizerrulesComponent } from './component/leagueorganizerrules/leagueorganizerrules.component';
import { ViewrulesleagueComponent } from './component/viewrulesleague/viewrulesleague.component';
import { TheprocessrulesComponent } from './component/theprocessrules/theprocessrules.component';
import { LogisticsofapprulesComponent } from './component/logisticsofapprules/logisticsofapprules.component';
import { QuickmenurulesComponent } from './component/quickmenurules/quickmenurules.component';
import { FaqComponent } from './component/faq/faq.component';
import { LetsplaydashboardComponent } from './component/letsplaydashboard/letsplaydashboard.component';
import { LetsplaydashboardhomeComponent } from './component/letsplaydashboardhome/letsplaydashboardhome.component';
import { MakepickComponent } from './component/makepick/makepick.component';
import { HeadtoheadComponent } from './component/headtohead/headtohead.component';
import { LeaderboardComponent } from './component/leaderboard/leaderboard.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { ViewrulesletsplayComponent } from './component/viewrulesletsplay/viewrulesletsplay.component';
import { FaqletsplayComponent } from './component/faqletsplay/faqletsplay.component';
import { ViewnoticeComponent } from './component/viewnotice/viewnotice.component';
import { AvailableleagueletsplayComponent } from './component/availableleagueletsplay/availableleagueletsplay.component';
import { JoinleagueComponent } from './component/joinleague/joinleague.component';
import { HeadtoheadsummaryComponent } from './component/headtoheadsummary/headtoheadsummary.component';
import { MakepicksummaryComponent } from './component/makepicksummary/makepicksummary.component';
import { ContactleagueadminComponent } from './component/contactleagueadmin/contactleagueadmin.component';
import { ContactofficepickempoolComponent } from './component/contactofficepickempool/contactofficepickempool.component';
import { InvitenewplayerComponent } from './component/invitenewplayer/invitenewplayer.component';
import { PlayoffComponent } from './component/playoff/playoff.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { ChatdashboardComponent } from './component/chatdashboard/chatdashboard.component';
import { ChathomeComponent } from './component/chathome/chathome.component';
import { NewchatComponent } from './component/newchat/newchat.component';
import { AddchatComponent } from './component/addchat/addchat.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule,

    NativeScriptCommonModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    BodyComponent,
    InstructionsComponent,
    SubscribeComponent,
    SubscriptiondetailComponent,
    CreateleagueComponent,
    AvailableleagueComponent,
    LeaguedashboardComponent,
    LeaguedashboardhomeComponent,
    SchedulesComponent,
    ScoresComponent,
    NotesComponent,
    ViewplayersComponent,
    InvitefriendComponent,
    SendemailtoplayerComponent,
    LeagueinstructionsComponent,
    LeagueorganizerrulesComponent,
    ViewrulesleagueComponent,
    TheprocessrulesComponent,
    LogisticsofapprulesComponent,
    QuickmenurulesComponent,
    FaqComponent,
    LetsplaydashboardComponent,
    LetsplaydashboardhomeComponent,
    MakepickComponent,
    HeadtoheadComponent,
    LeaderboardComponent,
    StatisticsComponent,
    ViewrulesletsplayComponent,
    FaqletsplayComponent,
    ViewnoticeComponent,
    AvailableleagueletsplayComponent,
    JoinleagueComponent,
    HeadtoheadsummaryComponent,
    MakepicksummaryComponent,
    ContactleagueadminComponent,
    ContactofficepickempoolComponent,
    InvitenewplayerComponent,
    PlayoffComponent,
    WelcomeComponent,
    ChatdashboardComponent,
    ChathomeComponent,
    NewchatComponent,
    AddchatComponent,
  ],
  providers: [
    AppService,
    UsersService,
    SubscriptionService,
    LeagueService,
    NotesService,
    SchedulesService,
    ScoreService,
    MakePickService,
    InviteService,
    ViewPlayersService,
    HeadToHeadService,
    StatisticsService,
    LeaderService,
    ContactService,
    PlayoffService,
    ChatService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
