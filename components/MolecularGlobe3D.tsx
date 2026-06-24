"use client";

import { useEffect, useRef } from "react";

export default function MolecularGlobe3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
      camera.position.z = 14;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // ── Lighting ──────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const goldLight = new THREE.PointLight(0xc4973a, 4, 40);
      goldLight.position.set(6, 6, 8);
      scene.add(goldLight);
      const forestLight = new THREE.PointLight(0x2d4a2f, 2, 40);
      forestLight.position.set(-6, -6, 4);
      scene.add(forestLight);

      // ── Central nucleus ───────────────────────────────────────────
      const nucleus = new THREE.Mesh(
        new THREE.SphereGeometry(0.85, 36, 36),
        new THREE.MeshPhongMaterial({
          color: 0xc4973a,
          emissive: 0xc4973a,
          emissiveIntensity: 0.7,
          shininess: 120,
        }),
      );
      scene.add(nucleus);

      // Layered glow around nucleus
      for (let i = 1; i <= 4; i++) {
        const g = new THREE.Mesh(
          new THREE.SphereGeometry(0.85 + i * 0.55, 32, 32),
          new THREE.MeshBasicMaterial({
            color: 0xc4973a,
            transparent: true,
            opacity: 0.055 / i,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        scene.add(g);
      }

      // ── Orbit rings + electrons ───────────────────────────────────
      const orbitConfig = [
        { radius: 2.8, tiltX: 0, tiltZ: 0, speed: 0.55, electrons: 2 },
        { radius: 3.5, tiltX: Math.PI / 2.5, tiltZ: Math.PI / 6, speed: 0.38, electrons: 3 },
        { radius: 4.2, tiltX: Math.PI / 1.6, tiltZ: -Math.PI / 4, speed: 0.28, electrons: 2 },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const electronData: any[] = [];

      orbitConfig.forEach(({ radius, tiltX, tiltZ, speed, electrons }) => {
        // Ring line
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pts: any[] = [];
        for (let i = 0; i <= 80; i++) {
          const a = (i / 80) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
        }
        const ring = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: 0xc4973a, transparent: true, opacity: 0.22 }),
        );
        ring.rotation.x = tiltX;
        ring.rotation.z = tiltZ;
        scene.add(ring);

        // Electrons on ring
        for (let i = 0; i < electrons; i++) {
          const angle = (i / electrons) * Math.PI * 2;
          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.14, 14, 14),
            new THREE.MeshPhongMaterial({
              color: 0xc4973a,
              emissive: 0xc4973a,
              emissiveIntensity: 0.9,
              shininess: 80,
            }),
          );
          scene.add(mesh);
          electronData.push({ mesh, radius, tiltX, tiltZ, speed, angle });

          // Tiny glow around each electron
          const eg = new THREE.Mesh(
            new THREE.SphereGeometry(0.28, 10, 10),
            new THREE.MeshBasicMaterial({
              color: 0xc4973a,
              transparent: true,
              opacity: 0.08,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            }),
          );
          scene.add(eg);
          electronData[electronData.length - 1].glow = eg;
        }
      });

      // ── Outer atom cloud ──────────────────────────────────────────
      const outerAtomCount = 12;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const outerAtoms: any[] = [];
      const bondVerts: number[] = [];

      for (let i = 0; i < outerAtomCount; i++) {
        const isGold = i % 3 === 0;
        const r = 5.2 + Math.random() * 2.8;
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const pos = new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(isGold ? 0.22 : 0.16, 14, 14),
          new THREE.MeshPhongMaterial({
            color: isGold ? 0xc4973a : 0x2d4a2f,
            emissive: isGold ? 0xc4973a : 0x2d4a2f,
            emissiveIntensity: isGold ? 0.5 : 0.2,
            shininess: 60,
          }),
        );
        mesh.position.copy(pos);
        scene.add(mesh);
        outerAtoms.push({ mesh, basePos: pos.clone(), phase: Math.random() * Math.PI * 2 });
      }

      // Static bonds between nearby outer atoms
      for (let i = 0; i < outerAtoms.length; i++) {
        for (let j = i + 1; j < outerAtoms.length; j++) {
          if (outerAtoms[i].basePos.distanceTo(outerAtoms[j].basePos) < 4) {
            const a = outerAtoms[i].basePos, b = outerAtoms[j].basePos;
            bondVerts.push(a.x, a.y, a.z, b.x, b.y, b.z);
          }
        }
      }
      const bondGeo = new THREE.BufferGeometry();
      bondGeo.setAttribute("position", new THREE.Float32BufferAttribute(bondVerts, 3));
      scene.add(new THREE.LineSegments(bondGeo, new THREE.LineBasicMaterial({
        color: 0xc4973a, transparent: true, opacity: 0.1,
      })));

      // ── Mouse parallax ────────────────────────────────────────────
      let mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);

      const onResize = () => {
        const w = container.clientWidth, h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Animation loop ────────────────────────────────────────────
      let rafId: number;
      let t = 0;

      // Temp quaternion for rotating orbit positions to world space
      const tempQ = new THREE.Quaternion();
      const tempV = new THREE.Vector3();

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (document.hidden) return;
        t += 0.006;

        if (!prefersReducedMotion) {
          // Scene parallax
          scene.rotation.y = t * 0.12 + mx * 0.18;
          scene.rotation.x = Math.sin(t * 0.09) * 0.07 + my * 0.09;

          // Nucleus pulse
          const p = 1 + Math.sin(t * 2.2) * 0.055;
          nucleus.scale.setScalar(p);

          // Electrons orbit
          electronData.forEach((ed) => {
            ed.angle += ed.speed * 0.016;
            // Local orbit position
            tempV.set(
              Math.cos(ed.angle) * ed.radius,
              Math.sin(ed.angle) * ed.radius,
              0,
            );
            // Apply ring tilt via euler
            tempQ.setFromEuler(new THREE.Euler(ed.tiltX, 0, ed.tiltZ));
            tempV.applyQuaternion(tempQ);
            ed.mesh.position.copy(tempV);
            if (ed.glow) ed.glow.position.copy(tempV);
          });

          // Outer atoms float
          outerAtoms.forEach(({ mesh, basePos, phase }) => {
            mesh.position.set(
              basePos.x + Math.sin(t * 0.45 + phase) * 0.18,
              basePos.y + Math.cos(t * 0.38 + phase) * 0.18,
              basePos.z + Math.sin(t * 0.28 + phase) * 0.12,
            );
          });

          // Pulse gold light
          goldLight.intensity = 3.5 + Math.sin(t * 2) * 0.8;
        }

        renderer.render(scene, camera);
      };

      if (!prefersReducedMotion) {
        animate();
      } else {
        renderer.render(scene, camera);
      }

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: "420px" }}
      aria-hidden="true"
    />
  );
}
