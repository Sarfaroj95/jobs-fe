import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'weight', 'symbol'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  t_user: any
  students
  t_applicant: any


  constructor(private service: AuthService, private route: Router) {
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
    this.getUser();
    this.getApplicant();
  }

  getUser() {
    this.service.GetadminUser().subscribe(
      result => {
        this.t_user = (result.length)
        this.students = new MatTableDataSource(result);
        this.students.paginator = this.paginator;

      }
    )
  }
  getApplicant() {
    this.service.getApllication().subscribe(
      result => {
        this.t_applicant = result.length;
      }
    )
  }

  Aciveted(bolean, id) {
    if (bolean == true) {
      this.service.InactiveUser(id).subscribe(
        result => {

          this.getUser();
        }
      )
    } else {
      this.service.ActiveUser(id).subscribe(
        result => {
          console.log("User", result)
          this.getUser();
        }
      )

    }
    console.log("Id nomber")
  }


  logout() {
    this.service.LogOut();
    this.route.navigate(['/signin'])

  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


