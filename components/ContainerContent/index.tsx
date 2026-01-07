import React from 'react'

const ContainerContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='main-content w-full flex justify-center min-h-[calc(100dvh-56px)]' id='main-content'>
      <section className='section-content  w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2' id='id-section-content'>
        {children}
      </section>
    </main>
  )
}

export default ContainerContent
