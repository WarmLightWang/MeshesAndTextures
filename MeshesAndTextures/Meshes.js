/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

/*
 * Define your 3 objects here. If the objects fit inside +/- 1,
 * the world code below will place them nicely.
 * Otherwise, modify the world code below to make the
 * world bigger and space the objects out differently.
 */

class Object1 extends GrObject {
  constructor() {
    //  call to "super"
    let geometry = new T.Geometry();
    geometry.vertices.push(new T.Vector3(0, -0, 0));
    geometry.vertices.push(new T.Vector3(1, 1, 1));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    geometry.vertices.push(new T.Vector3(-1, 1, 1));
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 2, 0));

    let f1 = new T.Face3(0, 2, 1);
    f1.color.setStyle("red");
    geometry.faces.push(f1);

    let f2 = new T.Face3(0, 4, 2);
    f2.color.setStyle("yellow");
    geometry.faces.push(f2);

    let f3 = new T.Face3(0, 3, 4);
    f3.color.setStyle("green");
    geometry.faces.push(f3);

    let f4 = new T.Face3(0, 1, 3);
    f4.color.setStyle("white");
    geometry.faces.push(f4);

    let f5 = new T.Face3(5, 1, 2);
    f5.color.setStyle("lime");
    geometry.faces.push(f5);

    let f6 = new T.Face3(5, 2, 4);
    f6.color.setStyle("blue");
    geometry.faces.push(f6);

    let f7 = new T.Face3(5, 4, 3);
    f7.color.setStyle("orange");
    geometry.faces.push(f7);

    let f8 = new T.Face3(5, 3, 1);
    f8.color.setStyle("purple");
    geometry.faces.push(f8);

    geometry.computeFaceNormals();

    let material = new T.MeshStandardMaterial({ roughness: 0.75, vertexColors: T.VertexColors });
    let mesh = new T.Mesh(geometry, material);
    mesh.scale.set(0.7, 1, 0.7);
    super("FaceColor", mesh);
  }
}

class Object2 extends GrObject {
  constructor() {

    let geometry = new T.Geometry();
    geometry.vertices.push(new T.Vector3(0, -0, 0));
    geometry.vertices.push(new T.Vector3(1, 1, 1));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    geometry.vertices.push(new T.Vector3(-1, 1, 1));
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 2, 0));


    let f1 = new T.Face3(0, 2, 1);
    f1.vertexColors[0] = new T.Color("red");
    f1.vertexColors[1] = new T.Color("green");
    f1.vertexColors[2] = new T.Color("blue");
    geometry.faces.push(f1);

    let f2 = new T.Face3(0, 4, 2);
    f2.vertexColors[0] = new T.Color("red");
    f2.vertexColors[1] = new T.Color("yellow");
    f2.vertexColors[2] = new T.Color("green");
    geometry.faces.push(f2);

    let f3 = new T.Face3(0, 3, 4);
    f3.vertexColors[0] = new T.Color("red");
    f3.vertexColors[1] = new T.Color("orange");
    f3.vertexColors[2] = new T.Color("yellow");
    geometry.faces.push(f3);

    let f4 = new T.Face3(0, 1, 3);
    f4.vertexColors[0] = new T.Color("red");
    f4.vertexColors[1] = new T.Color("blue");
    f4.vertexColors[2] = new T.Color("orange");
    geometry.faces.push(f4);

    let f5 = new T.Face3(5, 1, 2);
    f5.vertexColors[0] = new T.Color("white");
    f5.vertexColors[1] = new T.Color("blue");
    f5.vertexColors[2] = new T.Color("green");
    geometry.faces.push(f5);

    let f6 = new T.Face3(5, 2, 4);
    f6.vertexColors[0] = new T.Color("white");
    f6.vertexColors[1] = new T.Color("green");
    f6.vertexColors[2] = new T.Color("yellow");
    geometry.faces.push(f6);

    let f7 = new T.Face3(5, 4, 3);
    f7.vertexColors[0] = new T.Color("white");
    f7.vertexColors[1] = new T.Color("yellow");
    f7.vertexColors[2] = new T.Color("orange");
    geometry.faces.push(f7);

    let f8 = new T.Face3(5, 3, 1);
    f8.vertexColors[0] = new T.Color("white");
    f8.vertexColors[1] = new T.Color("orange");
    f8.vertexColors[2] = new T.Color("blue");
    geometry.faces.push(f8);

    geometry.computeFaceNormals();

    let material = new T.MeshStandardMaterial({ roughness: 0.75, vertexColors: T.VertexColors });
    let object = new T.Mesh(geometry, material);
    object.scale.set(0.7, 1, 0.7);
    super("VertexColor", object);
  }
}

class Object3 extends GrObject {
  constructor() {
    let geometry = new T.Geometry();
    geometry.vertices.push(new T.Vector3(0, -0, 0));
    geometry.vertices.push(new T.Vector3(1, 1, 1));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    geometry.vertices.push(new T.Vector3(-1, 1, 1));
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 2, 0));


    let s = 1 / (2 * (1 / 2));

    let normals = [
      new T.Vector3(0, -1, 0),
      new T.Vector3(s, 0, s),
      new T.Vector3(s, 0, -s),
      new T.Vector3(-s, 0, s),
      new T.Vector3(-s, 0, -s),
      new T.Vector3(0, 1, 0)
    ];

    let f1 = new T.Face3(0, 2, 1);
    f1.vertexNormals[0] = normals[0];
    f1.vertexNormals[1] = normals[2];
    f1.vertexNormals[2] = normals[1];
    geometry.faces.push(f1);

    let f2 = new T.Face3(0, 4, 2);
    f2.vertexNormals[0] = normals[0];
    f2.vertexNormals[1] = normals[4];
    f2.vertexNormals[2] = normals[2];
    geometry.faces.push(f2);

    let f3 = new T.Face3(0, 3, 4);
    f3.vertexNormals[0] = normals[0];
    f3.vertexNormals[1] = normals[3];
    f3.vertexNormals[2] = normals[4];
    geometry.faces.push(f3);

    let f4 = new T.Face3(0, 1, 3);
    f4.vertexNormals[0] = normals[0];
    f4.vertexNormals[1] = normals[1];
    f4.vertexNormals[2] = normals[3];
    geometry.faces.push(f4);

    let f5 = new T.Face3(5, 1, 2);
    f5.vertexNormals[0] = normals[5];
    f5.vertexNormals[1] = normals[1];
    f5.vertexNormals[2] = normals[2];
    geometry.faces.push(f5);

    let f6 = new T.Face3(5, 2, 4);
    f6.vertexNormals[0] = normals[5];
    f6.vertexNormals[1] = normals[2];
    f6.vertexNormals[2] = normals[4];
    geometry.faces.push(f6);

    let f7 = new T.Face3(5, 4, 3);
    f7.vertexNormals[0] = normals[5];
    f7.vertexNormals[1] = normals[4];
    f7.vertexNormals[2] = normals[3];
    geometry.faces.push(f7);

    let f8 = new T.Face3(5, 3, 1);
    f8.vertexNormals[0] = normals[5];
    f8.vertexNormals[1] = normals[3];
    f8.vertexNormals[2] = normals[1];
    geometry.faces.push(f8);

    let material = new T.MeshStandardMaterial({ color: "brown", metalness: -0.8, roughness: 0.7 });
    let object = new T.Mesh(geometry, material);
    object.scale.set(0.7, 1, 0.7);
    super("SmoothLook", object);
  }
}

// translate an object in the X direction
function shift(grobj, x) {
  grobj.objects.forEach(element => {
    element.translateX(x);
  });
  return grobj;
}

// Set the Object's Y rotate
function roty(grobj, ry) {
  grobj.objects.forEach(element => {
    element.rotation.y = ry;
  });
  return grobj;
}

/*
 * The world making code here assumes the objects are +/- 1
 * and have a single mesh as their THREE objects.
 * The code is a little funky because it is designed to work for
 * a variety of demos.
 */
function test() {
  let mydiv = document.getElementById("div1");

  let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
  if (!mydiv) {
    InputHelpers.makeBreak(); // sticks a break after the box
  }
  InputHelpers.makeHead("Three Different Objects", box);

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });
  let tt = shift(new Object1(), -3);
  world.add(tt);

  let t2 = shift(new Object2(), 0);
  world.add(t2);

  let t3 = shift(new Object3(), 3);
  world.add(t3);

  let div = InputHelpers.makeBoxDiv({}, box);

  let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });

  InputHelpers.makeBreak(box);

  sl.oninput = function (evt) {
    let v = sl.value();
    roty(tt, v);
    roty(t2, v);
    roty(t3, v);
  };

  world.go();
}
Helpers.onWindowOnload(test);
