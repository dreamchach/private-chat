import { onclick, pressEnter, random } from "@/utill/functions/functions";
import { useRouter } from "next/router";
import Avatar from 'boring-avatars';
import { useDispatch, useSelector } from "react-redux";
import { randomAvatar, randomColor } from "@/utill/redux/authSlice";
import { useState } from "react";

const Main = () => {
    const router = useRouter()
    const auth = useSelector((state : any) => {
      return state.auth
    })
    const [name, setName] = useState(auth.nickName)
    const dispatch = useDispatch()
  
  return (
    <section>
    <input 
      value={name} 
      onChange={(event) => setName(event?.target.value)} 
      placeholder="사용할 닉네임을 적어주세요"
      onKeyUp={(event) => pressEnter(event.key, name, router, dispatch)}
    />
    <div>
        <Avatar
            size={40}
            name={auth.avatar}
            variant='beam'
            colors={auth.color}
        />
        <button onClick={async () => {
        dispatch(randomColor())
        dispatch(randomAvatar())
      }}>Random</button>
    </div>
    <button onClick={() => onclick(name, router, dispatch)}>입장</button>
  </section>
  )

}

export default Main