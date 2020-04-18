import { Injectable, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventEmitterService {
  invokeSaveFile = new EventEmitter();
  subsVar: Subscription;

  constructor() {}

  onSaveFileTrigger() {
    console.log("EVENT EMITTED");
    this.invokeSaveFile.emit();
  }
}
