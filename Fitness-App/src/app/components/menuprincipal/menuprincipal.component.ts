import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.component.html',
  styleUrls: ['./menuprincipal.component.css']
})
export class MenuprincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrarDashboard() {
    document.getElementById("sidebar")!.style.width = "300px";
    document.getElementById("contenido")!.style.marginLeft = "300px";
}

}
