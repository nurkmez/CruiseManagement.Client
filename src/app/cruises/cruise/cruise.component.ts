import { Component, OnInit, Inject } from '@angular/core';
import { CruiseService } from 'src/app/shared/cruise.service';
import { Cruiseline } from 'src/app/shared/cruiseline.model';
import { Ship } from 'src/app/shared/ship.model';
import { Cabintype } from 'src/app/shared/cabintype.model';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CruiseRoutesComponent } from '../cruise-routes/cruise-routes.component';
import { $ } from 'protractor';

@Component({
  selector: 'app-cruise',
  templateUrl: './cruise.component.html',
  styles: []
})
export class CruiseComponent implements OnInit {
  cruiseLineList: Observable<Cruiseline[]>;
  shipList: Observable<Ship[]>;
  cabintypeList: Observable<Cabintype[]>;



  isValid: boolean = true;



  constructor(private service: CruiseService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) {

  }

  ngOnInit() {

    let cruiseId = this.currentRoute.snapshot.paramMap.get('id');
    console.log(cruiseId);
    if (cruiseId == null)
      this.resetForm();
    else {
      this.service.getCruiseByID(parseInt(cruiseId)).then(res => {
        console.log(res);
        this.service.formData = res;
        this.service.formData.deletedRoutesIDs = '';  
        

        this.service.routes = res.routes;
        this.changeCruiseLine(this.service.formData.cruiseLineId, this.service.formData.shipId );
        console.log(this.service.routes);

      });
    }

    this.cruiseLineList = this.service.getCruiseLines();


  }


  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      id: null,
      cruiseLineId: 0,
      shipId: 0,
      cabinTypeId: 0,
      title: '',
      departureDate: new Date(),
      flightIncluded: false,
      deletedRoutesIDs: '',
      cruiseLineName:'',
      shipName :'',
      cabinTypeName:''

    };

    this.service.routes = [];

  }


  changeCruiseLine(crusiseLineId: number, shipId?:number) {
    console.log("changeCruiseLine with params = " + crusiseLineId);
    this.shipList = this.service.getShips(crusiseLineId);
    this.cabintypeList = new Observable<Cabintype[]>();
    if(shipId!=null && shipId>0)
    {
      this.changeShips(shipId);
    }
    //this.shipList = new Observable<Ship[]>();
  }

  changeShips(shipId: number, cabinTypeId?:number) {
    console.log("changeShips with params = " + shipId);
    this.cabintypeList = this.service.getCabinTypes(shipId);
  }

  onDeleteRouteItem(routeId: number, i: number) {
    if (routeId != null && routeId !== undefined)
      this.service.formData.deletedRoutesIDs += routeId + ",";
    
    this.service.routes.splice(i, 1);
  }

  AddOrEditRouteItem(routesItemIndex, cruiseId) {
    console.log("routesItemIndex=" + routesItemIndex + ", cruiseId= " + cruiseId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { routesItemIndex, cruiseId };
    this.dialog.open(CruiseRoutesComponent, dialogConfig);
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.shipId == 0 || this.service.formData.cruiseLineId == 0 || this.service.formData.cabinTypeId == 0)
      this.isValid = false;
    else if (this.service.formData.title.trim() == "")
      this.isValid = false;
    else if (this.service.formData.departureDate == null)
      this.isValid = false;
    else if (this.service.routes.length == 0)
      this.isValid = false;
    return this.isValid;
  }


  onSubmit(form: NgForm) {

    if (this.validateForm()) {
        console.log("validated form");
      this.service.saveOrUpdateCruise().subscribe(res => {
        this.resetForm();
        this.toastr.success('Submitted Successfully', 'Cruise Management App.');
        this.router.navigate(['/cruises']);
      })
    }
    else
    {
      console.log("not validated form");
    }

  }

}
