import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { COLORS } from "./theme.js";

/* ---------- reveal-on-scroll ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

export function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(.22,.61,.36,1) ${delay}s, transform 0.9s cubic-bezier(.22,.61,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- tilt card ---------- */
export function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) translateZ(6px)`,
      transition: "transform 0.06s linear",
    });
  }, []);
  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 0.5s cubic-bezier(.22,.61,.36,1)",
    });
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ ...style, willChange: "transform" }} className={className}>
      {children}
    </div>
  );
}

/* ---------- illustrated spice mounds (SVG, no external images) ---------- */
const MOUND_PATHS = [
  "M60,190 C40,140 70,90 130,75 C190,60 250,90 255,150 C260,205 210,235 150,235 C95,235 78,225 60,190 Z",
  "M40,200 C30,150 90,110 150,100 C215,90 270,120 270,165 C270,215 200,240 140,238 C85,236 48,235 40,200 Z",
  "M70,210 C45,160 55,110 110,85 C150,65 190,70 220,95 C260,125 265,175 235,205 C205,235 150,245 110,235 C90,230 82,225 70,210 Z",
];
const FLECKS = [
  { x: 100, y: 150, r: 4 }, { x: 140, y: 118, r: 3 }, { x: 175, y: 168, r: 5 },
  { x: 120, y: 195, r: 3 }, { x: 205, y: 145, r: 4 }, { x: 92, y: 112, r: 3 },
  { x: 205, y: 195, r: 3 }, { x: 150, y: 212, r: 4 }, { x: 165, y: 130, r: 3 },
];

export function GrainDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="spice-grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" result="noiseAlpha" />
          <feComposite in="noiseAlpha" in2="SourceGraphic" operator="in" result="grain" />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>
    </svg>
  );
}

export function SpiceMound({ id, base, deep, threads = false, variant = 0, showFlecks = true, highlight = true }) {
  const gradId = `mound-grad-${id}`;
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor={base} stopOpacity="1" />
          <stop offset="55%" stopColor={base} />
          <stop offset="100%" stopColor={deep} />
        </radialGradient>
      </defs>
      <path d={MOUND_PATHS[variant % MOUND_PATHS.length]} fill={`url(#${gradId})`} filter="url(#spice-grain)" />
      {showFlecks &&
        FLECKS.map((f, i) => (
          <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={deep} opacity={i % 3 === 0 ? 0.5 : 0.28} />
        ))}
      {threads &&
        [...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M${100 + i * 15},${210 - i * 6} C${110 + i * 15},${180 - i * 6} ${95 + i * 15},${150 - i * 6} ${115 + i * 15},${110 - i * 6}`}
            stroke={COLORS.redDeep}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
      {highlight && <ellipse cx="105" cy="105" rx="38" ry="22" fill="#FFFFFF" opacity="0.22" />}
    </svg>
  );
}

/* ---------- 3D hero: mortar, pestle, spice-dust vortex ---------- */
function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

function VortexFallback() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "70%", maxWidth: "260px", aspectRatio: "1/1" }}>
        <SpiceMound id="vortex-fallback" base="#FAA219" deep="#8E1B1D" variant={1} threads />
      </div>
    </div>
  );
}

export class VortexErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.failed) return <VortexFallback />;
    return this.props.children;
  }
}

export function SpiceVortexScene() {
  const mountRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!hasWebGL()) {
      setSupported(false);
      return;
    }
    const mount = mountRef.current;
    if (!mount) return;
    let renderer, particleGeo, bowlGeo, bowlInnerGeo, bowlMat, bowlInnerMat, particleMat, raf, ro, onMove;
    try {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 1.55, 6.1);
      camera.lookAt(0, 0.55, 0);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0x3a2a1a, 1.3));
      const key = new THREE.DirectionalLight(0xffe3b0, 1.7);
      key.position.set(3, 5, 4);
      scene.add(key);
      const rim = new THREE.PointLight(0xfaa219, 2.4, 12);
      rim.position.set(-2, 2.5, 2);
      scene.add(rim);

      const rig = new THREE.Group();
      scene.add(rig);
      bowlMat = new THREE.MeshStandardMaterial({ color: 0xc9a667, metalness: 0.55, roughness: 0.32 });
      bowlGeo = new THREE.SphereGeometry(1.5, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2);
      const bowl = new THREE.Mesh(bowlGeo, bowlMat);
      bowl.position.y = -0.55;
      bowl.scale.set(1, 0.72, 1);
      rig.add(bowl);
      bowlInnerGeo = new THREE.SphereGeometry(1.38, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2);
      bowlInnerMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, metalness: 0.2, roughness: 0.8 });
      const bowlInner = new THREE.Mesh(bowlInnerGeo, bowlInnerMat);
      bowlInner.position.y = -0.48;
      bowlInner.scale.set(1, 0.7, 1);
      rig.add(bowlInner);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 0.35, 40), bowlMat);
      base.position.y = -1.35;
      rig.add(base);
      const pestle = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 2.1, 24), bowlMat);
      pestle.add(shaft);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), bowlMat);
      tip.position.y = -1.15;
      pestle.add(tip);
      pestle.rotation.z = 0.42;
      pestle.position.set(0.45, 0.55, 0.25);
      rig.add(pestle);

      const COUNT = 520;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const seeds = [];
      const cRed = new THREE.Color(0xd22c2e);
      const cMustard = new THREE.Color(0xfaa219);
      const cDark = new THREE.Color(0x2a160c);
      for (let i = 0; i < COUNT; i++) {
        seeds.push({
          angle0: Math.random() * Math.PI * 2,
          radius: 0.25 + Math.random() * 1.35,
          yBase: Math.random() * 3.4,
          speed: 0.18 + Math.random() * 0.35,
          mix: Math.random(),
        });
      }
      particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      particleMat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false });
      rig.add(new THREE.Points(particleGeo, particleMat));

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      resize();
      ro = new ResizeObserver(resize);
      ro.observe(mount);

      let targetX = 0, targetY = 0;
      onMove = (e) => {
        const rect = mount.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
        targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.35;
      };
      window.addEventListener("mousemove", onMove);

      const clock = new THREE.Clock();
      const tmpColor = new THREE.Color();
      const tick = () => {
        const t = clock.getElapsedTime();
        const posAttr = particleGeo.getAttribute("position");
        const colAttr = particleGeo.getAttribute("color");
        for (let i = 0; i < COUNT; i++) {
          const s = seeds[i];
          const span = 3.4;
          const y = (s.yBase + t * (reduceMotion ? 0 : 0.42)) % span;
          const shrink = 1 - (y / span) * 0.55;
          const angle = s.angle0 + t * (reduceMotion ? 0 : s.speed);
          const r = s.radius * shrink;
          posAttr.array[i * 3] = Math.cos(angle) * r;
          posAttr.array[i * 3 + 1] = y - 0.9;
          posAttr.array[i * 3 + 2] = Math.sin(angle) * r;
          tmpColor.copy(cRed).lerp(cMustard, s.mix);
          tmpColor.lerp(cDark, Math.min(1, y / span + 0.05));
          colAttr.array[i * 3] = tmpColor.r;
          colAttr.array[i * 3 + 1] = tmpColor.g;
          colAttr.array[i * 3 + 2] = tmpColor.b;
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
        if (!reduceMotion) rig.rotation.y += 0.0026;
        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (1.55 - targetY - camera.position.y) * 0.04;
        camera.lookAt(0, 0.35, 0);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setSupported(false);
    }
    return () => {
      try {
        if (raf) cancelAnimationFrame(raf);
        if (ro) ro.disconnect();
        if (onMove) window.removeEventListener("mousemove", onMove);
        [bowlGeo, bowlInnerGeo, particleGeo, bowlMat, bowlInnerMat, particleMat].forEach((x) => x && x.dispose());
        if (renderer) {
          renderer.dispose();
          if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        }
      } catch {}
    };
  }, []);

  if (!supported) return <VortexFallback />;
  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
