import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { StudentAddEditComponent } from '../student-add-edit/student-add-edit.component';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomePage implements OnInit{
  isEditMode = false; // Flag to track the mode (add or edit)
  data: any;
  columns: any[] = [
    { prop: 'Roll' },
    { prop: 'Name' },
      { prop: 'Email' },
      { prop: 'Course' },
      { prop: 'Branch' },
      { prop: 'Mobile' },

  ];
  actions : any = "Action";
  public rows: any;
  constructor(private modalCtrl : ModalController,private http :HttpClient,private _stuService: StudentService,private alertCtrl: AlertController) {
  }
  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(){
    this._stuService.getStudentList().subscribe({
      next:(res) =>{
          this.http.get('http://localhost:3000/students').subscribe((res) => {
          this.data = res;
        });
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  deleteStudent(id:number){
    this.alertCtrl.create({header:"Are you sure?",message:"Do you really wanna to delete the student?",buttons:[{
      text: 'Cancel',
      role: 'cancel'
    },{
      text:"Delete",
      handler:()=>{
        this._stuService.deleteStudent(id).subscribe({
          next:(res) =>{
            this.getStudentList();
          },error:console.log,
        })
      }
    }]
  }).then(alertEl => {
    alertEl.present()
  })

  }
  async editStudent(data :any){
    this.isEditMode = true;
    const modal = await this.modalCtrl.create({
      component:StudentAddEditComponent,
        componentProps : {data:data}

    });
    modal.onDidDismiss().then((result) => {
      // Handle the modal dismissal event

        if(result){
          this.getStudentList();

      }
    });

    await modal.present();
  }

  async openModal(){
    this.isEditMode = true;
    const modal = await this.modalCtrl.create({
      component:StudentAddEditComponent,
      componentProps: { isEditMode: this.isEditMode }

    });
    modal.onDidDismiss().then((result) => {
      // Handle the modal dismissal event

        if(result){
          this.getStudentList();

      }
    });

    await modal.present();

  }
}
