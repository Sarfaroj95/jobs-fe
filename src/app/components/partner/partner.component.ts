import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from '../../service/service.service';
import { ToastrManager } from "ng6-toastr-notifications";
import { Router } from '@angular/router';


const states = ['Html', 'Css', 'Vue Js', 'Node js', 'Java', 'Java Script', 'Type Script', 'Spring Boot', 'Angular 9', 'React Js', 'Redux', 'Aws Server'];
const state = ['Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Pune', 'Hydrabad']

const jobs = ['Angular', 'React Js ', 'Vue Js', 'Frontend Developer', 'Backend Developer', 'Java Developer', 'Node Js Developer', 'Dev Ops']


const rate = ['1.Extremely Poor', '2.Poor', '3.Bad', '4.Below Average', '5.Managable', '6.Above Average', '7.Good', '8.Very Good', '9.Heghly Recommended', '10.Excellent']


@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdForm: FormGroup;
  public model: any;

  statusarr: any = [
    { name: "Not working" },
    { name: "Servicing Notice" },
    { name: "On Bench" },
    { name: "Will Resign" },
    { name: "Asked to look out" },
    { name: "others" },
  ]

  skillarr: any = [
    { name: "Verbal Communication" },
    { name: "Thought Process" },
    { name: "Willingness to Learn" },
    { name: "Overall" },
  ]

  c_ctc: any = [
    { name: "2.5 - 3.6 Lacs", value: "2.5-3.6" },
    { name: "3.6 - 4.8 Lacs", value: '3.6-4.8' },
    { name: "4.8 - 5.6 Lacs", value: '4.8-5.6' },
    { name: "5.6 - 8.0 Lacs", value: '5.6-8.0' },



  ]

  appid: any

  formatter = (result: string) => result.toUpperCase();

  constructor(private _formBuilder: FormBuilder, private service: AuthService, private toastr: ToastrManager, private route: Router) {
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
    this.initStepOne();
    this.initStepTwo();
    this.initStepThree();
  }


  initStepOne() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ["", [
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
        )
      ]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      current_organization: ["", Validators.required],
      jobrole: ["", Validators.required],
      workstatus: ["", Validators.required],
      location: ["", Validators.required]
    });

  }

  initStepTwo() {
    this.secondFormGroup = this._formBuilder.group({
      total_technology: this._formBuilder.array([this._formBuilder.group({ tech: '', techrating: '' })]),
      skillrate: ["", Validators.required],
      skill: ["", Validators.required],
      overall: [""]
    });
  }

  initStepThree() {
    this.thirdForm = this._formBuilder.group({
      joindate: ["", Validators.required],
      cctc: ["", Validators.required],
      ectc: ["", Validators.required],
      reason: [""]
    })
  }


  submitOne() {
    var val = this.firstFormGroup.value
    console.log("Value", val)

    this.service.applied(val).subscribe(
      result => {
        console.log("First step done")
        // this.toastr.successToastr("First step Successful.", "Success!", { timeOut: 3000 });

        this.appid = result.id
      },
      error => {
        // let er = error.error.errors[0];
        // this.toastr.errorToastr(er.details, er.title, { timeOut: 3000 });
      }
    )
  }

  submitTwo() {
    var val = this.secondFormGroup.value
    console.log("Sec value", val)
    this.service.appliedUpdate(this.appid, val).subscribe(
      result => {
        console.log("DOne second step")
        // this.toastr.successToastr("Second step Successful.", "Success!", { timeOut: 3000 });

      }
    )
  }

  submitThree() {
    var val = this.thirdForm.value
    console.log("Third form", val)
    this.service.lastUpdate(this.appid, val).subscribe(
      result => {
        console.log("I am submit final")
        // this.toastr.successToastr("Final step Successful.", "Success!", { timeOut: 3000 });

      }
    )
  }




  get totalTech() {
    return this.secondFormGroup.get('total_technology') as FormArray;
  }

  AddTechRow() {
    this.totalTech.push(this._formBuilder.group({ tech: '', techrating: '' }))
  }

  DeleteTechRow(index) {
    this.totalTech.removeAt(index)
  }



  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  searchstate = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : state.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  searchrate = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : rate.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  searchjob = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : jobs.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  logout() {
    this.service.LogOut();
    this.route.navigate(['/signin'])
    console.log("I am called")
  }


}

