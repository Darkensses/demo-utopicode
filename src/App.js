import { Html, MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSpring, a } from "react-spring/three";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import gltfModel from "./PS-Controller-classic.glb"
import './App.css';

function Cubo() {
  let cubeRef = useRef();
  let [isClicked, setIsClicked] = useState(false);
  
  useFrame(() => {
    cubeRef.current.rotation.x = cubeRef.current.rotation.y += 0.01;
  });

  const handleClick = () => {
    setIsClicked(!isClicked);    
  }

  const spring = useSpring({
    scale: isClicked ? [2,2,2] : [1,1,1],
    position: isClicked ? [-1,1,-2] : [0,0,0]
  })

  return(
    <a.mesh ref={cubeRef} onClick={handleClick} scale={spring.scale} position={spring.position}>
        <boxGeometry args={[1,1,1]}/>
        <meshNormalMaterial />
    </a.mesh>
  )
}

function GeoDrei() {
  return(
    <Sphere position={[-1,1,1]} args={[0.5,32,32]}>
      <MeshDistortMaterial color='purple' distort={0.4} speed={3} />
    </Sphere>
  )
}

function Model() {
  let gltf = useLoader(GLTFLoader, gltfModel);
  
  return(
    <primitive object={gltf.scene} />
  )
}

function App() {  
  return (
    <div className="App">
      <Canvas
        camera={{
          position: [0,5,8],
          fov: 85,
          rotation: [0,0,0]          
        }}
      >
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <Cubo/>
        <GeoDrei/>
        <Suspense fallback={<Html center>Loading...</Html>}>
          <Model/>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
