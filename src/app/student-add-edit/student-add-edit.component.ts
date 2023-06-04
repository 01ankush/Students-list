import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { StudentService } from '../services/student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss'],
})
export class StudentAddEditComponent implements OnInit {
  @Input() isEditMode: boolean;
  user : any = {};
  RegisterForm: FormGroup | any;
  studentData: any;
  // data: Object;
  constructor(private modalCtrl: ModalController,public formBuilder: FormBuilder,private _stuService : StudentService,private _fb :FormBuilder,private _http: HttpClient,private navParams: NavParams)
  {
    this.user = this.navParams.get('data');
    this.RegisterForm = this._fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]),
      roll: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/[0-9]/),
        Validators.maxLength(10)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      mobile: new FormControl('',[
        Validators.required,
        Validators.pattern(/[0-9\+\-\ ]/),
        Validators.maxLength(10)
      ]),
      course: new FormControl('',[
        Validators.required,
        Validators.maxLength(10)
      ]),
      branch: new FormControl('',[
        Validators.required,
        Validators.maxLength(10)
      ])
    });
  }
  close(){
    this.isEditMode = true;
    const formValues = this.RegisterForm.value;
    this.studentData = {
      name: formValues.name,
      roll: formValues.roll,
      course: formValues.course,
      branch: formValues.branch,
      mobile: formValues.mobile,
      email: formValues.email
    };
    // }
    const apiUrl = ' http://localhost:3000/students/' + this.user.id;

    this._http
      .put(apiUrl, (this.studentData))
      .subscribe(
        () => {
          this.modalCtrl.dismiss(true);
        },
        error => {
          console.error('Failed to update student:', error);
        }
      );
}

  dismissModal(updatedFormData?:any) {
    this.modalCtrl.dismiss(updatedFormData);
  }
  onSubmit() {
    if(this.RegisterForm.valid){
      this._stuService.addStudent(this.RegisterForm.value).subscribe({
        next :(val:any)=>{
          alert('Student Added Successfully');
          this.modalCtrl.dismiss(true);
        },
        error:(err:any) => {
          console.error(err);
        }
      })
    }
  }


  ngOnInit() {
    this.RegisterForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]),
      roll: new FormControl(this.user.roll,[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]),
      email: new FormControl(this.user.email,[
        Validators.required,
        Validators.email
      ]),
      mobile: new FormControl(this.user.mobile,[
        Validators.required,
        Validators.maxLength(10)
      ]),
      course: new FormControl(this.user.course,[
        Validators.required,
        Validators.maxLength(10)
      ]),
      branch: new FormControl(this.user.branch,[
        Validators.required,
        Validators.maxLength(10)
      ])
    });
  }
}
