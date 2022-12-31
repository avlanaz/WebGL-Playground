import * as THREE from 'three';

/* TO-DO
- Add RGB change
- Add simple shading 
*/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false } );
const cube = new THREE.Mesh( geometry, material);
scene.add(cube);

camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame( animate );
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    const time = clock.getElapsedTime();
    cube.position.x = Math.cos(time);
    cube.position.y = Math.sin(time);

    const colorTime = time/2;
    const rTheta = colorTime % 3 < 1.5 ? THREE.MathUtils.clamp(colorTime % 3 + 1, 1, 2) : THREE.MathUtils.clamp(colorTime % 3 - 2, 0, 1);
    const gTheta = THREE.MathUtils.clamp(colorTime % 3, 0, 2);
    const bTheta = THREE.MathUtils.clamp(colorTime % 3 - 1, 0, 2);


    const r = Math.sin(Math.PI/2*(Math.abs(rTheta-1)*-1 + 1));
    const g = Math.sin(Math.PI/2*(Math.abs(gTheta-1)*-1 + 1));
    const b = Math.sin(Math.PI/2*(Math.abs(bTheta-1)*-1 + 1));
    cube.material.color.setRGB(r, g, b);

    

    renderer.render(scene, camera);
}

clock.start();
animate();