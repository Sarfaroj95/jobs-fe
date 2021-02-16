import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from "ng6-toastr-notifications";
import { Router } from "@angular/router";

import { AuthService } from "../service/service.service"

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  careerForm: FormGroup
  submitbtn: boolean = false
  selectedcounty = "CA";
  constructor(private fb: FormBuilder, private toastr: ToastrManager, private auth: AuthService, private router: Router) { }

  city: any = [
    { "cityName": "Bangalore" },
    { "cityName": "Hyderabad" },
    { "cityName": "Kolkata" },
    { "cityName": "Delhi" },
    { "cityName": "Mumbai" }
  ]

  jobrole: any = [
    { "jobtype": "Frontend Developer" },
    { "jobtype": "Backend Developer" },
    { "jobtype": "Devops Developer" }
  ]

  salaryrange: any = [
    { "range": "25000 - 45000", "value": "25000-45000" },
    { "range": "45000 - 65000", "value": "45000-65000" },
    { "range": "65000 - 85000", "value": "65000-85000" }
  ]

  jobtype: any = [
    { "name": "Yes" },
    { "name": "No" }
  ]



  ngOnInit() {
    this.initForm()
  }
  initForm() {
    this.careerForm = this.fb.group({
      fullname: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],

      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      phone: ["", [Validators.required, Validators.pattern("^[1-9][0-9,]+$")]],
      cityname: ["", Validators.required],
      jobtype: ["", Validators.required],
      salaryrange: ["", Validators.required],
      arefresher: ["", Validators.required],
      startdate: ["", Validators.required],
      file: ["", Validators.required]



    });
  }

  onSubmit() {
    let value = this.careerForm.value
    console.log("data", value)
    this.submitbtn = true
    this.auth.career(value).subscribe(
      res => {
        console.log("data", res.data)
        this.toastr.successToastr("Registered Successfully.", "Success!", { timeOut: 3000 });
        this.careerForm.reset()
        this.submitbtn = false

      },
      error => {
        console.log("data", error)
        let er = error.error.errors[0];
        this.toastr.errorToastr(er.details, er.title, { timeOut: 3000 });
        this.submitbtn = false


      }
    )
  }

}
