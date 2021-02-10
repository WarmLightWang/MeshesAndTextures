/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define the buildings here , and imported them into the "main" program

let counter1 = 0;
class GrBuilding1 extends GrObject {
    constructor(x, y, z) {

        let colorM = new T.MeshStandardMaterial({ color: "#f4b183", roughness: 0.75 });

        let image = new T.TextureLoader().load("../images/house.png");

        let material = new T.MeshStandardMaterial({ map: image, roughness: 0.75 });

        // create dome:
        let points = [];
        let detail = 3;
        for (var i = 0; i <= detail; i++) {
            let num = i * Math.PI / (2 * detail);
            points.push(new T.Vector2(Math.cos(num), Math.sin(num)));
        }
        let geom = new T.LatheGeometry(points, 8);

        points = [
            new T.Vector2(0.1, 0.8 - 0.8),
            new T.Vector2(0.05, 1.3 - 0.8),
            new T.Vector2(0.05, 1.6 - 0.8),
            new T.Vector2(0.1, 1.8 - 0.8),
            new T.Vector2(0, 2 - 0.8)
        ];
        let stickG = new T.LatheGeometry(points, 4);

        geom.computeFlatVertexNormals();
        stickG.computeFlatVertexNormals();

        // dreawing the pole
        points = [
            new T.Vector2(0.75, 0),
            new T.Vector2(0.75, 6.5),
        ];
        let poleG = new T.LatheGeometry(points, 8);
        poleG.computeFlatVertexNormals();

        points = [
            new T.Vector2(0.75, 0),
            new T.Vector2(1, 0.2),
            new T.Vector2(1, 0.5),
        ];

        let detailM = new T.MeshStandardMaterial({ color: "#642100", roughness: 0.75 });
        let detailG = new T.LatheGeometry(points, 8);
        detailG.computeFlatVertexNormals();
        let detail_obj = new T.Mesh(detailG, detailM);

        let stickM = new T.MeshStandardMaterial({ color: "gray", metalness: 0.75 });
        let stick = new T.Mesh(stickG, stickM);

        // top thing
        let domeM = new T.MeshStandardMaterial({ color: "gold", roughness: 0.25, metalness: 0.5 });
        let dome = new T.Mesh(geom, domeM);
        let domeS = stick.clone();
        dome.add(domeS);
        domeS.position.set(0, 0.8, 0);
        domeS.scale.set(0.6, 0.8, 0.6);

        let aa = stick.clone();
        dome.add(aa);
        aa.position.set(0.5, 1.3, 0);
        aa.rotateZ(Math.PI / 2);
        aa.scale.set(0.6, 0.8, 0.6);

        let pole = new T.Mesh(poleG, colorM);
        let poleD = dome.clone(true);
        pole.add(poleD);
        poleD.position.set(0, 6.5, 0);
        let poleDe = detail_obj.clone();
        pole.add(poleDe);
        poleDe.position.set(0, 3, 0);
        poleDe = detail_obj.clone();
        pole.add(poleDe);
        poleDe.position.set(0, 4, 0);
        poleDe.scale.set(1, -1, 1);

        poleDe = detail_obj.clone();
        pole.add(poleDe);
        poleDe.position.set(0, 6, 0);

        let box = new T.BoxGeometry(3, 1, 2);

        box.translate(0, 0.5, 0);
        let base = new T.Mesh(box, material);

        // add the four poles
        let poles = [2, 2];
        for (let i = 0; i < poles[0]; i++) {
            for (let j = 0; j < poles[1]; j++) {
                let p = pole.clone();
                base.add(p);
                p.position.set(i * 2.5 - 1.25, 1, j * 1.5 - 0.75);
                p.scale.set(0.2, 0.1, 0.2);
            }
        }

        box = new T.BoxGeometry(2, 0.25, 2);
        box.translate(0, 0.125, 0);
        let base2 = new T.Mesh(box, colorM);
        base.add(base2);
        base2.position.set(0, 1, 0);

        let d = dome.clone(true);
        base2.add(d);
        d.position.set(0, 0.25, 0);


        base.position.set(x, y, z);
        counter1++;
        super(`building1-${counter1}`, base);
    }
}

let counter2 = 0;
class GrBuilding2 extends GrObject {
    constructor(x, y, z) {
        let t = function (u, v) {
            return new T.Vector2(u, v);
        };
        let g = function (u, v) {
            return new T.Vector2(u, v * 2 / 10 + 2 / 9);
        };

        let tl = new T.TextureLoader().load("../images/UV_Grid_Sm.jpg");
        tl.magFilter = T.NearestFilter;
        let material = new T.MeshStandardMaterial({ map: tl, metalness: 0.1, roughness: 0.75 });

        let uvs = [[
            [t(1, 1), t(1, 0), t(0, 1)],
            [t(0, 0), t(1, 0), t(0, 1)],
            [t(1, 1), t(1, 0), t(0, 1)],
            [t(0, 0), t(1, 0), t(0, 1)],
            [t(1, 1), t(1, 1), t(1, 1)],
            [t(1, 1), t(1, 1), t(1, 1)],
            [t(1, 1), t(1, 1), t(1, 1)],
            [t(1, 1), t(1, 1), t(1, 1)],
            [t(1, 1), t(1, 0), t(0, 1)],
            [t(0, 0), t(1, 0), t(0, 1)],
            [t(1, 1), t(1, 0), t(0, 1)],
            [t(0, 0), t(1, 0), t(0, 1)]
        ]];

        let guvs = [[
            [g(1, 1), g(1, 0), g(0, 1)],
            [g(1, 0), g(0, 0), g(0, 1)],
            [g(1, 1), g(1, 0), g(0, 1)],
            [g(1, 0), g(0, 0), g(0, 1)],
            [t(0, 0), t(0, 0), t(0, 0)],
            [t(0, 0), t(0, 0), t(0, 0)],
            [t(0, 0), t(0, 0), t(0, 0)],
            [t(0, 0), t(0, 0), t(0, 0)],
            [g(1, 1), g(1, 0), g(0, 1)],
            [g(1, 0), g(0, 0), g(0, 1)],
            [g(1, 1), g(1, 0), g(0, 1)],
            [g(1, 0), g(0, 0), g(0, 1)],
        ]];

        let block_geo = [];

        for (let i = 0; i < 2; i++) {
            block_geo.push(new T.BoxGeometry(4 + i, 1.25, 7 - i));
            block_geo[i].vertices[2] = new T.Vector3(block_geo[i].vertices[2].x - 1, block_geo[i].vertices[2].y, block_geo[i].vertices[2].z - 1);
            block_geo[i].vertices[3] = new T.Vector3(block_geo[i].vertices[3].x - 1, block_geo[i].vertices[3].y, block_geo[i].vertices[3].z + 1);
            block_geo[i].vertices[6] = new T.Vector3(block_geo[i].vertices[6].x + 1, block_geo[i].vertices[6].y, block_geo[i].vertices[6].z + 1);
            block_geo[i].vertices[7] = new T.Vector3(block_geo[i].vertices[7].x + 1, block_geo[i].vertices[7].y, block_geo[i].vertices[7].z - 1);
            block_geo[i].translate(0, 0.625, 0);
            block_geo[i].faceVertexUvs = uvs;
        }

        for (let i = 0; i < 2; i++) {
            block_geo.push(new T.BoxGeometry(3 + i, 0.25, 5 - i));
            block_geo[i + 2].vertices[2] = new T.Vector3(block_geo[i + 2].vertices[2].x - 0.2, block_geo[i + 2].vertices[2].y, block_geo[i + 2].vertices[2].z - 0.2);
            block_geo[i + 2].vertices[3] = new T.Vector3(block_geo[i + 2].vertices[3].x - 0.2, block_geo[i + 2].vertices[3].y, block_geo[i + 2].vertices[3].z + 0.2);
            block_geo[i + 2].vertices[6] = new T.Vector3(block_geo[i + 2].vertices[6].x + 0.2, block_geo[i + 2].vertices[6].y, block_geo[i + 2].vertices[6].z + 0.2);
            block_geo[i + 2].vertices[7] = new T.Vector3(block_geo[i + 2].vertices[7].x + 0.2, block_geo[i + 2].vertices[7].y, block_geo[i + 2].vertices[7].z - 0.2);
            block_geo[i + 2].translate(0, -0.125, 0);
            block_geo[i + 2].rotateX(Math.PI);
            block_geo[i + 2].faceVertexUvs = guvs;
        }

        block_geo.push(new T.BoxGeometry(2, 0.25, 3));
        block_geo[4].vertices[2] = new T.Vector3(block_geo[4].vertices[2].x - 0.2, block_geo[4].vertices[2].y, block_geo[4].vertices[2].z - 0.2);
        block_geo[4].vertices[3] = new T.Vector3(block_geo[4].vertices[3].x - 0.2, block_geo[4].vertices[3].y, block_geo[4].vertices[3].z + 0.2);
        block_geo[4].vertices[6] = new T.Vector3(block_geo[4].vertices[6].x + 0.2, block_geo[4].vertices[6].y, block_geo[4].vertices[6].z + 0.2);
        block_geo[4].vertices[7] = new T.Vector3(block_geo[4].vertices[7].x + 0.2, block_geo[4].vertices[7].y, block_geo[4].vertices[7].z - 0.2);
        block_geo[4].translate(0, -0.125, 0);
        block_geo[4].rotateX(Math.PI);
        block_geo[4].faceVertexUvs = guvs;

        let basicM = new T.MeshStandardMaterial({ color: "brown", metalness: 0.2, roughness: 0.75 });
        let base = new T.Mesh(block_geo[0], material);
        let base2 = new T.Mesh(block_geo[0], material);
        base.add(base2);
        base2.rotateY(Math.PI / 2);
        base2 = new T.Mesh(block_geo[1], material);
        base.add(base2);
        base2 = new T.Mesh(block_geo[1], material);
        base.add(base2);
        base2.rotateY(Math.PI / 2);

        base2 = new T.Mesh(block_geo[2], material);
        base.add(base2);
        base2.position.y = 1.25;
        base2 = new T.Mesh(block_geo[2], material);
        base.add(base2);
        base2.position.y = 1.25;
        base2.rotateY(Math.PI / 2);

        base2 = new T.Mesh(block_geo[3], material);
        base.add(base2);
        base2.position.y = 1.25;

        base2 = new T.Mesh(block_geo[4], material);
        base.add(base2);
        base2.position.y = 1.5;
        base2 = new T.Mesh(block_geo[4], material);
        base.add(base2);
        base2.position.y = 1.5;
        base2.rotateY(Math.PI / 2);

        let sphere = new T.SphereGeometry(2, 22);
        sphere.computeFlatVertexNormals();
        let dome = new T.Mesh(sphere, basicM);
        base.add(dome);
        dome.position.y = 0.75;
        dome.scale.set(1, 0.8, 1);
        dome.position.set(0, 1.5, 0);

        sphere = new T.SphereGeometry(0.4, 4);
        sphere.computeFlatVertexNormals();
        dome = new T.Mesh(sphere, basicM);
        base.add(dome);
        dome.position.y = 2.9;

        base.position.set(x - 2, y, z - 1);
        base.scale.set(0.3, 1, 0.3);
        counter2++;
        super(`building2-${counter2}`, base);
    }
}

let counter3 = 0;
class GrBuilding3 extends GrObject {
    constructor(x, y, z) {

        let light = new T.Color(0xffffff);
        let shadow = new T.Color(0x303050);
        let baseG = new T.BoxGeometry(1, 4.5, 1);
        let bm = new T.MeshLambertMaterial({ color: light });
        //let bm = new T.MeshStandardMaterial({ color: "0xffffff", roughness: 0.75 });
        baseG.translate(2, 1.8, 3);
        let base = new T.Mesh(baseG, bm);
        base.scale.set(1, 0.6, 1);
        base.position.set(-1, -1, -1);

        let floorG = new T.BoxGeometry(1.1, 3, 1.1);
        let fm = new T.MeshStandardMaterial({ color: shadow, metalness: 0, roughness: 88 });
        let floors = new T.Mesh(floorG, fm);
        floors.scale.set(1, 0.1, 1);
        floorG.translate(2, 2, 3);
        base.add(floors);

        let groundG = new T.BoxGeometry(1.1, 3, 1.1);
        let gm = new T.MeshStandardMaterial({ color: "olive", metalness: 0.1, roughness: 888 });
        let ground = new T.Mesh(groundG, gm);

        ground.position.set(2, -0.5, 3.5);
        ground.scale.set(2, 0.01, 2);
        base.add(ground);

        let a = floors.clone();
        a.position.setY(0.5);
        base.add(a);

        let b = floors.clone();
        b.position.setY(1);
        base.add(b);

        let c = floors.clone();
        c.position.setY(1.5);
        base.add(c);

        let d = floors.clone();
        d.position.setY(2);
        base.add(d);

        let e = floors.clone();
        e.position.setY(2.5);
        base.add(e);

        let f = floors.clone();
        f.position.setY(3);
        f.scale.set(1, 0.25, 1);
        base.add(f);

        // the roof
        let geometry = new T.Geometry();
        geometry.vertices.push(new T.Vector3(0, -0, 0));
        geometry.vertices.push(new T.Vector3(1, 1, 1));
        geometry.vertices.push(new T.Vector3(1, 1, -1));
        geometry.vertices.push(new T.Vector3(-1, 1, 1));
        geometry.vertices.push(new T.Vector3(-1, 1, -1));
        geometry.vertices.push(new T.Vector3(0, 2, 0));

        let f1 = new T.Face3(5, 1, 2);
        f1.color.setStyle("lightblue");
        geometry.faces.push(f1);

        let f2 = new T.Face3(5, 2, 4);
        f2.color.setStyle("lightblue");
        geometry.faces.push(f2);

        let f3 = new T.Face3(5, 4, 3);
        f3.color.setStyle("lightblue");
        geometry.faces.push(f3);

        let f4 = new T.Face3(5, 3, 1);
        f4.color.setStyle("lightblue");
        geometry.faces.push(f4);

        geometry.computeFaceNormals();

        let material = new T.MeshStandardMaterial({ roughness: 0.75, vertexColors: T.VertexColors });
        let mesh = new T.Mesh(geometry, material);

        mesh.scale.set(0.5, 1, 0.5);
        mesh.position.set(2, 3, 3);

        base.add(mesh);
        base.position.set(0.5, 0.3, -3);
        super(`building3-${counter3}`, base);
    }
}

let counter4 = 0;
class GrRandomTree extends GrObject {
    constructor(x, y, z) {
        let mat = new T.MeshStandardMaterial({ color: "brown", roughness: 1 });

        let points = [new T.Vector2(0.5, 0), new T.Vector2(0.2, 8)];
        let trunkG = new T.LatheGeometry(points, 4);
        trunkG.computeFlatVertexNormals();

        let branchG = new T.LatheGeometry(points, 4);
        branchG.computeFlatVertexNormals();
        branchG.rotateX(Math.PI / 2);
        let base = new T.Mesh(trunkG, mat);


        for (let i = 0; i < 10; i++) {
            let y = Math.random() * 6;
            let branch = new T.Mesh(branchG, mat);

            let theta = Math.random() * Math.PI * 2;
            let phi = Math.PI / 3 - Math.random() * Math.PI / 6;
            branch.lookAt(new T.Vector3(Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(phi) * Math.sin(theta)));
            branch.position.y = y + 2;
            let s = (2 / branch.position.y + 1) * 0.25;
            branch.scale.set(s, s, s);
            base.add(branch);

            let sphereG = new T.SphereGeometry((6 / branch.position.y + 6) / 2, -2, 5);
            sphereG.computeFaceNormals();
            let sphere = new T.Mesh(sphereG, new T.MeshStandardMaterial({ color: "green", roughness: 1 }));
            branch.add(sphere);
            sphere.position.z = 8;
            sphereG.scale(0.5, 0.7, 0.5);

        }
        base.position.set(x, y, z);
        base.scale.set(0.15, 0.2, 0.15);
        counter4++;

        super(`tree_${counter4}`, base);
    }
}

export { GrBuilding1, GrBuilding2, GrBuilding3, GrRandomTree };