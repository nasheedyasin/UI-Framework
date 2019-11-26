import { Component, OnInit } from '@angular/core';
import { LibraryDataService } from '../library-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private libraryService : LibraryDataService,
    private httpClient : HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get("http://172.23.114.23:5000/api/TemplateLibrary").subscribe(
              (data: any) => { 
                  this.libraryService.templateList = data;
            }
          );
  }

}
