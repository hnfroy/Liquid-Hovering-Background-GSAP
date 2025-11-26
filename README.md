# 🚀 Liquid 3D Page Experience (React + Three.js + GSAP)

Project ini adalah eksperimen UI/UX modern berbasis **React + Vite**, dengan perpaduan efek:
- Liquid interactive background (Three.js Shader)
- Dynamic hover distortion
- 3D immersive page transitions (GSAP)
- Smooth navigation motion

Dibuat untuk menghasilkan pengalaman visual yang hidup, cinematic, dan interaktif seperti website-website creative studio kelas atas.
---
## 🧩 Features

### 🎨 Liquid Background (Three.js + GLSL Shader)
- Radial liquid effect dari tengah layar
- Distortion mengikuti posisi mouse
- Efek organic + noised shader
- Fullscreen reactive WebGL canvas

### 🔥 3D Page Transitions
- Halaman masuk dengan efek **zoom from camera**
- Depth motion via `rotateX`, perspective, blur
- Cinematic reveal ala "teleport in"
- Leave transition yang smooth & dramatik

### ✨ Interactive Navigation
- Setiap klik nav bisa dihubungkan dengan animasi logo/text flying (opsional)
- Transition terintegrasi otomatis via React Router
---
## 🛠 Tech Stack

| Tech | Function |
|------|----------|
| **React + Vite** | Base framework |
| **TypeScript** | Strict, error-free environment |
| **Three.js** | Liquid background shader & rendering |
| **GLSL Shader** | Custom noise-based liquid effect |
| **GSAP** | Motion engine for 3D animations |
| **React Router DOM** | Page navigation & transitions |
---
## 📦 Installation

```bash
npm install
