import { loginWithSpotifyClick } from "@/utils/Spotify/Spotify"

// Index page component for first / unauthenticated visit
export default function Landing() {
    return (
        <main className='w-full min-h-screen bg-primary'>
        <div className='flex items-center flex-col justify-center w-full h-screen'>
          <p className='font-bold text-xl'>Welcome To Explore</p>
          <button className='bg-slate-400' onClick = {loginWithSpotifyClick}>Get Started</button>
        </div>
      </main>
    )
}