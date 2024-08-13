import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from "../../share/components/button/button.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {

}
