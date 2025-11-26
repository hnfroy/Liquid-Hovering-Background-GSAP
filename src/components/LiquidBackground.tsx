import { useEffect, useRef, type JSX } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function LiquidBackground(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Shader (simple)
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const vertex = `
      precision mediump float;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragment = `
      precision mediump float;
      varying vec2 vUv;

      uniform float uTime;
      uniform vec2 uMouse;

      // basic noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43578.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) +
               (c - a) * u.y * (1.0 - u.x) +
               (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;

        // hover distortion
        float dist = distance(uv, uMouse);
        float hover = exp(-dist * 5.0);

        // wobble
        float n = noise(uv * 3.0 + uTime * 0.5 + hover * 0.5);

        vec3 color = mix(vec3(0.95, 0.25, 0.35), vec3(1.0, 0.8, 0.5), n);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // animate
    const tick = () => {
      uniforms.uTime.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    // mouse → smooth wobble
    const onMove = (e: MouseEvent): void => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;

      gsap.to(uniforms.uMouse.value, {
        x,
        y,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMove);

    // cleanup
    return () => {
      window.removeEventListener("mousemove", onMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
