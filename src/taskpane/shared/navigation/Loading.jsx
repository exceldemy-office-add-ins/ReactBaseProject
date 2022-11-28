import styled from "@emotion/styled";
import React from 'react'

const Div = styled.div`
height: 100vh;
background-color:white;
display: flex;
align-items: center;
justify-content: center;
`


export const Loading = () => {
  return (
    <React.Fragment>
        <Div>
            <img src="https://softeko.co/wp-content/uploads/2022/06/softeko-logo.png" alt="" />
        </Div>
    </React.Fragment>
  )
}
