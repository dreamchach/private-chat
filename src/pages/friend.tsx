import Header from "@/components/Header"
import Nav from "@/components/Nav"
import Main from "@/components/friend/Main"

const Start = () => {
  return (
    <>
      <Nav />
      <div>
        <Header title="친구" />
        <Main />        
      </div>
    </>
  )
}

export default Start