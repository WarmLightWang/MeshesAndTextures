/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { GrBuilding1, GrBuilding2, GrBuilding3, GrRandomTree } from "./Buildings.js";

/**
 * This program does make a Graphics Town Buildings with using textures and shapes 
 */
function test() {
  let world = new GrWorld();

  // place your buildings and trees into the world here
  let building1 = new GrBuilding1(0, 0, -4);
  world.add(building1);

  let building2 = new GrBuilding2(0, 0, 2);
  world.add(building2);

  let building3 = new GrBuilding3(0, 1, 4);
  world.add(building3);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      let tree = new GrRandomTree(8 * j - 4, 0, i * 2 - 4);
      world.add(tree);
    }
  }
  world.go();
}
Helpers.onWindowOnload(test);
