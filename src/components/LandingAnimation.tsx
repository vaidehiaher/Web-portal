import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

interface LandingAnimationProps {
  onComplete: () => void
}

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  // Only a centered sign-in button is needed now

  const leftImages = [
    // 8-slide carousel (includes the provided image)
    'https://tse3.mm.bing.net/th/id/OIP.S7MLK8Hqbbvm-W9vphvAVQHaEo?rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://cumminscollege.edu.in/UserData/uploads/placed-students-2023-2024.jpeg',
    'https://cumminscollege.edu.in/UserData/uploads/slider/5.jpg',
    'https://cumminscollege.edu.in/UserData/uploads/album/diwali.jpg',
    'https://cumminscollege.edu.in/UserData/uploads/slider/8.jpg',
    'https://cumminscollege.edu.in/UserData/uploads/slider/3.jpg',
    'https://cumminscollege.edu.in/UserData/uploads/pages/144/img-6.jpeg',
    'https://cumminscollege.edu.in/UserData/uploads/slider/2.jpg'
  ]
  const rightImages = [
    // 8-slide carousel (includes the provided image)
    'https://tse3.mm.bing.net/th/id/OIP.S7MLK8Hqbbvm-W9vphvAVQHaEo?rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://cumminscollege.edu.in/UserData/uploads/slider/37/Image.jpg',
    'https://cumminscollege.edu.in/UserData/uploads/slider/36/Image.jpg',
    'https://cumminscollege.edu.in/UserData/uploads/slider/19/Image.jpg',
    'https://cumminscollege.edu.in/UserData/uploads/slider/43/Image.jpg',
    'https://cumminscollege.edu.in/UserData/uploads/pages/207/1.jpg',
    'https://www.bing.com/images/search?view=detailV2&ccid=twZDImqo&id=FA4EA57B4791DAEA2B10132A17F49373CF5850DB&thid=OIP.twZDImqoLBj4nw93knX4TgHaE5&mediaurl=https%3a%2f%2fcumminscollege.edu.in%2fapp_theme%2fimages%2fevent5.jpg&exph=2162&expw=3264&q=cummins+college+nagpur&FORM=IRPRST&ck=4F0C51CC39FEB73389430FFD3DF53378&selectedIndex=11&itb=0',
    'https://cumminscollege.edu.in/UserData/uploads/slider/5.jpg'
  ]
  const [leftIndex, setLeftIndex] = useState(0)
  const [rightIndex, setRightIndex] = useState(0)

  // no staged animations for title/subtitle anymore

  useEffect(() => {
    const a = setInterval(() => setLeftIndex(i => (i + 1) % leftImages.length), 3000)
    const b = setInterval(() => setRightIndex(i => (i + 1) % rightImages.length), 3000)
    return () => { clearInterval(a); clearInterval(b) }
  }, [leftImages.length, rightImages.length])

  const handleSignIn = () => {
    onComplete()
  }

  return (
    <div className="relative min-h-screen overflow-y-auto">
      {/* --- Spline Background (Particles) --- */}
      <iframe
        src="https://my.spline.design/particles-YbbzEPCC33RSA3vcv92K0aP8/"
        frameBorder="0"
        className="fixed top-0 left-0 w-full h-full z-0"
      ></iframe>

      {/* --- Dark Overlay for readability --- */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* --- Cummins College Logo (below Smart Search) --- */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40">
        <img
          src="https://cumminscollege.edu.in/UserData/logo-banner.png"
          alt="Cummins College"
          referrerPolicy="no-referrer"
          className="h-20 md:h-28 lg:h-32 object-contain"
        />
      </div>

      <div id="landing" className="relative z-20 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4 items-center px-4 py-8">
        <div className="order-2 md:order-1">
          <Carousel images={leftImages} index={leftIndex} setIndex={setLeftIndex} />
        </div>
        <div className="order-1 md:order-2 text-center">
          <Button onClick={handleSignIn} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="mr-2">Sign In</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="order-3">
          <Carousel images={rightImages} index={rightIndex} setIndex={setRightIndex} />
        </div>
      </div>

      {/* --- About Us Section (scrollable content below hero) --- */}
      <section className="relative z-20 w-full px-4 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center bg-white/80 dark:bg-gray-800/70 backdrop-blur border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-lg p-4 md:p-6">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-3">About Us</h3>
            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
              Maharshi Karve Stree Shikshan Samstha’s Cummins College of Engineering for Women, Nagpur is the leading engineering institutes in central India. The institute aims at delivering quality education through innovative practices and quality placements through Industry Interaction and support. It is spread over 22 acres in the lush green environment near the bank of river Vena at Hingna in Nagpur district. It is affiliated to RTM Nagpur University, Approved by AICTE and NAAC accredited with A+ Grade. The institute was established in the year 2010 with the generous financial grant from Cummins India Limited. It has made remarkable progress in the past decade and still going strong with the new achievements in Academics and Placements. It offers engineering education in Computer Engineering, Electronics & Telecommunication Engineering and Mechanical Engineering. It has a well-developed infrastructure which includes classroom equipped with ICT tools, advanced laboratories, a central library with huge collection of books and journals, indoor and outdoor playgrounds, green initiatives and many more. The institute also offers in-campus hostel facility with mess and gym for the outstations candidates. It has well qualified and experience staff, dedicated Training & Placement cells and other important cells and clubs for better university results, industry interactions and placements. The institute is keenly interested in bringing the all-round development of its students and hence provides all the necessary and advanced facilities to its students. The clean, serene and pollution free environment here makes learning enjoyable and also has positive effects on students’ physical and mental health.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://cumminscollege.edu.in/app_theme/images/cummins-building.jpg"
              alt="Cummins College campus building"
              referrerPolicy="no-referrer"
              className="w-full h-56 md:h-72 lg:h-80 object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border bg-white/70 dark:bg-gray-800/70">
            <h4 className="font-semibold mb-1">Placements Highlights</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Strong recruiter network and solid outcomes for graduates.</p>
          </div>
          <div className="p-4 rounded-xl border bg-white/70 dark:bg-gray-800/70">
            <h4 className="font-semibold mb-1">Programs Offered</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Computer, E&TC, and Mechanical Engineering.</p>
          </div>
          <div className="p-4 rounded-xl border bg-white/70 dark:bg-gray-800/70">
            <h4 className="font-semibold mb-1">Campus Facilities</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Modern labs, library, sports, hostels, and green initiatives.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Carousel({ images, index, setIndex }: { images: string[]; index: number; setIndex: (n: number) => void }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-white/70 dark:bg-gray-800/60 backdrop-blur">
      <div className="relative aspect-[16/9]">
        <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((src, i) => (
            <div key={i} className="min-w-full h-full">
              <img src={src} alt={`slide-${i}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 py-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          />
        ))}
      </div>
    </div>
  )
}
