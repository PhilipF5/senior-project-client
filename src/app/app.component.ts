import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, ModalController, MenuController, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginProvider } from '../providers/login';
import { AccountProvider } from '../providers/account';
import { LoginPage } from '../pages/login/login';
import { AccountViewPage } from '../pages/account-view/account-view';
import { AuctionListPage } from '../pages/auction-list/auction-list';
import { ProfileViewPage } from '../pages/profile-view/profile-view';

@Component({
  	templateUrl: 'app.html'
})

export class MyApp {
  	rootPage = HomePage;
	accountViewPage;
	auctionListPage;
	profileViewPage;
	@ViewChild('content') nav: NavController;

	constructor(platform: Platform, public loginProvider: LoginProvider, public acctProvider: AccountProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public menuCtrl: MenuController) {
    	platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
    	});
		
		this.accountViewPage = AccountViewPage;
		this.auctionListPage = AuctionListPage;
		this.profileViewPage = ProfileViewPage;
  	}
	
	showLogoutConfirm() {
		let confirm = this.alertCtrl.create({
			title: 'Log out?',
			message: 'Are you sure you want to log out?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						
					}
				},
				{
					text: 'Log Out',
					handler: () => {
						this.menuCtrl.close();
						this.loginProvider.creds = {
							apiKey: null,
							error: null,
							firstName: null,
							lastName: null,
							role: null,
							username: null
						};
						let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
						modal.present();
					}
				}
			]
		});
		confirm.present();
	}
}
