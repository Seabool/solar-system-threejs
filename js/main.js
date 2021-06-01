import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 30;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Loading textures
const textureEarth = new THREE.TextureLoader().load("img/earth.jpg");
const textureMoon = new THREE.TextureLoader().load("img/moon.jpg");
const textureSun = new THREE.TextureLoader().load("img/sun.jpg");
const textureMercury = new THREE.TextureLoader().load("img/mercury.jpg");
const textureVenus = new THREE.TextureLoader().load("img/venus.jpg");
const textureMars = new THREE.TextureLoader().load("img/mars.jpg");
const textureJupiter = new THREE.TextureLoader().load("img/jupiter.jpg");
const textureSaturn = new THREE.TextureLoader().load("img/saturn.jpg");
const textureUranus = new THREE.TextureLoader().load("img/uranus.jpg");
const textureNeptune = new THREE.TextureLoader().load("img/neptune.jpg");

function createPlanet(size, texture) {
    var geometry = new THREE.SphereGeometry(size, 25, 25);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = false;
    return sphere;
}

function rotatePlanet(planet, self, speed, distance) {
    var time = Date.now() * 0.005;
    planet.rotation.y -= self;
    planet.position.x = Math.cos(time * (speed / (10 + 10))) * distance;
    planet.position.z = Math.sin(time * (speed / (10 + 10))) * distance;
}

var sphereSun = createPlanet(5, textureSun);
var sphereMercury = createPlanet(0.25, textureMercury);
var sphereVenus = createPlanet(0.5, textureVenus);
var sphereEarth = createPlanet(0.5, textureEarth);
var sphereMoon = createPlanet(0.1, textureMoon);
var sphereMars = createPlanet(0.3, textureMars);
var sphereJupiter = createPlanet(2, textureJupiter);
var sphereSaturn = createPlanet(1.5, textureSaturn);
var sphereUranus = createPlanet(0.4, textureUranus);
var sphereNeptune = createPlanet(0.75, textureNeptune);

scene.add(sphereSun);
scene.add(sphereMercury);
scene.add(sphereVenus);

const groupEarth = new THREE.Group();
sphereMoon.position.x += 3;
groupEarth.add(sphereEarth);
groupEarth.add(sphereMoon);
scene.add(groupEarth);

scene.add(sphereMars);
scene.add(sphereJupiter);

const geometrySaturnRing = new THREE.RingGeometry(4, 5, 32);
const materialSaturnRing = new THREE.MeshBasicMaterial({
    map: textureSaturn,
    side: THREE.DoubleSide,
});
const meshSaturnRing = new THREE.Mesh(geometrySaturnRing, materialSaturnRing);
meshSaturnRing.rotation.x -= 1.6;

const groupSaturn = new THREE.Group();
groupSaturn.add(sphereSaturn);
groupSaturn.add(meshSaturnRing);
scene.add(groupSaturn);

scene.add(sphereUranus);
scene.add(sphereNeptune);

const controls = new OrbitControls(camera, renderer.domElement);

var render = function () {
    requestAnimationFrame(render);
    var distanceFromSun = 150;

    rotatePlanet(sphereSun, 0.02, 0, 0);
    rotatePlanet(sphereMercury, 0.0001, 4.7, distanceFromSun * 0.1);
    rotatePlanet(sphereVenus, 0.000065, 3.5, distanceFromSun * 0.2);
    rotatePlanet(groupEarth, 0.2, 2.98, distanceFromSun * 0.3);
    rotatePlanet(sphereMars, 0.008, 2.41, distanceFromSun * 0.4);
    rotatePlanet(sphereJupiter, 4.58, 1.31, distanceFromSun * 0.5);
    rotatePlanet(groupSaturn, 3.68, 0.97, distanceFromSun * 0.6);
    rotatePlanet(sphereUranus, 1.4, 0.68, distanceFromSun * 0.7);
    rotatePlanet(sphereNeptune, 0.09, 0.54, distanceFromSun * 0.8);

    controls.update();
    renderer.render(scene, camera);
};

render();
