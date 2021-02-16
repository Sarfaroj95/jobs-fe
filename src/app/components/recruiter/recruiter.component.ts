import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/service.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { DetailsComponent } from "../details/details.component"

const state = ['Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Pune', 'Hydrabad']
const jobs = ['Angular', 'React Js', 'Vue Js', 'Frontend Developer', 'Backend Developer', 'Java Developer', 'Node Js Developer', 'Dev Ops']




import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'view', 'cctc', 'ectc', 'symbol', 'location', 'join'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  formatter = (result: string) => result.toUpperCase();
  students: any = []
  search: FormGroup
  datlen
  results: any = []



  constructor(private service: AuthService,
    private route: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) {
    var tok = this.service.getToken()
    if (!tok) {
      this.route.navigate(['/signin'])
    }
    var UserT = this.service.getUsertype();
    switch (UserT) {
      case 'admin':
        this.route.navigate(['/admin'])
        break;
      case 'recruiter':
        this.route.navigate(['/recruiter'])
        break;
      case 'partner':
        this.route.navigate(['/partner'])
        break;
      default:
        this.route.navigate(['/signin'])
    }
  }

  ngOnInit() {
    this.initForm();
    this.getUser();
  }


  initForm() {
    this.search = this.fb.group({
      jobrole: [""],
      location: [""]
    })
  }

  searchReset() {
    this.search.reset();
    this.getUser()
  }


  onSubmit() {
    var da = this.search.value.jobrole;
    var location = this.search.value.location;
    console.log("My value", da, location)
    this.service.Search(da, location,).subscribe(
      result => {
        console.log("Data", result)
        this.datlen = result.length
        this.students = new MatTableDataSource(result);
        this.students.paginator = this.paginator;
      }
    )
  }




  getUser() {
    this.service.getApllication().subscribe(
      result => {

        this.students = new MatTableDataSource(result);
        this.students.paginator = this.paginator;

      }
    )
  }


  openDialog(id): void {
    console.log("Id", id)
    this.service.Details(id).subscribe(
      result => {
        console.log("Data", result)
        this.results = result
      }
    )
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "650px",

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });


  }




  logout() {
    this.service.LogOut();
    this.route.navigate(['/signin'])

  }


  searchstate = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : state.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchjob = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : jobs.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
}

@Component({
  selector: 'details',
  templateUrl: 'details.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

