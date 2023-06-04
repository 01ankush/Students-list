import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePageRoutingModule } from './home-routing.module';
import { StudentAddEditComponent } from '../student-add-edit/student-add-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [HomePage,StudentAddEditComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
