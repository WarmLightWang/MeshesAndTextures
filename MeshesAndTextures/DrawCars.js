/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { GrCar } from "./car.js";
import { GrCar2 } from "./car.js";

/**
 * This program draw the Car/Vehicle with textures
 */

function test() {
  let world = new GrWorld();

  // place your vehicles into the world here
  let car = new GrCar(0, 0, 0);
  world.add(car);

  let car2 = new GrCar2(0, 0, 0);
  world.add(car2);

  world.go();
}
Helpers.onWindowOnload(test);
