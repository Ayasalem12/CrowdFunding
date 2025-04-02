import { Component, inject } from '@angular/core';
import { RouterLink ,RouterLinkActive} from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormsModule, } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  private formBuilder = inject(FormBuilder)
  // constructor(private formBuilder:FormBuilder){

  // }
  userImage = 'https://github.com/mdo.png';
  // profileForm = new FormGroup({
  //   userName: new FormControl(''),
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  //   image: new FormControl(''),
  //   phone: new FormArray([
  //     new FormControl(''),
  //   ]),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //   }),
  // })
  profileForm = this.formBuilder.group({
    userName:[{value:'',disabled:true}],
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    image: [''],
    phones: this.formBuilder.array([
      [this.formBuilder.control(''),[Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
    ]),
    address: this.formBuilder.group({
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
    }),
  })
  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get address() { return this.profileForm.get('address'); }
  // Access FormArray
  get phones(): FormArray{
    return this.profileForm.get('phones') as FormArray;
  }
  addPhone(){
    this.phones.push(this.formBuilder.control(''));
  }
  removePhone(index : number){
    if(this.phones.value){
      this.phones.removeAt(index);
    }
  }
  onSubmit(){
    console.log(this.profileForm.value);
  }
}
