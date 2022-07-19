import './style.css'
import * as THREE from 'three';
import {color, func} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {lights} from "three/examples/jsm/nodes/shadernode/ShaderNodeElements";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

//loading background model
const gltfLoader = new GLTFLoader();
gltfLoader.load('./Model/background_portfolio101.gltf',(gltf) => {
    gltf.scene.scale.set(4,4,4);

    const root = gltf.scene;
    scene.add(root)})



//scene
const scene = new THREE.Scene();

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);


//camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,2000);
camera.position.setZ(60);
camera.position.setY(30);

const controls = new OrbitControls(camera,renderer.domElement)

//calling
renderer.render(scene,camera);


//Ambient light

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight);


//light

const pointLight = new THREE.PointLight(0xFFFFFF,4,100,1);
pointLight.position.set(5,15,20)
scene.add(pointLight)

//helper
scene.add(new THREE.GridHelper(500,10,0x444444,0x888888))
scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.PointLightHelper(pointLight));


//test geometry
const geometry = new THREE.TorusKnotGeometry(1,0.4,67,8,2,3);
const material = new THREE.MeshPhongMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry,material);
scene.add(torus);
torus.position.set(10,10,2)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(1000));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);




//animate
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
//torus rotation
   torus.rotation.x += 0.01;
   torus.rotation.y += 0.01;
   torus.rotation.z += 0.01;
//controls
    controls.update();

}
animate()

