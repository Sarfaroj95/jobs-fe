import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { AuthService } from '../../service/service.service';


export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  getdata: any
  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: AuthService

  ) {
    // var id = this.service.getId();
    this.service.Details(data).subscribe(
      result => {
        console.log("Data s", result)
        this.getdata = result

      }
    )
    console.log("id", data)

  }



  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

  }

}
