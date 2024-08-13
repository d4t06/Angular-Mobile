import { Component } from '@angular/core';
import { loginClasses } from '../../share/classes/login';
import { ButtonComponent } from "../../share/components/button/button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  errorMsg = '';

  classes = loginClasses;
}
