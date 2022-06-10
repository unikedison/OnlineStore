import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalItem = 0;

  constructor(private auth: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data =>{
      this.totalItem = data.length;
    })
  }

  logout(): void {
    if (confirm("Are you sure want to logged out?")) {
      this.auth.logout();
      this.router.navigate(["login"]);
    }
  }
}
