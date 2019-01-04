import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BeerService } from '../beer.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page
{
  constructor(private router:Router, private beerService: BeerService, private alertController: AlertController) { }

  // Generate an AlertBox when a new beer is added
  async submitForm()
  {
    const sub = await this.alertController.create({
      header: 'New beer added',
      message: 'Your new beer has been added',
      buttons:[
        {
          text: 'OK',
          handler: () => { }
        }
      ]
    });
    await sub.present();
  }

  // Push the form to the firebase
  onSubmit(form)
  {
    this.beerService.addBeer(form.form.value).subscribe(beer =>
      {
        this.submitForm();
        this.router.navigateByUrl('');
      });
  }
}
