import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <main className="bg-black flex flex-col items-center justify-center h-screen font-gspFont">
        {/* Your existing title graphics */}
        <Image
          className="animate-fade-in fixed pointer-events-none z-10 w-[500px] mix-blend-color-dodge mb-12 opacity-100"
          src="/images/home-title-white.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        />
        <Image
          className="fixed pointer-events-none z-10 w-[500px] mix-blend-color-dodge mb-[48px] md:mb-[52px] mr-1 opacity-20 animate-flicker"
          src="/images/home-title-green.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        />
        <Image
          className="fixed pointer-events-none z-10 w-[500px] mix-blend-color-dodge mb-12 mr- opacity-50 animate-flicker-slow scale-105"
          src="/images/home-title-gold.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        />
        <div className="h-screen md:w-screen animate-fade-in">
          <video
            src="/videos/home-page-clip.mp4"
            muted
            loop
            autoPlay
            className=" h-screen md:w-screen object-cover object-left md:object-center overflow-hidden z-0 opacity-0 animate-fade-in pointer-events-none"
          ></video>
        </div>
        {/* Grid Navigation */}
        <div className="fixed z-30 w-full h-screen flex flex-col items-center justify-center opacity-0 animate-fade-in duration-100">
          <div className="grid grid-cols-3 grid-rows-3 w-screen h-4/5 px-4">
            <div className="relative w-full h-full flex items-center justify-center">
              <Link
                className="text-3xl md:text-6xl font-extrabold p-2 bg-gsp-black rounded-full border-gsp-green/50 text-gsp-black  -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center hover:scale-110 active:scale-x-150 scale-110 hover:border-gsp-white duration-300 hover:no-underline animate-flicker absolute ml-1 mt-1"
                href="/shows"
              >
                <span>shows</span>
              </Link>
              <Link
                className="text-3xl md:text-6xl font-extrabold p-2 bg-gsp-black  text-gsp-white -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center scale-105 hover:scale-110 active:scale-x-150 hover:border-gsp-gold duration-300 hover:no-underline animate-flicker-slowest border-x-4 md:border-x-8 border-y-4 border-gsp-green shadow-xl rounded-full absolute hover:animate-none"
                href="/shows"
              >
                <span>shows</span>
              </Link>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {/* empty grid item */}
            </div>
            <div className="relative w-full h-full flex items-center justify-center pb-16">
              <Link
                className="text-2xl md:text-6xl font-extrabold p-2 bg-gsp-black rounded-full border-gsp-green/50 text-gsp-black  -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center hover:scale-110 active:scale-x-150 scale-110 hover:border-gsp-white duration-300 hover:no-underline animate-flicker absolute ml-1 mt-1"
                href="/projects"
              >
                <span>projects</span>
              </Link>
              <Link
                className="text-2xl md:text-6xl font-extrabold p-2 bg-gsp-black  text-gsp-white -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center scale-105 hover:scale-110 active:scale-x-150 hover:border-gsp-gold duration-300 hover:no-underline animate-flicker-slow border-x-4 md:border-x-8 border-y-4 border-gsp-green shadow-xl rounded-full absolute hover:animate-none"
                href="/projects"
              >
                <span>projects</span>
              </Link>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {/* empty grid item */}
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {/* empty grid item */}
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {/* empty grid item */}
            </div>
            <div className="relative w-full h-full flex items-center justify-center pt-16">
              <Link
                className="text-3xl md:text-6xl font-extrabold p-2 bg-gsp-black rounded-full border-gsp-green/50 text-gsp-black  -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center hover:scale-110 active:scale-x-150 scale-110 hover:border-gsp-white duration-300 hover:no-underline animate-flicker-slow absolute ml-1 mt-1"
                href="/collabs"
              >
                <span>collabs</span>
              </Link>
              <Link
                className="text-3xl md:text-6xl font-extrabold p-2 bg-gsp-black  text-gsp-white -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center scale-105 hover:scale-110 active:scale-x-150 hover:border-gsp-gold duration-300 hover:no-underline animate-flicker-slowest border-x-4 md:border-x-8 border-y-4 border-gsp-green shadow-xl rounded-full absolute hover:animate-none"
                href="/collabs"
              >
                <span>collabs</span>
              </Link>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {/* empty grid item */}
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Link
                className="text-2xl md:text-6xl font-extrabold p-2 bg-gsp-black rounded-full border-gsp-green/50 text-gsp-black  -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center hover:scale-110 active:scale-x-150 scale-110 hover:border-gsp-white duration-300 hover:no-underline animate-flicker absolute ml-1 mt-1"
                href="/team"
              >
                <span className="text-center leading-6 md:leading-9">
                  meet the freaks
                </span>
              </Link>
              <Link
                className="text-2xl md:text-6xl font-extrabold p-2 bg-gsp-black  text-gsp-white -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center scale-105 hover:scale-110 active:scale-x-150 hover:border-gsp-gold duration-300 hover:no-underline animate-flicker-slowest border-x-4 md:border-x-8 border-y-4 border-gsp-green shadow-xl rounded-full absolute hover:animate-none"
                href="/team"
              >
                {/*    className="text-xl md:text-4xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white/50 border-dotted text-gsp-white rounded-full -skew-x-12 w-14 h-16 md:w-32 md:h-28 flex items-center justify-center hover:scale-110 active:scale-x-150 hover:border-gsp-gold duration-300 hover:no-underline"
                href="/team"
              > */}
                <span className="text-center leading-6 md:leading-9">
                  meet the freaks
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
