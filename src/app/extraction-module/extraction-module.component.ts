import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryDataService } from '../library-data.service';

@Component({
  selector: 'app-extraction-module',
  templateUrl: './extraction-module.component.html',
  styleUrls: ['./extraction-module.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExtractionModuleComponent implements OnInit {

  hideStepper: boolean;
  constructor(
    private httpClient : HttpClient,
    private libraryService : LibraryDataService,
  ) { }
  
  ngOnInit() {
    if (!this.libraryService.templateList){
      this.loadTemplateData();
    }
    this.hideStepper = false;
  }
  stepperStateChange(hideFlag: boolean){
    if (!this.libraryService.templateList){
      this.loadTemplateData();
    }
    this.hideStepper = hideFlag;
  }
  loadTemplateData(){
    this.httpClient.get("http://127.0.0.1:5000/api/TemplateLibrary").subscribe(
              (data: any) => { 
                  this.libraryService.templateList = data;
            }
      );
  }
}
