import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/core/auth';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
interface stakeHolders {
	value: string;
	viewValue: string;
  }
@Component({
  selector: 'kt-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  profileForm:FormGroup;
  profile:any;
  universityField : boolean = false;
	bankField : boolean = false;
  stakeHolders: stakeHolders[] = [
		{value: 'US', viewValue: 'Student'},
		{value: 'BOS', viewValue: 'Bank'},
		{value: 'UAD', viewValue: 'University'}
	  ];
	  universities: stakeHolders[] = [
		{value: 'UEL', viewValue: 'University of East London'},
		{value: 'UCL', viewValue: 'University College London '},
		{value: 'LSE', viewValue: 'London School of Economics and Political Science'}
	  ];
	  banks: stakeHolders[] = [
		{value: 'HSBC', viewValue: 'HSBC'},
		{value: 'LLOYDS', viewValue: 'Lloyds'},
		{value: 'BARCLAYS', viewValue: 'Barclays'}
	  ];
  constructor(private profileFB: FormBuilder,
    private profileService: ProfileService,
    private layoutUtilsService: LayoutUtilsService,) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      username: new FormControl(),
      email:new FormControl(),
      phone_number:new FormControl(),
      stakeholder:new FormControl(),
      fullname:new FormControl()
    });
    this.profileForm.controls.username.disable();
    this.profileForm.controls.email.disable();
    const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
    this.profileService.getUserById(authInfo.userInfo.id).subscribe(result => {
      if(result){
        this.profile = result;
        this.profileForm.patchValue({
          username: this.profile.username,
          email: this.profile.email,
          fullname:this.profile.fullname,
          phone_number: this.profile.phone_number,
          stakeholder:this.profile.stakeholder,
        })
      }
    })
  }
	selectedChange({value}):void{
		if(value == 'US' || value == 'UAD'){
			this.bankField = false;
			this.universityField = true;
		}else{
			this.universityField = false;
			this.bankField = true;
		}
  }
  onSubmit() {
		this.profile.username = this.profileForm.controls.username.value;
    this.profile.email = this.profileForm.controls.email.value;
    this.profile.fullname = this.profileForm.controls.fullname.value;
		this.profile.stakeholder = this.profileForm.controls.stakeholder.value;
    this.profile.phone_number = this.profileForm.controls.phone_number.value;
    debugger;
		this.profileService.updateProfile(this.profile).subscribe(
			results => {
				if (!results) {
					console.log('Profile not updated');
				}
				const message = `Profile Successfully has been Updated.`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
			}
		)
	}
}
