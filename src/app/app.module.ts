import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CruisesComponent } from './cruises/cruises.component';
import { CruiseComponent } from './cruises/cruise/cruise.component';
import { CruiseRoutesComponent } from './cruises/cruise-routes/cruise-routes.component';
import { CruiseService } from './shared/cruise.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@NgModule({ 
  declarations: [
    AppComponent,
    CruisesComponent,
    CruiseComponent,
    CruiseRoutesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserModule,
    FormsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  entryComponents:[CruiseRoutesComponent],
  providers: [CruiseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
