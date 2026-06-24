"use client";

import { useEffect, useRef } from "react";

export default function MolecularCanvas3D() {
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
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
      camera.position.z = 32;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.45));
      const goldPt = new THREE.PointLight(0xc4973a, 2.5, 90);
      goldPt.position.set(15, 12, 10);
      scene.add(goldPt);
      const forestPt = new THREE.PointLight(0x2d4a2f, 1.5, 90);
      forestPt.position.set(-15, -10, 5);
      scene.add(forestPt);

      // Nodes with velocity for drift
      const nodeCount = window.innerWidth < 768 ? 20 : 38;
      const goldFraction = Math.floor(nodeCount * 0.28);
      const BOUNDS = { x: 22, y: 17, z: 12 };
      const MAX_DIST = 14;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodes: any[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const isGold = i < goldFraction;
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(isGold ? 0.42 : 0.26, 18, 18),
          new THREE.MeshPhongMaterial({
            color: isGold ? 0xc4973a : 0x2d4a2f,
            emissive: isGold ? 0xc4973a : 0x2d4a2f,
            emissiveIntensity: isGold ? 0.45 : 0.15,
            shininess: 70,
          }),
        );
        mesh.position.set(
          (Math.random() - 0.5) * BOUNDS.x * 2,
          (Math.random() - 0.5) * BOUNDS.y * 2,
          (Math.random() - 0.5) * BOUNDS.z * 2,
        );
        // Random drift velocity
        const speed = 0.018 + Math.random() * 0.022;
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        scene.add(mesh);
        nodes.push({ mesh, vel: dir.multiplyScalar(speed), isGold, phase: Math.random() * Math.PI * 2 });
      }

      // Bond line geometry (updated every frame)
      const maxBonds = nodeCount * nodeCount;
      const bondPositions = new Float32Array(maxBonds * 6);
      const bondGeo = new THREE.BufferGeometry();
      bondGeo.setAttribute("position", new THREE.BufferAttribute(bondPositions, 3));
      bondGeo.setDrawRange(0, 0);
      const bondLines = new THREE.LineSegments(
        bondGeo,
        new THREE.LineBasicMaterial({ color: 0xc4973a, transparent: true, opacity: 0.16 }),
      );
      scene.add(bondLines);

      // Mouse
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

      let rafId: number;
      let t = 0;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (document.hidden) return;
        t += 0.004;

        if (!prefersReducedMotion) {
          // Scene rotation + parallax
          scene.rotation.y = t * 0.18 + mx * 0.12;
          scene.rotation.x = Math.sin(t * 0.14) * 0.06 + my * 0.07;

          // Move nodes + bounce off bounds
          nodes.forEach((n) => {
            n.mesh.position.addScaledVector(n.vel, 1);
            const p = n.mesh.position;
            if (Math.abs(p.x) > BOUNDS.x) n.vel.x *= -1;
            if (Math.abs(p.y) > BOUNDS.y) n.vel.y *= -1;
            if (Math.abs(p.z) > BOUNDS.z) n.vel.z *= -1;

            // Pulse gold emissive
            if (n.isGold) {
              n.mesh.material.emissiveIntensity = 0.3 + Math.sin(t * 1.8 + n.phase) * 0.2;
            }
          });

          // Rebuild bonds
          let bondIdx = 0;
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              if (nodes[i].mesh.position.distanceTo(nodes[j].mesh.position) < MAX_DIST) {
                const a = nodes[i].mesh.position, b = nodes[j].mesh.position;
                bondPositions[bondIdx++] = a.x; bondPositions[bondIdx++] = a.y; bondPositions[bondIdx++] = a.z;
                bondPositions[bondIdx++] = b.x; bondPositions[bondIdx++] = b.y; bondPositions[bondIdx++] = b.z;
              }
            }
          }
          bondGeo.attributes.position.needsUpdate = true;
          bondGeo.setDrawRange(0, bondIdx / 3);
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
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        renderer.dispose();
      };
    });

    return () => cleanup?.();
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
