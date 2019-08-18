import { Component, OnInit, Inject } from '@angular/core';
import { Port } from 'src/app/shared/port.model';
import { PortService } from 'src/app/shared/port.service';
import { RoutesService } from 'src/app/shared/routes.service';
import { NgForm } from '@angular/forms';
import { CruiseService } from 'src/app/shared/cruise.service';
import { Cruise } from 'src/app/shared/cruise.model';
import { Route } from 'src/app/shared/route.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cruise-routes',
  templateUrl: './cruise-routes.component.html',
  styles: []
})
export class CruiseRoutesComponent implements OnInit {
  formData: Route;
  itemList: Port[];
  isValid: boolean = true;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CruiseRoutesComponent>,
    private routeService: RoutesService,
    private cruiseService: CruiseService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.routeService.getPortList().then(res => this.itemList = res as Port[]);

    console.log("index of route : " + this.data.routesItemIndex);

    if (this.data.routesItemIndex == null)
    {
      this.formData =
        {
          id: null,
          cruiseId: this.data.cruiseId,
          days: 0,
          portId: 0,
          portName: ''
        }
      }
    else
    {
      
  
      this.formData = Object.assign({}, this.cruiseService.routes[this.data.routesItemIndex]);
    }

  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.routesItemIndex == null)
      {
        console.log("pushed : " + form.value);
        this.cruiseService.routes.push(form.value);
      }
      else
      {
        console.log("updated : " +form.value);
        this.cruiseService.routes[this.data.routesItemIndex] = form.value;
      }
      console.log(this.cruiseService.routes);
      this.dialogRef.close();
    }
    else
    {
      this.toastr.error('Please check errors', 'Route');
    }
  }
/*
  onChange(selectedId: number) {
    console.log("selectedId = " + selectedId);
   // var selectedItem = this.itemList.find((x: any) => x.Id == selectedId);
   // console.log(selectedItem["title"]);
  }
*/
  onChange($event){
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    this.formData.portName= text;
    }



  validateForm(formData: Route) {
    this.isValid = true;
    if (formData.portId == 0)
      this.isValid = false;
    else if (formData.days <= 0)
      this.isValid = false;
    return this.isValid;
  }


}
