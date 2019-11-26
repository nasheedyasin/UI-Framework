import { Component, OnInit } from '@angular/core';
import { LibraryDataService } from '../library-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-tiles',
  templateUrl: './template-tiles.component.html',
  styleUrls: ['./template-tiles.component.scss']
})
export class TemplateTilesComponent implements OnInit {

  showSpinner: boolean;
  data: string[];
  myJson =  {
    "FileType" : ""
  }
  constructor(
              private libraryService : LibraryDataService,
              private httpClient : HttpClient
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
    this.data =  this.libraryService.templateList["trainedTemplatesList"];
  }

  TestFunction(fileType) {
    this.showSpinner = true;
    this.libraryService.fileType = fileType;
    this.myJson = {
      "FileType" : fileType
    }
    this.httpClient.post("http://172.23.114.23:5000/api/TemplateDetails ",this.myJson).subscribe(
      (data:any) =>
      {
      this.libraryService.extractedInformation = data["Info"];
      
      }
      
    );
  }
}
