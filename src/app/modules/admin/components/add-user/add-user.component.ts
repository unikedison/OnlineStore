import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  adminForm!: FormGroup;
  user: User = new User();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      name: new FormControl("",Validators.required),
      email: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required),
      cpassword: new FormControl("",Validators.required),
      role: new FormControl("admin")
    })
  }

  Submit(): void{
    if (this.adminForm.valid) {
      if(this.adminForm.get('password')?.value != this.adminForm.get('cpassword')?.value){
        alert("Password Not Matched");
        return;
      }

      this.auth.register(this.adminForm.value).subscribe((result) => {
        alert("User Added Successfully!");
        this.router.navigate(["/admin/user"]);
      },
        (error: Error) => {
          alert(error);
        })
    } else {
      alert("invalid form!")
    }
  }

}
