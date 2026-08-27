"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// ─── Mouse tracker (shared ref, no re-renders) ───────────────────────────────
type MouseXY = { x: number; y: number };

function useMouse(): React.RefObject<MouseXY> {
  const ref = useRef<MouseXY>({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return ref;
}

// ─── Camera helper ───────────────────────────────────────────────────────────
function CameraLookAt({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();
  useEffect(() => { camera.lookAt(...target); }, [camera, target]);
  return null;
}

// ─── Avatar model with gaze + subtle body sway ───────────────────────────────
function AvatarModel({ mouse }: { mouse: React.RefObject<MouseXY> }) {
  const { scene } = useGLTF("/avatar.glb");

  // Bone references — Avaturn uses Mixamo naming (no eye bones)
  const headBone  = useRef<THREE.Object3D | null>(null);
  const neckBone  = useRef<THREE.Object3D | null>(null);
  const spineBone = useRef<THREE.Object3D | null>(null);

  // Smoothed state
  const smooth = useRef({ hx: 0, hy: 0, nx: 0, ny: 0, sx: 0, sy: 0 });

  // Find bones once after load
  useEffect(() => {
    scene.traverse((obj) => {
      const n = obj.name.toLowerCase();
      if (!headBone.current  && n === "head")   headBone.current  = obj;
      if (!neckBone.current  && n === "neck")   neckBone.current  = obj;
      if (!spineBone.current && n === "spine2") spineBone.current = obj;
    });
  }, [scene]);

  useFrame(({ clock }) => {
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;
    const s  = smooth.current;
    const t  = clock.getElapsedTime();

    // Subtle idle breathing sway (very slow sine)
    const idleSway = Math.sin(t * 0.6) * 0.012;
    const idleNod  = Math.sin(t * 0.4) * 0.008;

    // Target rotations — head leads, neck follows at 40%, spine at 15%
    const tHeadY =  mx * 0.38  + idleSway;
    const tHeadX = -my * 0.20  + idleNod;
    const tNeckY =  mx * 0.15;
    const tNeckX = -my * 0.08;
    const tSpineY = mx * 0.06;
    const tSpineX = idleNod * 0.5;

    const lh = 0.06;   // head lerp speed
    const ln = 0.055;  // neck
    const ls = 0.04;   // spine (slowest — most inertia)

    s.hy = THREE.MathUtils.lerp(s.hy, tHeadY,  lh);
    s.hx = THREE.MathUtils.lerp(s.hx, tHeadX,  lh);
    s.ny = THREE.MathUtils.lerp(s.ny, tNeckY,  ln);
    s.nx = THREE.MathUtils.lerp(s.nx, tNeckX,  ln);
    s.sy = THREE.MathUtils.lerp(s.sy, tSpineY, ls);
    s.sx = THREE.MathUtils.lerp(s.sx, tSpineX, ls);

    if (headBone.current) {
      headBone.current.rotation.y = s.hy;
      headBone.current.rotation.x = s.hx;
    }
    if (neckBone.current) {
      neckBone.current.rotation.y = s.ny;
      neckBone.current.rotation.x = s.nx;
    }
    if (spineBone.current) {
      spineBone.current.rotation.y = s.sy;
      spineBone.current.rotation.x = s.sx;
    }
  });

  return (
    <primitive
      object={scene}
      scale={1.52}
      position={[0, -1.15, 0]}
      rotation={[0, FRONT_ROTATION, 0]}
    />
  );
}

const FRONT_ROTATION = 0;

// ─── Loader placeholder ───────────────────────────────────────────────────────
function Loader() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 1.5; });
  return (
    <mesh ref={ref} position={[0, 1.6, 0]}>
      <torusGeometry args={[0.2, 0.04, 16, 40]} />
      <meshStandardMaterial color="#7c3aed" />
    </mesh>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function Avatar3D() {
  const mouse = useMouse();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="relative w-full h-[520px] lg:h-[620px]"
    >
      {/* Purple glow */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 72% 60% at 50% 60%, rgba(124,58,237,0.6) 0%, rgba(80,40,200,0.18) 48%, transparent 72%)",
        filter: "blur(28px)",
      }} />

      <Canvas
        style={{ position: "relative", zIndex: 1 }}
        camera={{ position: [0, 1.3, 1.5], fov: 36 }}
        gl={{ alpha: true, antialias: true }}
      >
        <CameraLookAt target={[0, 1.62, 0]} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[1, 2, 2]}   intensity={1.8} color="#ffffff" />
        <pointLight       position={[-2, 2, -1]}  intensity={3}   color="#7c3aed" />
        <pointLight       position={[2, 1.5, 2]}  intensity={0.8} color="#4f46e5" />
        <pointLight       position={[0, 3, 1]}    intensity={0.5} color="#ffffff" />

        <Suspense fallback={<Loader />}>
          <AvatarModel mouse={mouse} />
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.4} scale={3} blur={2}
            color="#7c3aed"
          />
        </Suspense>

        <OrbitControls
          target={[0, 1.62, 0]}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </motion.div>
  );
}

useGLTF.preload("/avatar.glb");
