import './style.css'
import * as THREE from './three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000 
);

const renderer = new THREE.WebGLRenderer(
  { canvas: document.querySelector('#bg') }
);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.z = 50;
camera.position.Y = 50;

//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
const pointLight = new THREE.PointLight(0xffffff, 1000, 1000);
pointLight.position.set(0, 0, 50);
scene.add(ambientLight, pointLight)

//HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
const axesHelper = new THREE.AxesHelper(20, 20, 20)
scene.add(lightHelper, gridHelper, axesHelper)

const geoPog = new THREE.CylinderGeometry(5, 5, 0.25, 40);
const pogtexture = new THREE.TextureLoader().load('eevee.png')
const matPog = new THREE.MeshStandardMaterial( { color: 0xFFFFFF, wireframe: false, map: pogtexture })
const pog = new THREE.Mesh( geoPog, matPog );

pog.rotation.x = 45;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} )
  const star = new THREE.Mesh( geometry, material )
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))
  
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function animate(time) {
  requestAnimationFrame( animate );
  pog.rotation.x += 0.01
  pog.rotation.y += 0.005
  pog.rotation.z += 0.01
  
  renderer.render( scene, camera );
}

function scroll() {
  const t = document.body.getBoundingClientRect().top
  
  pog.rotation.x += 0.01
  pog.rotation.y += 0.005
  pog.rotation.z += 0.01
  
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = scroll
scroll()
scene.add(pog);

animate()