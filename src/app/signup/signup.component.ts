import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrManager } from "ng6-toastr-notifications";

import { AuthService } from "../service/service.service"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  userData: any = []
  logType: any = [


    { type: "Recruiter", value: "recruiter" },
    { type: "Partner", value: "partner" }
  ]
  constructor(private fb: FormBuilder, private toastr: ToastrManager, private auth: AuthService, private route: Router) {
    var tok = this.auth.getToken()
    var UserT = this.auth.getUsertype()
    if (tok) {
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
  }

  ngOnInit() {
    this.initForm()
    this.GetUser()

  }


  initForm() {
    this.loginForm = this.fb.group({
      name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],

      password: ["", Validators.required],
      userType: ["", Validators.required]
    });
  }

  onSubmit() {
    let value = this.loginForm.value
    console.log("Log Value", value)
    this.auth.Reg(value).subscribe(
      result => {
        console.log("Register Success full")
        this.toastr.successToastr("Resister is done. Need aprove by admin.", "Successful", { timeOut: 3000 });
        this.loginForm.reset();
      },
      error => {
        let er = error.error.errors[0];
        this.toastr.errorToastr(er.details, er.title, { timeOut: 3000 });
      }
    )

  }

  GetUser() {
    let id = this.auth.getId()
    console.log("id", id)
    this.auth.getUser(id).subscribe(
      res => (
        // console.log("result", res)
        this.userData = res
      )
    )
  }

  logout() {
    this.auth.deleteToken();
  }

}

