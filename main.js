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
plane.position.y = 0;
plane.position.x = 10;

const onlyPG = new THREE.PlaneGeometry( 30, 20 )
const onlyPT = new THREE.TextureLoader().load('onlyPogs.png')
const onlyPM = new THREE.MeshBasicMaterial(
    {
        side: THREE.DoubleSide,
        map: onlyPT
    }
    )
const onlyP = new THREE.Mesh(onlyPG, onlyPM)

onlyP.rotation.y = 10;
onlyP.position.y = -50;
onlyP.position.x = 10

const onlyPMG = new THREE.PlaneGeometry( 5, 20 )
const onlyPMT = new THREE.TextureLoader().load('onlyPM.png')
const onlyPMM = new THREE.MeshBasicMaterial(
    {
        side: THREE.DoubleSide,
        map: onlyPMT
    }
)
const onlyPMCSS = new THREE.Mesh(onlyPMG, onlyPMM)

onlyPMCSS.rotation.y = 10;
onlyPMCSS.position.y = -25;
onlyPMCSS.position.x = 10

if (window.innerWidth <= 460) {
    camera.position.x = 0
   for(const child in scene.children) {
       scene.children[child].rotation.y = 0 * (Math.PI / 180)
       scene.children[child].position.y = child * -10
   }
}else {
    camera.position.x = 28
    for (const child in scene.children) {
        scene.children[child].rotation.y = 15 * (Math.PI / 180)
        scene.children[child].position.y = child * -10;
    }
}
scene.add( plane, onlyP, onlyPMCSS )


function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.1;
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