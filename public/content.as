import flash.external.ExternalInterface;

function on_change_scene(name) {
  (root as MovieClip).gotoAndStop(1, name);
}

function init() {
  ExternalInterface.addCallback("change_scene", on_change_scene);
  gotoAndStop(1);
}

init();
