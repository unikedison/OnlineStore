import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required,Validators.email]),
      DOB: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required),
      cpassword: new FormControl("",Validators.required),
      role: new FormControl("user")
    })
  }

  Submit(): void{
    if (this.registerForm.valid) {
      if(this.registerForm.get('password')?.value != this.registerForm.get('cpassword')){
        alert("Password Not Matched!")
        return;
      }
      this.auth.register(this.registerForm.value).subscribe((result) => {
        this.router.navigate(["user"]);
      },
        (error: Error) => {
          //alert(error.message);
        })
    } else {
      alert("invalid form!")
    }
  }

}
