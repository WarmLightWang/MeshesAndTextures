/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

/**
 * This program does make one domino. A double six. 
 */

// define a class of Domino here - it should be a subclass of GrObject

class GrDomino extends GrObject {
  constructor(x, y, z, side1, side2) {

    let v1 = 1 / 3;
    let v2 = 2 / 3;
    
    let UVs = {
      "zero": [
        [new T.Vector2(0, 0), new T.Vector2(0, 0), new T.Vector2(0, 0)],
        [new T.Vector2(0, 0), new T.Vector2(0, 0), new T.Vector2(0, 0)]
      ],
      "one": [
        [new T.Vector2(v1, v1), new T.Vector2(v1, v2), new T.Vector2(v2, v2)],
        [new T.Vector2(v1, v1), new T.Vector2(v2, v2), new T.Vector2(v2, v1)]
      ],
      "two": [
        [new T.Vector2(0, v1), new T.Vector2(0, v2), new T.Vector2(v1, v2)],
        [new T.Vector2(0, v1), new T.Vector2(v1, v2), new T.Vector2(v1, v1)]
      ],
      "three": [
        [new T.Vector2(v1, 0), new T.Vector2(v1, v1), new T.Vector2(v2, v1)],
        [new T.Vector2(v1, 0), new T.Vector2(v2, v1), new T.Vector2(v2, 0)]
      ],
      "four": [
        [new T.Vector2(v1, v2), new T.Vector2(v1, 1), new T.Vector2(v2, 1)],
        [new T.Vector2(v1, v2), new T.Vector2(v2, 1), new T.Vector2(v2, v2)]
      ],
      "five": [
        [new T.Vector2(v2, v1), new T.Vector2(v2, v2), new T.Vector2(1, v2)],
        [new T.Vector2(v2, v1), new T.Vector2(1, v2), new T.Vector2(1, v1)]
      ],
      "six": [
        [new T.Vector2(v2, 0), new T.Vector2(v2, v1), new T.Vector2(1, v1)],
        [new T.Vector2(v2, 0), new T.Vector2(1, v1), new T.Vector2(1, 0)]
      ]
    };
    
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
      new T.Vector3(0, 1, 2),
      new T.Vector3(1, 1, 2),
      new T.Vector3(0, 0, 2),
      new T.Vector3(1, 0, 2)
    ];
    geometry.vertices = (verts);

    let faces = [
      new T.Face3(2, 5, 7),
      new T.Face3(2, 7, 4),
      new T.Face3(5, 8, 9),
      new T.Face3(5, 9, 7),
      new T.Face3(6, 1, 4),
      new T.Face3(6, 4, 7),
      new T.Face3(10, 11, 9),
      new T.Face3(10, 9, 8),
      new T.Face3(3, 5, 2),
      new T.Face3(3, 2, 0),
      new T.Face3(0, 2, 4),
      new T.Face3(0, 4, 1),
      new T.Face3(11, 6, 7),
      new T.Face3(11, 7, 9),
      new T.Face3(8, 5, 3),
      new T.Face3(8, 3, 10),
      new T.Face3(10, 3, 6),
      new T.Face3(10, 6, 11),
      new T.Face3(0, 1, 6),
      new T.Face3(0, 6, 3)
    ];
    geometry.faces = (faces);

    let uvs = UVs[side1].concat(UVs[side2]);
    let faceVertexUvs = [uvs];
    geometry.faceVertexUvs = faceVertexUvs;

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;

    geometry.translate(-0.5, 0, -1);
    let tl = new T.TextureLoader().load("../images/dice_texture.png");

    let material = new T.MeshStandardMaterial({ map: tl, roughness: 6});

    let mesh = new T.Mesh(geometry, material);
    mesh.scale.set(1, 0.2, 1);
    mesh.position.set(x+1, y, z);

    super("Domino", mesh);

    this.obj = mesh;
  }
}

function test() {
  let world = new GrWorld();

  // put the domino into the world Here
  let nums = ["zero", "one", "two", "three", "four", "five", "six"];
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      let domino = new GrDomino(2 * i / 3 - 4, 0, j * 1.25 - 3.5, nums[i], nums[j]);
      domino.obj.scale.set(0.5, 0.2, 0.5);
      world.add(domino);
    }
  }

  world.go();
}
Helpers.onWindowOnload(test);
