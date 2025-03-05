import Image from 'next/image'

export default function HomePage() {
  return (
    <div>
      <main className="bg-gsp-black flex flex-col items-center justify-center h-screen">
        <video
          src="/videos/home-page-clip.mp4"
          muted
          loop
          autoPlay
          className=" h-screen md:w-screen object-cover object-left md:object-center overflow-hidden z-10 opacity-0 animate-fade-in pointer-events-none"
        ></video>
        <Image
          className="fixed z-10 w-[500px] mix-blend-color-dodge mb-12 opacity-100"
          src="/images/home-title-white.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        ></Image>
        <Image
          className="fixed z-10 w-[500px] mix-blend-color-dodge mb-[48px] md:mb-[52px] mr-1 opacity-20 animate-flicker"
          src="/images/home-title-green.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        ></Image>
        <Image
          className="fixed z-10 w-[500px] mix-blend-color-dodge mb-11 md:mb-10 ml-1 opacity-50 animate-flicker hover:scale-105"
          src="/images/home-title-gold.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        ></Image>
      </main>
    </div>
  )
}
