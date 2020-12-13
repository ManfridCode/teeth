import React, {useRef} from 'react';
import { useSelector } from 'react-redux';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';

extend({ OrbitControls });

const gum_contours_material = new THREE.LineBasicMaterial({color:0x00ff00});
const bridges_material = new THREE.LineBasicMaterial({color:0x0000ff});
const suspicous_material = new THREE.LineBasicMaterial({color:0xff0000});
const modelMaterial = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200, side:THREE.DoubleSide } );

const CanvasBlock = ()=>{

    const json = useSelector(store=>store.json);
    const geometry = useSelector(store=>store.geometry);
    const controls = useRef();

    const SplinesJson = ({ data })=>{

      if(!data) return null;
      const group = new THREE.Group();

      data.bridges.map((b,i)=>{
        const curve = new THREE.SplineCurve(b.reduce((acc,p)=>{
            acc.push(new THREE.Vector3(p[0],p[1],p[2]));
            return acc;
        },[]));

        const points = curve.getPoints( b.length );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const splineObject = new THREE.Line( geometry, data.suspicious.bridges[i]?suspicous_material:bridges_material);
        group.add(splineObject);
      });

      data.gum_contours.map((b,i)=>{
        const curve = new THREE.SplineCurve(b.reduce((acc,p)=>{
            acc.push(new THREE.Vector3(p[0],p[1],p[2]));
            return acc;
        },[]));

        const points = curve.getPoints( b.length );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const splineObject = new THREE.Line( geometry, gum_contours_material);
        group.add(splineObject);
      });

      return (
        <primitive object={group} />
      )
    }

    const Model = ({geometry})=>{
      if(!geometry) return null;
      const mesh = new THREE.Mesh(geometry,modelMaterial);
      return (
        <primitive object={mesh} />
      )
    }

    const CameraControls = () => {
      const {
        camera,
        gl: { domElement },
      } = useThree();
      useFrame(state => controls.current.update());
      return <orbitControls ref={controls} args={[camera, domElement]} />;
    };

    return (
        <Canvas id="webgl" shadowMap camera={{ position: [0, 0, 40] }}>
          <CameraControls />
          <ambientLight intensity={0.5} />
          <hemisphereLight color={0xFFFFFF} skyColor={0x443333} groundColor={0x111122} />
          <directionalLight intensity={1.0} position={[100, 100, 100]} color={0xffffff} penumbra={1} castShadow />
          <SplinesJson data={json}/>
          <Model geometry={geometry}/>
        </Canvas>
    )
}

export default CanvasBlock;