'use client';
import Header from '@/components/Header';
import Orb from '@/components/Orb';
import { BackgroundLines } from '@/components/ui/background-lines';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';


import { motion } from 'framer-motion';



export default function Home() {


  const words = [
    {
      text: 'Create',
      'className': 'text-white'
    },

    {
      text: 'AI Powered',
      className : 'bg-gradient-to-r from-primary-100 to-violet-600 bg-clip-text text-transparent'
    },
    {
      text: 'Email Templates',
      className: 'text-white'
    },
    {
      text: 'and Html Pages',
      className: 'text-white'
    }
  ]
  return (
    <>
      <BackgroundLines className="bg-[#05091a] min-h-screen px-4 py-6 ">
        <Header />
     
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex justify-center items-center mt-10"
        >
        
            <TypewriterEffectSmooth words={words}  />
   
        </motion.div>
        <motion.div style={{ width: '100%', height: '60vh', position: 'relative' }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-row justify-between items-center p-4 "
        >
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </motion.div>
      </BackgroundLines>
    </>
  );
}
