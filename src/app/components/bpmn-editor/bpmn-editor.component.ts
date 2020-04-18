import {
  AfterContentInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  NgZone,
} from "@angular/core";

import * as BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import { Router } from "@angular/router";
import { FileService, EventEmitterService } from "../../core/services";
const ipcRenderer = require("electron").ipcRenderer;

@Component({
  selector: "app-bpmn-editor",
  templateUrl: "./bpmn-editor.component.html",
  styleUrls: ["./bpmn-editor.component.scss"],
})
export class BpmnEditorComponent implements AfterContentInit, OnDestroy {
  private viewer: BpmnJS = new BpmnJS({});

  @ViewChild("canvas", { static: true }) private el: ElementRef;

  constructor(
    private fileService: FileService,
    private ngZone: NgZone,
    private eventEmitterService: EventEmitterService
  ) {
    // testing if it gets the current data with the router
    this.viewer.importXML(this.fileService.getCurrentContent(), (err) => {
      if (err) {
        console.log("Error: ", err);
      }
    });

    ipcRenderer.on("saveFile", (sender, args) => {
      console.log("saveFile");
      this.ngZone.run(() => this.saveFile());
    });

    ipcRenderer.on("saveAs", (sender, args) => {
      this.ngZone.run(() => {
        this.fileService.setCurrentPath(null);
        this.saveFile();
      });
      return "done";
    });

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeSaveFile.subscribe(
        () => {
          this.saveFile();
        }
      );
    }
  }

  ngAfterContentInit(): void {
    // attach BpmnJS instance to DOM element
    this.viewer.attachTo(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // destroy BpmnJS instance
    this.viewer.destroy();
  }

  saveFile = () => {
    this.fileService.saveDiagram(this.viewer);
  };
}
