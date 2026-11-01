import { useEffect, useState, useRef } from 'react';

console.log('1');

export default function Tracker() {
  const [names, setNames] = useState<string[]>([]);
  const [pastNames, setPastNames] = useState<{name: string, points: number}[]>([]);

  const input = useRef<HTMLInputElement>(null);

  const [darkMode, setDarkMode] = useState(new Date().getHours() > 18);

  const backgroundColor: object = {backgroundColor: darkMode? 'var(--dark-background)' : 'var(--light-background)'};
  const color: object = {color: `${darkMode? 'var(--dark-color)' : 'var(--light-color)'}`};
  const shadow: object = {textShadow: `0 1px 3px ${darkMode? 'var(--dark-text-shadow)' : 'var(--light-text-shadow)'}`, boxShadow: `${darkMode? 'var(--dark-box-shadow)' : 'var(--light-box-shadow)'}`};

  
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode]);

  useEffect(() => {
    input.current.addEventListener('animationend', () => {
      input.current.classList.remove('error');
    })
  }, [])

  function ToggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function AddName(event): void{
    event.preventDefault();

    const name = input.current.value;

    if (name && !(names.includes(name))){
      setNames([...names, name]);
      input.current.value = '';
      return;
    }
    else {
      input.current.classList.add('error');

    }
  }

  function Next(): void{
    setNames((currentNames) => currentNames.slice(1));

    const name = names[0].trim();
    
    let index = pastNames.findIndex((person) => person.name == name)
    
    if(index != -1){
      pastNames[index].points += 1
    }
    else{
      pastNames.push({ name: name, points: 1}) 
    }

    input.current.value = '';
    return;
  }
   if(pastNames.length > 1){
    pastNames.sort((a,b) => {
      return b.points - a.points
    });
   }
  return (
    <div className='organise'>
      <section>
        <ul className='ranking' style={color}>
        {
          pastNames.map((person, index) =>(
            <li key={index} style={shadow}>{person.name}: {person.points}</li>
          ))
        }
        </ul>
      </section>
      <div className='main' style={{ height: `${620 + names.length * 30}px`, ...backgroundColor, ...shadow}}>
        <h1 className='title' style={color}>
          Queue Tracker
        </h1>
        
        <div style={{position: 'absolute', top: '20px', right: '20px'}}>
              <input type="checkbox" id="dark-mode-toggle" onChange={ToggleDarkMode} />
              <label htmlFor="dark-mode-toggle" className="toggle"></label>
        </div>

        <form action="" onSubmit={AddName}>
          <input type="text" placeholder='Enter name...' ref={input} style={{ marginTop: names.length == 0 ? '7vh' : '', ...color, ...backgroundColor}}/>
        </form>

        <h1 id='FirstInQueue' style={{textShadow: `0 1px 3px ${darkMode? 'var(--dark-text-shadow)' : 'var(--light-text-shadow'}`}}>{names[0]}</h1>
        {
          names.length > 0 ? <button id='Next' onClick={Next}>Next</button> : null
        } 

        <ul style={color}>
        {
          names.map((name, index) => (
            index == 0 ? null : <li key={index}>{name}</li>
          ))
        }
        </ul>
      </div>
      <section></section> {/*This one's just for the flex to have 3 elements sa that main is on center */}
    </div>
  )
}