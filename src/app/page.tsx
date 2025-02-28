import Image from 'next/image'

export default function HomePage() {
  // const n = Math.floor(Math.random() * 3)

  // const images = ['/gold-1.png', '/white-1.png', '/green-1.png']
  return (
    <div>
      <main className="bg-gsp-black flex flex-col items-center justify-center h-screen">
        <video
          src="/home-page-clip.mp4"
          muted
          loop
          autoPlay
          className=" h-screen md:w-screen object-cover object-left md:object-center overflow-hidden z-10 opacity-0 animate-fade-in"
        ></video>
        <Image
          className="fixed z-10 w-[500px] mix-blend-color-dodge mb-12 opacity-100"
          // src={images[n]}
          src="/white-1.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        ></Image>
        <Image
          className="fixed z-10 w-[500px] mix-blend-color-dodge mb-[48px] md:mb-[52px] mr-1 opacity-20 animate-flicker"
          // src={images[n]}
          src="/green-1.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        ></Image>
        <Image
          className="fixed z-10 w-[500px] mix-blend-color-dodge mb-11 md:mb-10 ml-1 opacity-50 animate-flicker"
          // src={images[n]}
          src="/gold-1.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        ></Image>
      </main>
    </div>
  )
}
