import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service, Utils, Websocket, EdgeConfig, Edge } from '../../../../shared/shared';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: ComponentUpdateComponent.SELECTOR,
  templateUrl: './update.component.html'
})
export class ComponentUpdateComponent implements OnInit {

  private static readonly SELECTOR = "componentUpdate";

  public edge: Edge = null;
  public factory: EdgeConfig.Factory = null;
  public form: FormGroup = null;
  public model = null;
  public fields: FormlyFieldConfig[] = null;

  private componentId: string = null;

  constructor(
    private route: ActivatedRoute,
    protected utils: Utils,
    private websocket: Websocket,
    private service: Service
  ) {
  }

  ngOnInit() {
    this.service.setCurrentEdge(this.route).then(edge => {
      this.edge = edge;
    });
    let componentId = this.route.snapshot.params["componentId"];
    this.service.getConfig().then(config => {
      this.componentId = componentId;
      let component = config.components[componentId];
      this.factory = config.factories[component.factoryId];
      let fields: FormlyFieldConfig[] = [];
      let model = {
        id: componentId
      };
      for (let property of this.factory.properties) {
        let property_id = property.id.replace('.', '_');
        let field: FormlyFieldConfig = {
          key: property_id,
          type: 'input',
          templateOptions: {
            label: property.name,
            description: property.description,
            required: property.isRequired,
          }
        }
        // add Property Schema 
        Utils.deepCopy(property.schema, field);
        fields.push(field);
        if (component.properties[property.id]) {
          model[property_id] = component.properties[property.id];
        }
      }
      this.form = new FormGroup({});
      this.fields = fields;
      this.model = model;
    });
  }

  public submit() {
    let properties: { name: string, value: any }[] = [];
    for (let controlKey in this.form.controls) {
      let control = this.form.controls[controlKey];
      if (control.dirty) {
        let property_id = controlKey.replace('_', '.');
        properties.push({ name: property_id, value: control.value });
      }
    }
    this.edge.updateComponentConfig(this.websocket, this.componentId, properties).then(response => {
      this.form.markAsPristine();
      this.service.toast("Successfully updated " + this.componentId + ".", 'success');
    }).catch(reason => {
      this.service.toast("Error updating " + this.componentId + ":" + reason.error.message, 'danger');
    });
  }

  public delete() {
    this.edge.deleteComponentConfig(this.websocket, this.componentId).then(response => {
      this.form.markAsPristine();
      this.service.toast("Successfully deleted " + this.componentId + ".", 'success');
    }).catch(reason => {
      this.service.toast("Error deleting " + this.componentId + ":" + reason.error.message, 'danger');
    });
  }

}