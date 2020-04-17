import { Injectable } from "@angular/core";
import { remote } from "electron";
import { readFileSync, writeFileSync } from "fs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import * as BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private _http: HttpClient, private router: Router) {}
  currentFile = {
    path: null,
    content: null,
  };

  getCurrentPath() {
    return this.currentFile.path;
  }

  getCurrentContent() {
    return this.currentFile.content;
  }

  setCurrentPath(path: string) {
    this.currentFile.path = path;
  }

  setCurrentContent(content: string) {
    this.currentFile.content = content;
  }

  openFile(): void {
    const files = remote.dialog.showOpenDialogSync({
      properties: ["openFile"],
      filters: [
        {
          name: "BPMN",
          extensions: ["bpmn", "BPMN"],
        },
        {
          name: "XML",
          extensions: ["XML", "xml"],
        },
        { name: "All files", extensions: ["*"] },
      ],
    });

    if (files === undefined) {
      remote.dialog.showErrorBox(
        "File Not Found",
        "The file you have selected could not be opened."
      );
    } else {
      const file = files[0];
      this.setCurrentPath(file);
      this.setCurrentContent(this.readFile(file));
      this.router.navigateByUrl("/edit");
    }
  }

  readFile(filePath: string): string {
    return readFileSync(filePath).toString();
  }

  createDiagram() {
    this.setCurrentContent(defaultDiagram);
    this.currentFile.path = null;
    this.router.navigateByUrl("/edit");
  }

  saveDiagram(viewer: BpmnJS) {
    let savePath = "";
    if (this.currentFile.path !== null) {
      savePath = this.getCurrentPath();
    } else {
      savePath = remote.dialog.showSaveDialogSync({
        title: "Save Project",
        filters: [
          {
            name: "BPMN",
            extensions: ["bpmn", "BPMN"],
          },
          {
            name: "XML",
            extensions: ["XML", "xml"],
          },
          { name: "All files", extensions: ["*"] },
        ],
      });
    }
    viewer.saveXML({ format: true }, (err, xml) => {
      this.setCurrentPath(savePath);
      const data = writeFileSync(savePath, xml);
    });
  }
}

const defaultDiagram = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1"/>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;
