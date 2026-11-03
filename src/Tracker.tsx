import { useEffect, useState, useRef } from 'react';


export default function Tracker() {
  const input = useRef<HTMLInputElement>(null);
  const right_answer = useRef<HTMLHeadingElement>(null);

  const [points, setPoints] = useState<number>(0);
  const [Questions, setQuestions] = useState<Map>(new Map([
    ["telefonia trzeciej generacji", "3G"],
    ["przepustowość łącza", "bandwidth"],
    ["kod kreskowy", "barcode"],
    ["skaner biometryczny", "biometric scanner"],
    ["łącze szerokopasmowe", "broadband"],
    ["obliczać", "compute"],
    ["soczewka kontaktowa", "contact lens"],
    ["konwergencja / zbieżność", "convergence"],
    ["konwertować", "convert"],
    ["system cyberfizyczny", "cyber-physical system"],
    ["przetwarzanie danych", "data processing"],
    ["urządzenie", "device"],
    ["technologia dystrybucji", "distribution technology"],
    ["handel elektroniczny", "e-commerce"],
    ["elektronika", "electronics"],
    ["objąć", "encompass"],
    ["podmiot", "entity"],
    ["sprzęt komputerowy", "hardware"],
    ["interfejs człowiek–maszyna", "human-machine interface"],
    ["implementować", "implement"],
    ["implementacja", "implementation"],
    ["technologia informacyjno-komunikacyjna", "information and communication technology"],
    ["specjalista IT", "IT specialist"],
    ["dział IT", "IT department"],
    ["przetwarzać / manipulować", "manipulate"],
    ["udział w rynku", "market share"],
    ["mikrosystemy", "microsystems"],
    ["mnogość", "multiplicity"],
    ["budowanie sieci kontaktów", "networking"],
    ["przeniesienie biznesu za granicę", "off-shoring"],
    ["platforma", "platform"],
    ["przetwarzać", "process"],
    ["chronić", "protect"],
    ["identyfikacja za pomocą fal radiowych", "radio-frequency identification"],
    ["odzyskiwać", "retrieve"],
    ["półprzewodnik", "semiconductor"],
    ["oprogramowanie", "software"],
    ["model dostarczania oprogramowania", "Software as a Service"],
    ["przechowywać", "store"],
    ["nadzór", "surveillance"],
    ["sprzęt telekomunikacyjny", "telecom equipment"],
    ["sieć naziemna", "terrestrial network"],
    ["przekazywać / transmitować", "transmit"],
  ]));

  let question: string = Array.from(Questions)[Math.floor(Math.random() * Questions.size)][0]

  const [darkMode, setDarkMode] = useState(new Date().getHours() > 18);
  const backgroundColor: object = {backgroundColor: darkMode? 'var(--dark-background)' : 'var(--light-background)'};
  const color: object = {color: `${darkMode? 'var(--dark-color)' : 'var(--light-color)'}`};
  const shadow: object = {textShadow: `0 1px 3px ${darkMode? 'var(--dark-text-shadow)' : 'var(--light-text-shadow)'}`, boxShadow: `${darkMode? 'var(--dark-box-shadow)' : 'var(--light-box-shadow)'}`};
  
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode]);

  useEffect(() => {
    document.querySelector("h1.points")?.addEventListener('animationend', () => {
      document.querySelector("h1.points")?.classList.remove('right')
    });
  }, [])

  function ToggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function check(event){
    event.preventDefault();

    const answer = event.target[0].value
    let ans1 = undefined;
    let ans2 = undefined;
    const current_right_answer = Questions.get(question)

    if(current_right_answer.search(',') != -1){
      const both_answers = current_right_answer.trim().split(',');
      ans1 = both_answers[0].trim();
      ans2 = both_answers[1].trim();
    } 
    else {
      ans1 = current_right_answer.trim();
    }
    if(ans1 == answer || ans2 == answer){
      right_answer.current.classList.remove('wrong');
      right_answer.current.textContent = '';

      document.querySelector("h1.points")?.classList.add('right');
      
      setPoints(points + 1); 

      Questions.delete(question);
    }

    else {
      right_answer.current.textContent = Questions.get(question);
      right_answer.current.classList.add('wrong');

      right_answer.current.addEventListener('animationend', () => {
        right_answer.current.classList.remove('wrong');
        right_answer.current.textContent = '';
      }, {once: true})

      setPoints(points - 1);
    }

    input.current.value = '';
  }  

  if(Questions.size === 0){
    return(
      <div className='organise'>
        <h1 className='win'>YOU WON !</h1>
        <p>Your points: {points}</p>
      </div>
    )
  }
  else {
    return (
      <div className='organise'>
        <section></section>
        <div className='main' style={{ height: 620, ...backgroundColor, ...shadow}}>
          <h1 className='title' style={{...color, fontSize: `${70 - question.length}px`}}>
            {
              question
            }
          </h1>
          
          <form action="" onSubmit={check}>
            <input type="text" ref={input} style={{...color, ...backgroundColor}}/>
          </form>

          <div style={{position: 'absolute', top: '20px', right: '20px'}}>
                <input type="checkbox" id="dark-mode-toggle" onChange={ToggleDarkMode} />
                <label htmlFor="dark-mode-toggle" className="toggle"></label>
          </div>
          <h1 ref={right_answer} style={{fontSize: `${30}px`}}>
            
          </h1>

          <h1 className='points' style={color}>
            Points: {points} <br />
          </h1>
        </div>
        <section></section>
      </div>
    )
  }
}