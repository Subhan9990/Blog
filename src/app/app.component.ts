import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone : true,
  imports :[RouterModule , RouterOutlet , HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent { }