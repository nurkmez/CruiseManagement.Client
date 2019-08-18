import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CruiseService } from '../shared/cruise.service';

@Component({
  selector: 'app-cruises',
  templateUrl: './cruises.component.html',
  styles: []
})
export class CruisesComponent implements OnInit {

  cruiseList;

  constructor(private service: CruiseService,
    private router: Router,
    private toastr: ToastrService) { }

    ngOnInit() {
      this.refreshList();
    }
  
    refreshList() {
      this.service.getCruiseList().then(res => this.cruiseList = res);
    }
  
    openForEdit(cruiseID: number) {
      console.log("cruiseID = " + cruiseID);
      this.router.navigate(['/cruise/edit/' + cruiseID]);
    }
  
    onCruiseDelete(id: number) {
      if (confirm('Are you sure to delete this record?')) {
        this.service.deleteCruise(id).then(res => {
          this.refreshList();
          this.toastr.warning("Deleted Successfully", "Cruise Management App.");
        });
      }
    }
}
