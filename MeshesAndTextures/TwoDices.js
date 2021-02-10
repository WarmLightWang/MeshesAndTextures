/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

/**
 * This program does place the dice on the groundplane. 
 * We should be able to see that the dice have different numbers on each side (we can’t see the bottom).
 */

// define a class of Dice here - it should be a subclass of GrObject
class GrDice extends GrObject {
    constructor(x, y, z) {
        let geometry = new T.Geometry();
        let verts = [
            new T.Vector3(0, 0, 0),
            new T.Vector3(1, 0, 0),
            new T.Vector3(0, 1, 0),
            new T.Vector3(0, 0, 1),
            new T.Vector3(1, 1, 0),
            new T.Vector3(0, 1, 1),
            new T.Vector3(1, 0, 1),
            new T.Vector3(1, 1, 1),
        ];
        geometry.vertices = (verts);

        let faces = [
            new T.Face3(0, 1, 6),
            new T.Face3(0, 6, 3),
            new T.Face3(6, 1, 4),
            new T.Face3(6, 4, 7),
            new T.Face3(5, 3, 6),
            new T.Face3(5, 6, 7),
            new T.Face3(3, 5, 2),
            new T.Face3(3, 2, 0),
            new T.Face3(2, 5, 7),
            new T.Face3(2, 7, 4),
            new T.Face3(0, 2, 4),
            new T.Face3(0, 4, 1),
        ];
        geometry.faces = (faces);

        let v1 = 1/3;
        let v2 = 2/3;
        let faceVertexUvs = [[
            [new T.Vector2(v1,v1), new T.Vector2(v1,v2), new T.Vector2(v2,v2)],
            [new T.Vector2(v1,v1), new T.Vector2(v2,v2), new T.Vector2(v2,v1)],
            [new T.Vector2(v2,v1), new T.Vector2(v2,v2), new T.Vector2(1,v2)],
            [new T.Vector2(v2,v1), new T.Vector2(1,v2), new T.Vector2(1,v1)],
            [new T.Vector2(v1,0), new T.Vector2(v1,v1), new T.Vector2(v2,v1)],
            [new T.Vector2(v1,0), new T.Vector2(v2,v1), new T.Vector2(v2,0)],
            [new T.Vector2(0,v1), new T.Vector2(0,v2), new T.Vector2(v1,v2)],
            [new T.Vector2(0,v1), new T.Vector2(v1,v2), new T.Vector2(v1,v1)],
            [new T.Vector2(v2,0), new T.Vector2(v2,v1), new T.Vector2(1,v1)],
            [new T.Vector2(v2,0), new T.Vector2(1,v1), new T.Vector2(1,0)],
            [new T.Vector2(v1,v2), new T.Vector2(v1,1), new T.Vector2(v2,1)],
            [new T.Vector2(v1,v2), new T.Vector2(v2,1), new T.Vector2(v2,v2)]
        ]];
        geometry.faceVertexUvs = faceVertexUvs;

        geometry.computeFaceNormals();
        geometry.translate(-0.5, -0.5, -0.5);
        let tl=new T.TextureLoader().load("../images/dice_texture.png");
        let material = new T.MeshStandardMaterial({map:tl, roughness:0.75});
        let mesh = new T.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        super("Dice", mesh); 

        this.mesh = mesh;
    }
}

function test() {
  let world = new GrWorld();

  // put the two dice into the world Here
  // don't forget to orient them so they have different numbers facing up
  let dice1 = new GrDice(1, 0.5, 1);
  world.add(dice1);
  let dice2 = new GrDice(-1, 0.5, -1);
  dice2.mesh.rotateZ(Math.PI/2);
  dice2.mesh.rotateX(Math.PI/2);
  world.add(dice2);

  world.go();
}
Helpers.onWindowOnload(test);
