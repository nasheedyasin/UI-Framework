import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { FileNameService } from 'src/app/file-name.service';
import { LibraryDataService } from '../library-data.service';


@Component({
  selector: 'app-invoice-type',
  templateUrl: './invoice-type.component.html',
  styleUrls: ['./invoice-type.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class InvoiceTypeComponent implements OnInit {

  constructor(private route: Router,
              private libraryService : LibraryDataService,
              private fileNameService: FileNameService
    ){ }

  panelColor = new FormControl('red');

// constructor() { }
  selectedOption = "--select--";

    // data:Array<Object> = [
    //   {id: 0, name: "AmeriHome"},
    //   {id: 1, name: "BoA"},
    //   {id: 2, name: "Caliber"},
    //   {id: 3, name: "Chase"},
    //   {id: 4, name: "Cenlar"},
    //   {id: 5, name: "Wells Fargo"},
    //   {id: 6, name: "Arvest Central Mortgage"},
    //   {id: 7, name: "BoA HELOC"},
    //   {id: 8, name: "BBVA Compass"},
    //   {id: 9, name: "Freedom Mortgage"},
    //   {id: 10, name: "Ditech"},
    //   {id: 11, name: "Dovenmuhle"},
    // ];

    vendors:string[];

    config = {
      displayKey:"description", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false,
      height: 5, //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder:'Search', // label thats displayed in search input,
      // searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
   

  ngOnInit() {
    this.vendors = this.libraryService.templateList.trainedTemplatesList;
  }


  selected(selectedOption) {
    this.selectedOption = selectedOption.value;
    this.fileNameService.fileType = this.selectedOption;
  }
  
}
