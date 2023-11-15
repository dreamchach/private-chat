import React from 'react'

const Header = ({title} : {title : string}) => {
  return (
    <header>
    <h5>{title}</h5>
  </header>
  )
}

export default Header