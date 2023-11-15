import Header from "@/components/Header";
import Main from "@/components/index/Main";
import { useSelector } from "react-redux";

export default function Home() {
  return (
    <>
      <Header title='채팅방' />
      <Main />
    </>
  )
}
