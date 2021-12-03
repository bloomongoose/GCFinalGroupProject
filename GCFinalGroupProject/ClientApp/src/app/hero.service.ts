import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { secret } from '../secret';
import { UserInventory } from './UserInventory';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  apiKey: string = secret.apiKey;
  apiUrl: string = "https://superheroapi.com/api.php/";


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string
) {
    
  }
   

  getRandomId(): number {
    const max: number = 731;
    return Math.floor(Math.random() * max) + 1;
  }


  getRandomHero(): any {
    let baseUrl: string = this.apiUrl + this.apiKey;
    return this.http.get(baseUrl + "/" + this.getRandomId());
  }

  //pass all userInventory parameters through url.
  newAccount(inv: UserInventory): any {
    return this.http.post(this.baseUrl + `api/hero/newAccount?_HeroID=${inv.HeroID}&_ItemOne=${inv.ItemOne}&_ItemTwo=${inv.ItemTwo}$_Money=${inv.Money} `, {});
  }




}

