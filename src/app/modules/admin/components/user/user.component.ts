import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userDetails = <User[]>[];
  displayDetails = <User[]>[];
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.GetData();
  } 

  current = 0;
  pageLength = 0;
   GetData(step:number=0){
     this.current = this.current+step;
    this.adminService.GetUserDetails().subscribe((data: User[]) => {      
      this.userDetails =  data;
      console.log(this.userDetails)
      this.displayDetails = this.userDetails.slice(this.current, this.current+10);      
     this.pageLength =  this.userDetails.length-10;
    }); 
   }

   DeleteUser(userId: string):void{
    if(confirm("Do you want to delete the employee details?")){
      this.adminService.DeleteUser(userId).subscribe((data) =>{
        alert("User record deleted successfully!");        
        location.reload();
      });
    }
  }


}
