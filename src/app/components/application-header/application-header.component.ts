import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { remote } from "electron";
import { FileService, EventEmitterService } from "../../core/services";
import { BpmnEditorComponent } from "../bpmn-editor/bpmn-editor.component";
const ipcRenderer = require("electron").ipcRenderer;

@Component({
  selector: "app-application-header",
  templateUrl: "./application-header.component.html",
  styleUrls: ["./application-header.component.scss"],
})
export class ApplicationHeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private fileService: FileService,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnInit(): void {}

  openHome = () => {
    if (this.router.url === "/edit") {
      const answer = remote.dialog.showMessageBoxSync(null, {
        type: "warning",
        title: "Closing Project",
        message:
          "Do you want to save your progress before closing your current project?",
        detail:
          'if you click on "Cancel" you will be able to go back to your project.',
        buttons: ["Close Project", "Cancel", "Save Project"],
        defaultId: 2,
      });
      switch (answer) {
        case 1:
          break;
        case 2:
          this.eventEmitterService.onSaveFileTrigger();
          this.fileService.resetLocalFile();
          this.router.navigateByUrl("/");
          break;

        default:
          this.fileService.resetLocalFile();
          this.router.navigateByUrl("/");
          break;
      }
    } else {
      this.fileService.resetLocalFile();
      this.router.navigateByUrl("/");
    }
  };
}
