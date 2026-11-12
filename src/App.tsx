import { useState, useEffect, type ReactElement } from 'react';
import QnA from './Q&A.tsx';
import MainMenu from './MainMenu.tsx';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const style: any = {
    backgroundColor: {backgroundColor: `${darkMode? 'var(--dark-background)' : 'var(--light-background)'}`},
    color: {color: `${darkMode? 'var(--dark-color)' : 'var(--light-color)'}`},
    shadow: {
      textShadow: `0 1px 3px ${darkMode? 'var(--dark-text-shadow)' : 'var(--light-text-shadow)'}`, 
      boxShadow: `${darkMode? 'var(--dark-box-shadow)' : 'var(--light-box-shadow)'}`
    },
  }
  const choices = new Map([
    ['MainMenu', <MainMenu style={style} func={func}/>],
    ['QnA', <QnA style={style} ListOfQuestions={{}} />]
  ])

  function func(value: string){
    setChoice(choices.get(value));
    
  }
  const [choice, setChoice] = useState<ReactElement>(<MainMenu style={style} func={func}/>);
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode]);

  function ToggleDarkMode(){
    setDarkMode(!darkMode);
  }
  return(
    <>
      <div className='organise' style={style}>
        <section></section>

        <div className='main' style={{...style.backgroundColor}}>
          {
            choice
          }
          <div style={{position: 'absolute', top: '20px', right: '20px'}}>
              <input type="checkbox" id="dark-mode-toggle" onChange={ToggleDarkMode} />
              <label htmlFor="dark-mode-toggle" className="toggle"></label>
          </div>
        </div>
        
        <section></section>
      </div>
    </>
  )
}

export default App