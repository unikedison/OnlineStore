import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  role = "";
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required])
    })
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      if(localStorage.getItem('token') == "admin") {
        this.router.navigate(["admin"]);
      }
      else {
        this.router.navigate(["user"]);
      }
    }

  }

  login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe((result) => {
        this.role = result.role;
        console.log(this.role)
        if(this.role !== null){
          this.auth.setToken(result.role);
          if(this.role == "admin") {
            this.router.navigate(["admin"]);
          }
          else if(this.role == "user") {
            this.router.navigate(["user"]);
          }
        }else{
          alert("Login Failed");
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
