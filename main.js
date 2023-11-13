import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load('image.jpg')
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const STARTY = 20;
camera.position.y = STARTY;
camera.position.z = 30;

const geometry = new THREE.PlaneGeometry( 30, 20 );
const texture = new THREE.TextureLoader().load('oshaCert.png')
const material = new THREE.MeshBasicMaterial( 
    {
        side: THREE.DoubleSide,
        map: texture
    } 
);
const plane = new THREE.Mesh( geometry, material );
plane.rotation.y = 10;
plane.position.y = 10;
plane.position.x = -15;
scene.add( plane );


function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.25;
    console.log(top);
}

const renderer = new THREE.WebGLRenderer(
    {canvas: document.querySelector('#bg')}
);
    
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function animate() {
    document.body.onscroll = moveCamera;
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        
}

animate()