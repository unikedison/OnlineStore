import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  userData = new User();

  constructor(private auth: AuthService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      DOB: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required),
      cpassword: new FormControl("",Validators.required)
    })
  }

  Submit(): void{

    if (this.forgotForm.valid) {

      if(this.forgotForm.get('password')?.value != this.forgotForm.get('cpassword')?.value){
        alert("Password Not Matched!")
        return;
      }
      this.auth.GetData(this.forgotForm.get('email')?.value).subscribe((result) => {
        this.userData = result;
        if(this.forgotForm.get('DOB')?.value == this.datePipe.transform(this.userData.dob,"yyyy-MM-dd")){
          this.auth.resetPassword(this.forgotForm.value).subscribe((result) => {
            alert("Password Updated Successfully!");
            this.router.navigate(["/login"]);
          })
        }else{
          alert("Password Updation Failed!")
        }
      },
        (error: Error) => {
          alert(error.message);
        })
    } else {
      alert("invalid form!")
    }
  }

}
