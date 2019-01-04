import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit
{
  key: string;
  beer: Object;

  constructor(private route: ActivatedRoute, private http: HttpClient, private beerService: BeerService)
  {
    this.route.params.subscribe( params => this.key = params.key)
  }

  ngOnInit()
  {
    this.getBeerByKey(this.key);
  }

  getBeerByKey(key)
  {
    this.beerService.getBeerByKey(key)
    .subscribe(data => {
     this.beer = data;
     console.log(typeof(this.beer));
    });
  }
}
