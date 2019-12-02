import { Component, OnInit } from '@angular/core';
import { FileNameService } from '../file-name.service';
import { HttpClient } from '@angular/common/http';
import { ExtractedInformationService } from '../extracted-information.service';
import { FileData } from '../extraction-module/pdf-uploader/pdf-uploader.component';

interface IInvoiceInformation{
  markedImgs:string[];
  extractedData: any;
}


@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
})

export class UploadListComponent implements OnInit {

  showFlag : boolean = false;
  fileList: FileData[]= null;

  myJson = {
    "FileName":"",
    "FileList":[],
    "FileType":""
  }

  invoiceInfoList: { [invoiceName: string] : IInvoiceInformation; } = {};

  b64MarkedImg: any = null; // contains the recieved base64 images

  constructor(
              private fileNameService : FileNameService,
              private http:HttpClient,
              private extractedInformation : ExtractedInformationService
              ){ }
  
  ngOnInit() {
    this.fileList = this.fileNameService.fileCollection;
    this.myJson = {
      "FileName":this.fileList[0].fileName,
      "FileList":this.fileList,
      "FileType":this.fileNameService.fileType
    }    

  }
  // displayInfo() {   
  //   // change the IP when in office
  //   // IP (Office): 172.23.179.252 / 172.23.115.77 / 172.23.179.17
  //   // IP (Home): 192.168.0.102
  //   this.http.post("http://127.0.0.1:5000/api/InfoExtractor  ",this.myJson).subscribe(
  //     (data: any) => {
  //       this.extractedInformation.fileName = data["FileName"];
  //       this.extractedInformation.b64MarkedImages = data["MarkedImages"];
  //       this.extractedInformation.extractedData = data["Info"];      
  //       this.showFlag = false;                          
  //     }
  //   );
    
  // }

  displayInfo(index: number){
      var invFile = this.fileList[index].fileName;
      if (invFile in this.invoiceInfoList){
        this.extractedInformation.fileName = invFile;
        this.extractedInformation.b64MarkedImages = this.invoiceInfoList[invFile].markedImgs;
        this.extractedInformation.extractedData = this.invoiceInfoList[invFile].extractedData;     
        return;
      }

      this.showFlag = true;
      this.myJson = {
        "FileName":invFile,
        "FileList":this.fileList,
        "FileType":this.fileNameService.fileType
      } 
      // IP (Office): 172.23.179.252 / 172.23.115.77
      // IP (Home): 192.168.0.102
      // this.http.post("http://127.0.0.1:5000/api/ConvertPDFs",this.myJson).subscribe(
      //   (data: any) => {
      //     this.displayInfo();
      //   }
      // );

      this.http.post("http://127.0.0.1:5000/api/InfoExtractor  ",this.myJson).subscribe(
        (data: any) => {
          this.extractedInformation.fileName = data["FileName"];
          this.extractedInformation.b64MarkedImages = data["MarkedImages"];
          this.extractedInformation.extractedData = data["Info"];      
          this.showFlag = false;                          
        }
      );
                
    }

    batchExtract(){
      
      this.fileList.forEach(element => {
        this.showFlag = true;
        this.myJson = {
          "FileName":element.fileName,
          "FileList":this.fileList,
          "FileType":this.fileNameService.fileType
        } 

        this.http.post("http://127.0.0.1:5000/api/InfoExtractor  ",this.myJson).subscribe(
          (data: any) => {
            this.invoiceInfoList[data["FileName"]] = {markedImgs: data["MarkedImages"], 
                                                        extractedData:  data["Info"]}  
                                                        
            this.showFlag = false;
          }
        );

      });


    }

}
