import { useEffect, useState, useRef } from 'react';


export default function QnA({style, ListOfQuestions} : any) {
  const input = useRef<HTMLInputElement>(null);
  const right_answer = useRef<HTMLHeadingElement>(null);

  const [points, setPoints] = useState<number>(0);
  const [Questions, setQuestions] = useState(new Map(
    [
  ['adapt', 'dostosować, przystosować'],
  ['amend', 'poprawiać, zmieniać'],
  ['applications programmer', 'programista aplikacji'],
  ['Application Service Provider (ASP)', 'dostawca usług aplikacyjnych'],
  ['arrange', 'organizować, układać'],
  ['blog administrator', 'administrator bloga'],
  ['carry out', 'wykonywać, przeprowadzać'],
  ['clip art', 'gotowe elementy graficzne'],
  ['compile', 'kompilować'],
  ['computer salesperson', 'sprzedawca sprzętu komputerowego'],
  ['computer security specialist', 'specjalista ds. bezpieczeństwa komputerowego'],
  ['computer services engineering technician', 'technik serwisu komputerowego'],
  ['Delphi', 'Delphi (język programowania)'],
  ['design', 'projektować'],
  ['develop', 'rozwijać, opracowywać'],
  ['devise', 'wymyślać, opracowywać'],
  ['desktop publishing (DTP)', 'publikowanie komputerowe'],
  ['DTP operator', 'operator DTP'],
  ['e-commerce developer', 'programista rozwiązań e-commerce'],
  ['estimates', 'szacunki, kosztorysy'],
  ['Exchange/Microsoft Exchange Server', 'serwer poczty Microsoft Exchange'],
  ['handle', 'obsługiwać, zajmować się'],
  ['hardware engineer/architect', 'inżynier sprzętu komputerowego'],
  ['help desk/helpdesk technician', 'pracownik pomocy technicznej'],
  ['identify', 'identyfikować, rozpoznawać'],
  ['install', 'instalować'],
  ['IT manager', 'kierownik działu IT'],
  ['locate', 'lokalizować, znajdować'],
  ['maintenance', 'konserwacja, utrzymanie'],
  ['monitoring', 'monitorowanie, nadzór'],
  ['network administrator/engineer/support person', 'administrator/inżynier sieci/pracownik wsparcia sieciowego'],
  ['NT/Windows NT (New Technology)', 'system operacyjny Windows NT'],
  ['offset lithography', 'druk offsetowy'],
  ['Oracle', 'Oracle (system zarządzania bazami danych)'],
  ['oversee', 'nadzorować'],
  ['package', 'pakiet oprogramowania'],
  ['page layout', 'układ strony'],
  ['project management', 'zarządzanie projektami'],
  ['relational database management system', 'system zarządzania relacyjną bazą danych'],
  ['research', 'badania, prowadzić badania'],
  ['software engineer/designer', 'inżynier/projektant oprogramowania'],
  ['solid grasp', 'dobra znajomość, solidne zrozumienie'],
  ['track record', 'dotychczasowe osiągnięcia, doświadczenie'],
  ['specification', 'specyfikacja'],
  ['Structured Query Language (SQL)', 'strukturalny język zapytań (SQL)'],
  ['system analyst', 'analityk systemowy'],
  ['system administrator/sysadmin', 'administrator systemów'],
  ['system support person', 'pracownik wsparcia technicznego systemów'],
  ['web developer/webmaster', 'programista stron internetowych/webmaster']
]));

  let question: string = Array.from(Questions)[Math.floor(Math.random() * Questions.size)][0]
  useEffect(() => {
    document.querySelector("h1.points")?.addEventListener('animationend', () => {
      document.querySelector("h1.points")?.classList.remove('right')
    });
  }, [])

  function check(event){
    event.preventDefault();

    const answer = event.target[0].value.trim().toLowerCase();
    let ans1 = undefined;
    let ans2 = undefined;
    const current_right_answer = Questions.get(question)

    if(current_right_answer.search(',') != -1){
      const both_answers = current_right_answer.trim().split(',');
      ans1 = both_answers[0].trim().toLowerCase();
      ans2 = both_answers[1].trim().toLowerCase();
    } 
    else {
      ans1 = current_right_answer.trim().toLowerCase();
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
  return (
    <div className='QnA appear'>
      <h1 className='title' style={{...style.color, fontSize: `${70 - question.length}px`}}>
        {
          question
        }
      </h1>
      
      <form action="" onSubmit={check}>
        <input type="text" ref={input} style={{...style.color, ...style.backgroundColor}} autoComplete='off'/>
      </form>
      
      <h1 ref={right_answer} className='right_answer'></h1>
    
      <h1 className='points' style={style.color}>
        Points: {points} <br />
      </h1>
    </div>
  )
}
// ollama qwen2:7b