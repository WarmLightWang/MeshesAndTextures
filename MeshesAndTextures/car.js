/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Mesh } from "../libs/CS559-THREE/build/three.module.js";

// define your vehicles here, and imported them into the "main" program
//let colors = ["red", "yellow", "green"];
let counter1 = 0;
class GrCar extends GrObject {
    constructor(x, y, z) {

        let car1G = new T.BoxGeometry(2, 0.5, 3);
        let car1M = new T.MeshStandardMaterial({ color: "red" });
        let car1Mesh = new T.BoxGeometry(2, 1, 2);
        car1G.translate(0, 0.25, 0);

        car1Mesh.vertices[2] = new T.Vector3(car1Mesh.vertices[2].x - 0.2, car1Mesh.vertices[2].y, car1Mesh.vertices[2].z - 0.2);
        car1Mesh.vertices[3] = new T.Vector3(car1Mesh.vertices[3].x - 0.2, car1Mesh.vertices[3].y, car1Mesh.vertices[3].z + 0.2);
        car1Mesh.vertices[6] = new T.Vector3(car1Mesh.vertices[6].x + 0.2, car1Mesh.vertices[6].y, car1Mesh.vertices[6].z + 0.2);
        car1Mesh.vertices[7] = new T.Vector3(car1Mesh.vertices[7].x + 0.2, car1Mesh.vertices[7].y, car1Mesh.vertices[7].z - 0.2);
        car1Mesh.translate(0, -0.5, 0);
        car1Mesh.rotateX(Math.PI);

        let cylinder = new T.CylinderGeometry(0.4, 0.4, 2.3, 6, 2);
        let wheelB = new T.Mesh(cylinder, new T.MeshStandardMaterial({ color: "gray" }));
        let wheelF = wheelB.clone(false);
        cylinder.computeFlatVertexNormals();
        cylinder.rotateZ(Math.PI / 2);

        let roof = new T.Mesh(car1Mesh, car1M);
        let glass = roof.clone();
        let base = new T.Mesh(car1G, car1M);
        base.add(roof);
        roof.position.y = 0.5;
        roof.position.z = -0.35;

        roof.add(glass);
        glass.material = new T.MeshStandardMaterial({ color: "skyblue" });
        glass.scale.set(0.9, 0.9, 1.1);
        wheelB.add(base);
        base.position.z = 1;

        wheelB.add(wheelF);
        wheelF.position.z = 2;
        wheelB.position.set(x - 1.5, y + 0.4, z + 1);
        wheelB.rotateY(-0.4);
        counter1++;

        super(`car1-${counter1}`, wheelB);
        this.base = base;
        this.theta = 0;
    }

    advance(delta, timeOfDay) {
        this.theta += delta / 100;
        this.base.rotation.z = Math.sin(this.theta) * Math.PI / 88;
    }
}

let counter2 = 0;
class GrCar2 extends GrObject {
    constructor(x, y, z) {

        var length = 1, width = 1;

        let shape = new T.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, width);
        shape.lineTo(length, width);
        shape.lineTo(length, 0);
        shape.lineTo(0, 0);

        let extrudeSettings = {
            steps: 0,
            depth: 3,
            bevelEnabled: true,
            bevelThickness: 2.5,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        let car2G = new T.ExtrudeBufferGeometry(shape, extrudeSettings);
        let car2M = new T.MeshStandardMaterial({ color: "blue", metalness: -0.5 });
        let car2 = new T.Mesh(car2G, car2M);
        car2.scale.set(0.6, 0.3, 0.6);
        car2.position.set(2, 0.4, -2.5);
        car2.rotateY(-0.3);
        car2.rotateX(0.05);

        let glassG = new T.Geometry();
        glassG.vertices.push(new T.Vector3(0, 0, 0));
        glassG.vertices.push(new T.Vector3(1, 1, 1));
        glassG.vertices.push(new T.Vector3(1, 1, -1));
        glassG.vertices.push(new T.Vector3(-1, 1, 1));
        glassG.vertices.push(new T.Vector3(-1, 1, -1));
        glassG.vertices.push(new T.Vector3(0, 2, 0));

        let f1 = new T.Face3(5, 1, 2);
        f1.color.setStyle("pink");
        glassG.faces.push(f1);

        let f2 = new T.Face3(5, 2, 4);
        f2.color.setStyle("pink");
        glassG.faces.push(f2);

        let f3 = new T.Face3(5, 4, 3);
        f3.color.setStyle("pink");
        glassG.faces.push(f3);

        let f4 = new T.Face3(5, 3, 1);
        f4.color.setStyle("skyblue");
        glassG.faces.push(f4);
        glassG.computeFaceNormals();

        let glassM = new T.MeshStandardMaterial({ roughness: 0.75, metalness: -0.01, vertexColors: T.VertexColors });
        let glass = new T.Mesh(glassG, glassM);
        glass.position.set(0.5, 0, 1);
        glass.scale.set(0.8, 1.5, 2.6);
        //glass.rotateX(0.1);
        car2.add(glass);

        //draw the wheels
        let wheel1G = new T.TorusBufferGeometry(0.5, 0.6, 3, 20);
        let wheel1M = new T.MeshStandardMaterial({ color: "gray", metalness: 0.5, roughness: 0.8 });
        let wheel1 = new Mesh(wheel1G, wheel1M);
        wheel1.position.set(1.8, 0, 3);
        wheel1.rotateY(1.5);
        wheel1.rotateZ(0.5);
        car2.add(wheel1);

        let wheel2 = new Mesh(wheel1G, wheel1M);
        wheel2.position.set(-0.9, 0, 3);
        wheel2.rotateY(1.7);
        wheel2.rotateZ(0.5);
        car2.add(wheel2);

        let wheel3 = new Mesh(wheel1G, wheel1M);
        wheel3.position.set(1.9, -0.3, -1.5);
        wheel3.rotateY(-1.4);
        wheel3.rotateZ(0.5);
        car2.add(wheel3);

        let wheel4 = new Mesh(wheel1G, wheel1M);
        wheel4.position.set(-0.9, -0.3, -1.5);
        wheel4.rotateY(-1.7);
        wheel4.rotateZ(0.5);
        car2.add(wheel4);
        counter2++;

        super(`car2-${counter2}`, car2);
        this.theta = 0;
        this.car2 = car2;
    }

    advance(delta, timeOfDay) {
        this.theta += delta / 100;
        this.car2.rotation.z = Math.sin(this.theta) * Math.PI;
    }
}
export { GrCar };
export { GrCar2 };