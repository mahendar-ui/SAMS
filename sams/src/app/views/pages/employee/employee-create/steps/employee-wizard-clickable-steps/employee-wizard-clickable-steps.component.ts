import { AfterViewInit, Component, ElementRef, OnInit, ViewContainerRef, ViewChild, ChangeDetectionStrategy, Directive, HostListener, Output, EventEmitter, Inject, Input } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';

@Component({
  selector: 'kt-employee-wizard-clickable-steps',
  templateUrl: './employee-wizard-clickable-steps.component.html',
  styleUrls: ['./employee-wizard-clickable-steps.component.scss']
})
export class EmployeeWizardClickableStepsComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

}
