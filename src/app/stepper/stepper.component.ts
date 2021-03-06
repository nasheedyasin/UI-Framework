import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  showMePartially: boolean;

  @Output() stepperHide: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder,

    ) { }

  ngOnInit() {
    this.showMePartially = true;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  stepperStateChange(stepperState: boolean){
    this.stepperHide.emit(stepperState);
  }

}
