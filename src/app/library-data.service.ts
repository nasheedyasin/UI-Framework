import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryDataService {

  fileType : string;
  templateList : any ;
  extractedInformation : any = null ;
  infoVariable : any;
  constructor() { }
}
