import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { BpmnEditorComponent } from "./components/bpmn-editor/bpmn-editor.component";

const routes: Routes = [
  {
    path: "edit",
    component: BpmnEditorComponent,
    runGuardsAndResolvers: "always",
  },
  { path: "**", component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
