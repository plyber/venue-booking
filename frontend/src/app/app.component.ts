import { Component, OnInit } from '@angular/core';
import { DataService } from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  testData:any;

  constructor(private dataService: DataService){
  }
  ngOnInit(){
    // this.dataService.createReservation({"name": "John", "address": "Highway 37"}).subscribe(data=>{
    //   console.log(data)
    //   this.testData=data;
    // })
  }
}
