'use client';

import { useSearchParams } from 'next/navigation';
import { ChangeEvent, use, useEffect, useState } from 'react'
import QRCode from 'react-qr-code';

export default function Home() {
  const [input, setInput] = useState('')
  const param = useSearchParams()

  useEffect(() => {
    const text = param.get('text')
    if (text) {
      setInput(text)
    }
  }, [])

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const getURL = () => {
    return "https://hosikiti.github.io/qrip?text=" + input
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='text-center'>
        <h1 className='font-bold text-3xl mb-4'>qrip</h1>
        <textarea className='w-full text-black' placeholder='Enter text to share ...' rows={10} value={input} onChange={onInputChange}/>
        <span>{ input.length }</span>
        <div className='w-full bg-white p-4'>
          <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={getURL()}
          viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </main>
  )
}
