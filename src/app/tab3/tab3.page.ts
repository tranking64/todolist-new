import { Component } from '@angular/core';
import { FireserviceService } from '../services/fireservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public service: FireserviceService) {}

  logout() {
    this.service.logout();
  }

}
