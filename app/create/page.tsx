"use client";
import { useUser} from '@clerk/nextjs';

import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';
import Header from '@/components/Header';
import { Plus } from 'lucide-react';
import Image from 'next/image';

const Page = () => {
    const {user} = useUser();
    const [templates, setTemplates] = useState([]);

    
  return (
    <div className='bg-[#05091a] h-screen '>
        <Header/>
        <motion.div className='mx-5 md:mx-28 my-10'
         initial={{ y: 50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className='flex-col flex gap-3 md:flex-row md:gap-0 justify-between items-center '>
            <h1 className='text-white text-4xl font-bold'>Hello <span className='text-primary-100'>{user?.fullName}</span> !</h1>
            <button className='bg-primary-200 hover:bg-primary-300 transition-all duration-300 text-white px-4 py-2 flex gap-2'><Plus/>Create new Email Template</button>
          </div>

          <div className='my-10'>
            <h1 className='text-white text-2xl font-semibold'>Workspaces</h1>
            {
              templates.length == 0 ? 
                <div className='flex flex-col justify-center items-center h-96'>
                  <Image src='/mail.svg' width={200} height={200} alt="create"/>
                  <h1 className='text-white text-2xl font-semibold my-5'>No templates </h1>
                </div> 
              : <></>
            }
          </div>

        </motion.div>
    </div>
  )
}

export default Page