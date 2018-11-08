import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})



export class PageComponent implements OnInit {
  @ViewChild('navbar') navbar:any;
  items = [
    {
      title: 'Profile',
      link: [],
    },
    {
      title: 'Change Password',
      link: [],
    },
    {
      title: 'Privacy Policy',
      link: [],
    },
    {
      title: 'Logout',
      link: [],
    },
  ];

  constructor() { }

  ngOnInit() {
    this.navbar.SideClass="";
    console.log(this.navbar)
  }

}
