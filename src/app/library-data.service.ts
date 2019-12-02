import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryDataService {

  fileType : string;
  templateList : any = null;
  extractedInformation : any = null ;
  infoVariable : any;
  constructor() { }
}
