import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <main className="bg-black flex flex-col items-center justify-center h-screen font-gspFont">
        {/* Your existing title graphics */}

        <div className="h-screen md:w-screen ">
          <video
            src="/videos/home-page-clip.mp4"
            muted
            loop
            autoPlay
            className=" h-screen md:w-screen object-cover object-left md:object-center overflow-hidden z-0 opacity-0 pointer-events-none"
          ></video>
        </div>
      </main>
    </div>
  )
}
