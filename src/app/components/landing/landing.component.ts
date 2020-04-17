import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FileService } from "../../core/services";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  constructor(private fileService: FileService, private router: Router) {}

  ngOnInit() {}

  openDialog() {}

  openFile = () => {
    this.fileService.openFile();
  };

  createDiagram = () => {
    this.fileService.createDiagram();
  };
}
