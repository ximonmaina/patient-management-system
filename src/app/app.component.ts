import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'patient-management-system';

  username  = '';

  constructor(private route: ActivatedRoute) {
    this.username = this.route.snapshot.params['name'];
  }
}
