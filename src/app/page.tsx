import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <main className="bg-black flex flex-col items-center justify-center h-screen font-gspFont">
        {/* Your existing title graphics */}
        <Image
          className="fixed pointer-events-none z-10 w-[500px] mix-blend-color-dodge mb-12 opacity-100"
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
          className="fixed pointer-events-none z-10 w-[500px] mix-blend-color-dodge mb-12 mr- opacity-50 animate-flicker scale-105"
          src="/images/home-title-gold.png"
          width={500}
          height={500}
          alt="Golden Scissor Puppets"
        />

        {/* Grid Navigation */}
        <div className="fixed z-30 w-full h-screen flex flex-col items-center justify-center opacity-0 animate-fade-in duration-100">
          <div className="grid grid-cols-3 grid-rows-3 w-screen lg:w-2/3 h-full md:h-4/5 px-4">
            <div className="relative w-full h-full flex items-center justify-center">
              <Link
                className="text-4xl md:text-6xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white border-dotted text-gsp-white rounded-full -skew-x-12 w-16 h-16 md:w-28 md:h-24 flex items-center justify-center hover:scale-110 active:scale-[60] transition-all hover:border-gsp-gold duration-300 hover:no-underline"
                href="/shows"
              >
                <span>shows</span>
              </Link>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {/* empty grid item */}
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Link
                className="text-3xl md:text-5xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white border-dotted text-gsp-white rounded-full skew-x-12 w-16 h-16 md:w-28 md:h-24 flex items-center justify-center hover:scale-110 active:scale-[60] transition-all hover:border-gsp-gold duration-300 hover:no-underline"
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
            <div className="relative w-full h-full flex items-center justify-center">
              <Link
                className="text-4xl md:text-6xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white border-dotted text-gsp-white rounded-full skew-x-12 w-16 h-16 md:w-28 md:h-24 flex items-center justify-center hover:scale-110 active:scale-[60] transition-all hover:border-gsp-gold duration-300 hover:no-underline"
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
                className="text-4xl md:text-6xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white border-dotted text-gsp-white rounded-full -skew-x-12 w-16 h-16 md:w-28 md:h-24 flex items-center justify-center hover:scale-110 active:scale-[60] transition-all hover:border-gsp-gold duration-300 hover:no-underline"
                href="/team"
              >
                <span>freaks</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
