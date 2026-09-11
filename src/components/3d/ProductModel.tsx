'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';

export default function ProductModel() {
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const { config, setColor } = useConfiguratorStore();

  // Usa la URL subida por el usuario o el modelo base
  const modelPath = config.customModelUrl || '/model.glb';
  const { scene } = useGLTF(modelPath);

  const materialProps = {
    metal: { metalness: 0.9, roughness: 0.15 },
    plastic: { metalness: 0.1, roughness: 0.4 },
    leather: { metalness: 0.0, roughness: 0.8 },
  }[config.material];

  scene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      if (mesh.material) {
        const mat = mesh.material as MeshStandardMaterial;
        mat.color.set(config.color);
        mat.metalness = materialProps.metalness;
        mat.roughness = materialProps.roughness;
      }
    }
  });

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (config.activeAnimation === 'rotate-360') {
      meshRef.current.rotation.y += delta * 1.5;
    } else if (config.activeAnimation === 'bounce') {
      meshRef.current.position.y = Math.sin(Date.now() * 0.003) * 0.2;
    } else {
      meshRef.current.position.y = 0;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={hovered ? 1.05 : 1}
      position={[0, 0, 0]}
      onClick={(e: any) => {
        e.stopPropagation();
        setColor('#10b981');
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}