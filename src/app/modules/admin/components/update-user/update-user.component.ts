import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AdminService } from 'src/app/modules/admin/services/admin.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id = "";
  updateForm: FormGroup;
  user = new User();

  constructor(private admin: AdminService,private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params["id"];  

    this.updateForm = new FormGroup({
      name: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",Validators.required),
      cpassword: new FormControl("",Validators.required),
      role: new FormControl("admin")
    })
   }

  ngOnInit(): void {
    this.admin.GetUserById(this.id).subscribe((data:any) => {
      this.user = data;
      this.updateForm = new FormGroup({
        name: new FormControl(this.user.name,Validators.required),
        email: new FormControl(this.user.email,[Validators.email,Validators.required]),
        password: new FormControl(this.user.password,Validators.required),
        cpassword: new FormControl(this.user.password,Validators.required),
        role: new FormControl("admin")
      });
    })
    
  }

  Submit(): void{
    if (this.updateForm.valid) {
      this.admin.UpdateUser(this.id,this.updateForm.value).subscribe((data:any) => {
        alert("Data Updated Successfully!");
        this.router.navigate(["/admin/user"]);
      },
        (error: Error) => {
          alert("Updated Failed!");
        })
    } else {
      alert("invalid form!")
    }
  }


}
