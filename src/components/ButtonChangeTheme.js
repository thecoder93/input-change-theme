import React from 'react'
import { useState } from 'react'
import App from '../App'
import { ThemeProvider, createGlobalStyle} from 'styled-components'


const GlobalStyle = createGlobalStyle`
body {
  background-color: ${props => 
      props.theme.mode === 'dark' ? '#111' : '#EEE'};
  color: ${props => 
      props.theme.mode === 'dark' ? '#EEE' : '#111'};
  }`;

const ButtonChangeTheme = () => {

    const [theme, setTheme] = useState({ mode: 'light'});

    const changeTheme = () => {
        setTheme(theme.mode === 'light' ? {mode: 'dark'} : {mode: 'light'});
        <App theme={theme} />
    }

    return (
        <>
        <ThemeProvider theme={theme} >
            <GlobalStyle/>
            <div className='container w-75 py-4 d-flex offset-3 col-6'> 
                <h3>Awesome! Now change Theme</h3>
                <button className='btn btn-warning offset-3' onClick={changeTheme}>Change Theme</button>
            </div>
        </ThemeProvider>
    </>
    )
}

export default ButtonChangeTheme
