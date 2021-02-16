import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrManager } from "ng6-toastr-notifications";

import { AuthService } from "../service/service.service"



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  userData: any = []
  loading: boolean = false
  logType: any = [

    { type: "Admin", value: "admin" },
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
    this.loading = true;
    this.auth.login(value).subscribe(
      res => {
        console.log("Respoce", res),
          localStorage.setItem("token", res.token),
          localStorage.setItem("id", res.id),
          localStorage.setItem("user", res.userType)

        this.auth.userType(res.id).subscribe(
          result => {


            if (result.isActived == true) {

              switch (result.userType) {
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
              this.loading = false;

            } else {
              this.loading = false;
              this.toastr.errorToastr("You are not activated.", "Invalid", { timeOut: 3000 });
            }



          }
        )

        this.loginForm.reset()

      }

      ,
      error => {
        let er = error.error.errors[0];
        this.toastr.errorToastr(er.details, er.title, { timeOut: 3000 });
        this.loading = false;
        this.loginForm.reset()
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
