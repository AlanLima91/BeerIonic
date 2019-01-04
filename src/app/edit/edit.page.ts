import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BeerService } from '../beer.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit
{
  key: string;
  beer:Object;

  constructor(private route: ActivatedRoute, private http: HttpClient, private beerService: BeerService, private router: Router, private alertController: AlertController)
  {
    //Get the key
    this.route.params.subscribe( params =>
      {
        this.key = params.key;
      });
  }

  ngOnInit()
  {
    this.getBeerByKey(this.key);
  }

  //Get the beer 
  getBeerByKey(key)
  {
    this.beerService.getBeerByKey(key).subscribe(data => 
      {
        this.beer = data;
      }
    );
  }

  //Edit beer
  onSubmit(form)
  {
    this.beerService.editBeer(form.form.value, this.key).subscribe(beer =>
      {
        this.editForm();
        this.router.navigateByUrl('');
      });
  }


  async editForm()
  {
    const edit = await this.alertController.create({
      header: 'Beer updated',
      message: 'Your beer has been updated',
      buttons:[
        {
          text: 'OK',
          handler: () => { }
        }
      ]
    });
    await edit.present();
  }
}
