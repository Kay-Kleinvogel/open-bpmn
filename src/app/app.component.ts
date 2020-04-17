import { Component, NgZone } from "@angular/core";
import { ElectronService, FileService } from "./core/services";
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from "../environments/environment";
import { Router } from "@angular/router";
const ipcRenderer = require("electron").ipcRenderer;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    private fileService: FileService,
    private router: Router,
    private ngZone: NgZone
  ) {
    ipcRenderer.on("openFile", (sender, arg) => {
      this.ngZone.run(() => this.fileService.openFile());
    });
  }
}
