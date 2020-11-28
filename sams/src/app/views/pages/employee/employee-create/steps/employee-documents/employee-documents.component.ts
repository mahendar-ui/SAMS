import { AfterViewInit, Component, ElementRef, OnInit, ViewContainerRef,
   ViewChild, ChangeDetectionStrategy, Directive, HostListener, Output, EventEmitter, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee, EmployeeService } from 'src/app/core/auth';
// Service
import { FileUploadService } from 'src/app/core/auth/_services/file-upload.service';
@Component({
  selector: 'kt-employee-documents',
  templateUrl: './employee-documents.component.html',
  styleUrls: ['./employee-documents.component.scss']
})
export class EmployeeDocumentsComponent implements OnInit {
  isActive: boolean;
  upload: any;
  uploadedData: any;
  documentFormData: any;
  defaultEmployeeWizardForm:any;
  @Input() employeeDocumentsForm: FormGroup;
  EmployeeWizardForm: FormGroup;
  @Output() nextSubmit = new EventEmitter<any>();
  @Output() prevSubmit = new EventEmitter<any>();
  employee:Employee;
  constructor(
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private employeeFB: FormBuilder,
    private employeeService:EmployeeService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.employeeService.getEmployeeById(id).subscribe(results => {
                if(results){
                  this.employee = results;
                  this.employeeDocumentsForm.patchValue({
                    id_proof: this.employee.id_proof,
                    visa_type: this.employee.visa_type,
                  })
                }
            });
      } else {
          this.employee = new Employee();
          this.employee.clear();
        }
    })
  }
  onDroppedFile(droppedFiles: any, fileType: any) {
    const formData = new FormData();
    for (let item of droppedFiles) {
      const itemNameChange = item.slice(0, item.size, item.type);
      item = new File([itemNameChange], Date.now() + '-' + item.name.replace(/\s/g, '-'), { type: item.type });
      formData.append('userfiles', item);
    }
    this.fileUploadService.fileUpload(formData).subscribe(
      result => {
        this.upload = result;
        if (fileType === 'employee-prof') {
          this.uploadedData = this.upload.files;
        } else {
          this.documentFormData = this.upload.files;
        }
      }
    )
  }
  // File Upload
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
  }
  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }
  onSelectedProfFile(event: any) {
    if (event.target.files.length > 0) {
      const idProf = 'employee-prof';
      this.onDroppedFile(event.target.files, idProf);
    }
  }
  onSelectedVisaFile(event: any) {
    if (event.target.files.length > 0) {
      const idProf = 'employee-visa';
      this.onDroppedFile(event.target.files, idProf);
    }
  }
  // Next Step
  nextStep() {
    if (this.employeeDocumentsForm.invalid) {
      this.employeeDocumentsForm.markAllAsTouched();
      return;
    } else {
      this.nextSubmit.next();
    }
  }
  //Prev Step
  prevStep() {
    this.prevSubmit.next();
  }

}