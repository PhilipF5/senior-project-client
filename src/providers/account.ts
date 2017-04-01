import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginProvider } from '../providers/login';

/*
  Generated class for the Account provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountProvider {
	
	myAccount = {
		address: null,
		availableCredit: null,
		city: null,
		contactEmail: null,
		contactPhone: null,
		id: null,
		owner: null,
		postalCode: null,
		state: null,
		stateCode: null,
		totalCredit: null,
		totalSpent: null,
		usedCredit: null
	};
	
	accounts = [];
	
	sortBySpent = [];
	
	selectedAcct = 0;
	
	selectedAcctID = 1;

	constructor(public http: Http, public loginProvider: LoginProvider) {
		console.log('Hello Account Provider');
	}
	
	loadMyAccount() {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/accounts/" + this.loginProvider.creds.apiKey)
			.subscribe(
				res => this.myAccount = res.json(),
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}
	
	loadAllAccounts() {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/accounts/" + this.loginProvider.creds.apiKey)
			.subscribe(
				res => this.accounts = res.json(),
				(err) => {},
				() => {
					this.sortBySpent = this.accounts.slice().sort((obj1, obj2) => {
						if (obj1.totalSpent < obj2.totalSpent) {
							return -1;
						}
						else if (obj1.totalSpent > obj2.totalSpent) {
							return 1;
						}
						else return 0;
					});
					this.sortBySpent.reverse();
					resolve();
				}
			);
		});
	}

}
