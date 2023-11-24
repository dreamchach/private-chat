import RandomAvatar from '@/components/index/RandomAvatar'
import { onRandom } from '@/utill/functions/function'
import { onclick, pressEnter } from '@/utill/functions/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Index = () => {
  const router = useRouter()
  const auth = useSelector((state : any) => {
    return state.auth
  })
  const [name, setName] = useState(auth.nickName)
  const dispatch = useDispatch()

  useEffect(() => {
    if(auth.userId !== '') {
      router.push('/friends')
    }else {
      onRandom(dispatch)
    }
  }, [])

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-basic-green gap-y-5">
      <RandomAvatar auth={auth} dispatch={dispatch} />
      <input 
        value={name} 
        onChange={(event) => setName(event?.target.value)} 
        placeholder="사용할 닉네임을 적어주세요"
        onKeyUp={(event) => pressEnter(event.key, name, router, dispatch)}
        className="box-border mx-14 my-0 w-300 py-2.5 px-5 rounded-xl outline-0 min-w-300"
      />
      <button 
        onClick={() => onclick(name, router, dispatch)}
        disabled={name === '' ? true : false}
        className={`${name === '' ? 'bg-none-button text-none-text' : 'bg-white hover:bg-hover-green hover:border-white hover:shadow-xl hover:text-white'} box-border mx-14 my-0 w-300 py-2.5 px-5 rounded-xl border-2 shadow border-black min-w-300`}
      >
        입장
      </button>
  </section>
  )
}

export default Index