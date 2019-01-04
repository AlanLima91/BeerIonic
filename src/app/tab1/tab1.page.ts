import { Component, OnInit } from '@angular/core';
import { Beer } from '../beer';
import { Observable, Subject } from 'rxjs';
import { BeerService } from '../beer.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit
{
  liste: any[] = [];
  beers$: Observable<Beer[]>;

  constructor(private beerService: BeerService, private alertController: AlertController) { }

  ngOnInit()
  {
    this.getBeers();
  }

  getBeers()
  {
    this.beerService.getBeers().subscribe(data =>
      {
        this.liste = [];
        let cle = Object.keys(data);
        let donnees = Object.values(data);
        for(let i = 0; i < cle.length; i++)
        { 
          this.liste.push({key: cle[i], values:donnees[i]});
        }
      });
  }

  async alertDel(key)
  {
    const del = await this.alertController.create({
      header: 'Delete a Beer ?',
      message: 'Are you sure want delete this beer ?',
      buttons:[
        {
          text: 'No',
          cssClass: 'danger',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () =>
          {
            this.deleteBeer(key);
          }
        }
      ]
    });
    await del.present();
  }

   deleteBeer(key)
   {
     this.beerService.deleteBeer(key).subscribe();
     this.liste = this.liste.filter(liste => liste.key !== key);
   }

  public ionViewWillEnter():void
  {
    this.getBeers();
  }
}
