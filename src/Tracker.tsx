import { useEffect, useState, useRef } from 'react';


export default function Tracker() {
  const input = useRef<HTMLInputElement>(null);
  const right_answer = useRef<HTMLHeadingElement>(null);

  const [points, setPoints] = useState<number>(0);
  const [Questions, setQuestions] = useState<Map>(new Map([
    ["poddasze", "das Dachgeschoss"],
    ["zasięg", "der Empfang"],
    ["domek ogrodowy", "das Gartenhaus"],
    ["łącze internetowe", "der Internetanschluss"],
    ["piwnica", "der Keller"],
    ["meble kuchenne", "die Küchenmöbel"],
    ["meble", "die Möbel"],
    ["wymarzone mieszkanie", "die Traumwohnung"],
    ["urządzać", "einrichten"],
    ["należeć", "gehören"],
    ["malować (ściany)", "streichen"],
    ["przekonywać", "überzeugen"],
    ["przebudowywać", "umbauen"],
    ["przeprowadzać się (ziehen)", "ziehen"],
    ["ciemny", "dunkel"],
    ["własny", "eigen"],
    ["brakujący", "fehlend"],
    ["wilgotny", "feucht"],
    ["przytulny", "gemütlich"],
    ["jasny", "hell"],
    ["niezwykły, nietypowy", "ungewöhnlich"],
    ["urządzać pokój", "das Zimmer einrichten"],
    ["wprowadzać się do piwnicy", "in den Keller ziehen"],
    ["powiedzieć tak, zgadzać się", "Ja sagen"],
    ["pomalować wszystko na biało", "alles in Weiß streichen"],
    ["nie mieć zasięgu", "keinen Empfang haben"],
    ["podłoga", "der Fußboden"],
    ["okno", "das Fenster"],
    ["szuflada", "die Schublade"],
    ["dywan", "der Teppich"],
    ["drzwi", "die Tür"],
    ["ściana", "die Wand"],
    ["zdejmować (ze ściany)", "abhängen"],
    ["zmieniać", "ändern"],
    ["wisieć / wieszać", "hängen"],
    ["leżeć", "liegen"],
    ["kłaść", "legen"],
    ["wkładać", "stecken"],
    ["stać", "stehen"],
    ["stawiać", "stellen"],
    ["przemeblowywać", "umräumen"],
    ["przestawiać", "umstellen"],
    ["za (przyimek)", "hinter"],
    ["obok (przyimek)", "neben"],
    ["nad (przyimek)", "über"],
    ["pod (przyimek)", "unter"],
    ["(po)między (przyimek)", "zwischen"],
    ["przemeblowywać pokój", "das Zimmer umräumen"],
    ["zmieniać wszystko", "alles ändern"],
    ["Wszystko wygląda jak nowe.", "Alles sieht neu aus."],
    ["meblować pokój", "das Zimmer möblieren"],
    ["Liczba mnoga — poddasza", "die Dachgeschosse"],
    ["Liczba mnoga — domki ogrodowe", "die Gartenhäuser"],
    ["Liczba mnoga — łącza internetowe", "die Internetanschlüsse"],
    ["Liczba mnoga — piwnice", "die Keller"],
    ["Liczba mnoga — wymarzone mieszkania", "die Traumwohnungen"],
    ["Liczba mnoga — podłogi", "die Fußböden"],
    ["Liczba mnoga — okna", "die Fenster"],
    ["Liczba mnoga — szuflady", "die Schubladen"],
    ["Liczba mnoga — dywany", "die Teppiche"],
    ["Liczba mnoga — drzwi", "die Türen"],
    ["Liczba mnoga — ściany", "die Wände"],
    ["Wo? (Gdzie?) — jaki przypadek?", "Dativ"],
    ["Wohin? (Dokąd?) — jaki przypadek?", "Akkusativ"],
    ["Skrót od „an dem”", "am"],
    ["Skrót od „in dem”", "im"],
    ["Skrót od „in das”", "ins"],
    ["Gdzie? — przy stole", "am Tisch"],
    ["Gdzie? — na podłodze", "auf dem Fußboden"],
    ["Gdzie? — za fotelem", "hinter dem Sessel"],
    ["Gdzie? — w ogrodzie", "im Garten"],
    ["Gdzie? — obok szafy", "neben dem Schrank"],
    ["Gdzie? — nad fotelem", "über dem Sessel"],
    ["Gdzie? — pod dywanem", "unter dem Teppich"],
    ["Gdzie? — przed lustrem", "vor dem Spiegel"],
    ["Gdzie? — między biurkiem a stołem", "zwischen dem Schreibtisch und dem Tisch"],
    ["Gdzie? — na ścianie", "an der Wand"],
    ["Gdzie? — na komodzie", "auf der Kommode"],
    ["Gdzie? — za drzwiami", "hinter der Tür"],
    ["Gdzie? — w szufladzie", "in der Schublade"],
    ["Gdzie? — obok drzwi", "neben der Tür"],
    ["Gdzie? — nad komodą", "über der Kommode"],
    ["Gdzie? — pod ławką", "unter der Bank"],
    ["Gdzie? — przed drzwiami", "vor der Tür"],
    ["Gdzie? — między komodą a lampą", "zwischen der Kommode und der Lampe"],
    ["Gdzie? — przy oknie", "am Fenster"],
    ["Gdzie? — na łóżku", "auf dem Bett"],
    ["Gdzie? — za regałem", "hinter dem Regal"],
    ["Gdzie? — w pokoju", "im Zimmer"],
    ["Gdzie? — obok domu", "neben dem Haus"],
    ["Gdzie? — nad oknem", "über dem Fenster"],
    ["Gdzie? — pod obrazem", "unter dem Bild"],
    ["Gdzie? — przed kanapą", "vor dem Sofa"],
    ["Gdzie? — między łóżkiem a oknem", "zwischen dem Bett und dem Fenster"],
    ["Gdzie? — przy ścianach", "an den Wänden"],
    ["Gdzie? — w pokojach", "in den Zimmern"],
    ["Gdzie? — nad stołami", "über den Tischen"],
    ["Gdzie? — między łóżkami", "zwischen den Betten"],
    ["Dokąd? — do stołu", "an den Tisch"],
    ["Dokąd? — na podłogę", "auf den Boden"],
    ["Dokąd? — za fotel", "hinter den Sessel"],
    ["Dokąd? — do ogrodu", "in den Garten"],
    ["Dokąd? — obok szafy", "neben den Schrank"],
    ["Dokąd? — nad fotel", "über den Sessel"],
    ["Dokąd? — pod dywan", "unter den Teppich"],
    ["Dokąd? — przed lustro", "vor den Spiegel"],
    ["Dokąd? — między biurko a krzesło", "zwischen den Schreibtisch und den Stuhl"],
    ["Dokąd? — na ścianę", "an die Wand"],
    ["Dokąd? — na komodę", "auf die Kommode"],
    ["Dokąd? — za drzwi", "hinter die Tür"],
    ["Dokąd? — do szuflady", "in die Schublade"],
    ["Dokąd? — obok drzwi", "neben die Tür"],
    ["Dokąd? — nad komodę", "über die Kommode"],
    ["Dokąd? — pod ławkę", "unter die Bank"],
    ["Dokąd? — przed drzwi", "vor die Tür"],
    ["Dokąd? — między ścianę a drzwi", "zwischen die Wand und die Tür"],
    ["Dokąd? — do okna", "an das Fenster"],
    ["Dokąd? — na łóżko", "auf das Bett"],
    ["Dokąd? — za regał", "hinter das Regal"],
    ["Dokąd? — do pokoju", "ins Zimmer"],
    ["Dokąd? — obok domu", "neben das Haus"],
    ["Dokąd? — nad okno", "über das Fenster"],
    ["Dokąd? — pod obraz", "unter das Bild"],
    ["Dokąd? — przed kanapę", "vor das Sofa"],
    ["Dokąd? — między łóżko a regał", "zwischen das Bett und das Regal"],
    ["Dokąd? — do stołów", "an die Tische"],
    ["Dokąd? — do pokojów", "in die Zimmer"],
    ["Dokąd? — nad ściany", "über die Wände"],
    ["Dokąd? — między łóżka", "zwischen die Betten"]
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