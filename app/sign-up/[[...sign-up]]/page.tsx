import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
  <main className='bg-[#05091a] h-screen flex flex-row justify-center items-center'>  
    <SignUp />
  </main>
  )
}