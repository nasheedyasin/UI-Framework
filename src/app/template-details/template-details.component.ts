import { Component, OnInit } from '@angular/core';
import { LibraryDataService } from '../library-data.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss']
})
export class TemplateDetailsComponent implements OnInit {


  infoVar : any ;
  infoExtracted :any;
  b64MarkedImages:string[];

  filterApplied:string;
  imageSource:string[] = ["../../assets/BlankTemplateStockImage.png"];
  firstEntity : string ;
  showStaticImage : boolean = true ;
  fileName:string;
  constructor(
    private libraryService : LibraryDataService,
    private notifyService : NotificationService

  ) { }

  ngOnInit() {
    this.infoVar = this.libraryService.extractedInformation;
    // this.infoExtracted = this.libraryService.extractedInformation;
    //this.firstEntity = this.libraryService.extractedInformation[1];
    //this.imageSource = this.libraryService.extractedInformation["Investor No"][1];
    //this.imageSource = "../../assets/BlankTemplateStockImage.png";
    
    // this.filterApplied = null;
  }

  applyFilter(templateName: string){
    this.showStaticImage = false;
    this.filterApplied = templateName;
    const newSource = [];
    newSource.push(this.infoVar[templateName][1]);
    this.imageSource = newSource;
  }

  resetFilter(){
    this.filterApplied = null;
    this.showStaticImage = true;
    this.notifyService.showSuccess("Filter Reset","")

  }

  

}
