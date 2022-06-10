import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
   
  }

  logout(): void {
    if (confirm("Are you sure want to logged out?")) {
      this.auth.logout();
      this.router.navigate(["login"]);
    }
  }

}
