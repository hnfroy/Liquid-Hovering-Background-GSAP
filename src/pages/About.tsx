
export default function About() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-2">
      <h1 className="font-bold text-4xl">About this demo</h1>
      <p>
        Demo shows a liquid background using a fragment shader.
        GSAP controls the strength of distortion when pointer enters/leaves.
      </p>
      <small>by: <a href="https://hnfroy.github.io/" className="text-pink-600">Hanif Royyan</a></small>
      
    </section>
  );
}
