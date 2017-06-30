import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { WebsocketService, WebappService, Device } from '../../../shared/shared';

@Component({
  selector: 'more',
  templateUrl: './more.component.html'
})
export class MoreComponent implements OnInit {

  public device: Device;
  public manualMessageForm: FormGroup;

  private deviceSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private websocketService: WebsocketService,
    private webappService: WebappService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.deviceSubscription = this.websocketService.setCurrentDevice(this.route.snapshot.params).subscribe(device => {
      this.device = device;
    })
    this.manualMessageForm = this.formBuilder.group({
      "message": this.formBuilder.control('')
    });
  }

  ngOnDestroy() {
    this.deviceSubscription.unsubscribe();
  }

  public sendManualMessage(form: FormGroup) {
    try {
      let obj = JSON.parse(form["value"]["message"]);
      this.device.send(obj);
    } catch (e) {
      this.webappService.notify({
        type: "error",
        message: (<Error>e).message
      });
    }
  }
}