"use client";
import { useUser} from '@clerk/nextjs';

import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';

import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    const {user} = useUser();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const getAllTemplates = async()=>{
        try{
            setLoading(true);
            const res = await fetch(`/api/get-all-templates?email=${user?.emailAddresses[0].emailAddress}`);
            if(res.ok){
                const data = await res.json();
                setTemplates(data.templates);
            }
            setLoading(false);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        if(user){
            getAllTemplates();
        }
    }, [user])
    
  return (
    <div className='bg-[#05091a] h-screen '>
      
        <motion.div className='mx-5 md:mx-28 my-10'
         initial={{ y: 50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className='flex-col flex gap-3 md:flex-row md:gap-0 justify-between items-center '>
            <h1 className='text-white text-4xl font-bold'>Hello <span className='text-primary-100'>{user?.fullName}</span> !</h1>
            <Link href='/dashboard/create'>
            <button className='bg-primary-200 hover:bg-primary-300 transition-all duration-300 text-white px-4 py-2 flex gap-2'><Plus/>Create new Email Template</button>
            </Link>
          </div>

          <div className='my-10'>
            <h1 className='text-white text-2xl font-semibold'>Workspaces</h1>
            { loading ? 
                <div className='flex flex-col justify-center items-center h-96'>
                  <h1 className='text-white text-2xl font-semibold my-5'>Loading... </h1>
                </div> : 
              templates.length == 0 ? 
                <div className='flex flex-col justify-center items-center h-96'>
                  <Image src='/mail.svg' width={200} height={200} alt="create"/>
                  <h1 className='text-white text-2xl font-semibold my-5'>No templates </h1>
                </div> 
              : <div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                  {
                    templates.map((template: any, index: number)=>(
                      <Link href={`/editor/${template.tid}`} key={index}>
                      <div  className='bg-slate-800 rounded-md p-5 mt-10 cursor-pointer'>
                        <h1 className='text-white text-xl font-semibold'>{template.tid}</h1>
                        <p className='text-white text-sm'>{template.email}</p>
                      </div>
                      </Link>
                    ))
                  }
                </div>
              </div>
            }
          </div>

        </motion.div>
    </div>
  )
}

export default Page