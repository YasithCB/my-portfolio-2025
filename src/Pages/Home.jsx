import React, { useState, useEffect, useCallback, memo } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import '../assets/css/home.css'
import 'aos/dist/aos.css'

// Memoized Components
const MainTitle = memo(() => (
    <div className="main-title space-y-2 mb-4" data-aos="fade-up" data-aos-delay="600">
      <h1 className="text-2xl text-white sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Fullstack Developer &
        </span>
      </span>
        <br/>
        <span className="relative inline-block mt-2">
          <span className="absolute -inset-2 bg-gradient-to-r from-blue-800 via-teal-500 to-purple-600 blur-2xl opacity-30"></span>
          <span className="relative bg-gradient-to-r from-blue-800 via-teal-600 to-purple-600 bg-clip-text text-transparent">
            Graphic Designer
          </span>
        </span>
      </h1>
    </div>
));



// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 30;
const PAUSE_DURATION = 2000;
const WORDS = ["5Year+ Experience in Graphic Designing", "2Year+ Experience in Software"];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,

      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/e060747a-0875-4ac2-8e6c-c3a99d23e949/H0UdnZHmMU.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] cursor-pointer" 
        : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`
  };

  return (
      <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
        <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="container mx-auto px-[5%] mt-[10%] md:mt-[0%] sm:px-6 lg:px-[0%] min-h-screen">

            <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">

              {/* left column - texts */}
              <div className="text-white text-center max-w-xl">
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 my-2 md:my-0 flex items-center justify-center mb-2" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl text-white md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                <div className={'home-desc'}>
                  <h1 className="mb-4"
                      data-aos="fade-up"
                      data-aos-delay="1000">
                    Crafting intuitive,<br/>responsive solutions
                  </h1>
                  <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light"
                     data-aos="fade-up"
                     data-aos-delay="1000">
                    Blending extensive experience in web development and graphic design to deliver
                    innovative, creative solutions that enhance user experiences and bring visionary ideas to life with
                    precision and style.
                  </p>
                </div>
              </div>

              {/* Right Column - Optimized Lottie Animation */}
              <div className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
                   onMouseEnter={() => setIsHovering(true)}
                   onMouseLeave={() => setIsHovering(false)}
                   data-aos="fade-left"
                   data-aos-delay="50">
                <div className="relative w-full">
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                      isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}>
                  </div>

                  <div className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${
                      isHovering ? "scale-101" : "scale-100"
                  }`}>
                    <DotLottieReact {...lottieOptions} />
                  </div>

                  <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                      isHovering ? "opacity-50" : "opacity-20"
                  }`}>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                        isHovering ? "scale-110" : "scale-100"
                    }`}>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
  );
};

export default memo(Home);