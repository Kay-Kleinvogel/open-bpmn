import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FileService, StorageService } from "../../core/services";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  projects;
  constructor(private fileService: FileService, private router: Router, private storageService: StorageService) {
    this.projects = this.storageService.lastProjects;
  }

  ngOnInit() { }

  openDialog() { }

  openRecent = (project) => {
    this.fileService.resetLocalFile();
    const content = this.fileService.readFile(project.path);
    this.fileService.setCurrentPath(project.path);
    this.fileService.setCurrentContent(content);
    this.router.navigateByUrl("/edit");
  }

  openFile = () => {
    this.fileService.openFile();
  };

  createDiagram = () => {
    this.fileService.createDiagram();
  };
}
