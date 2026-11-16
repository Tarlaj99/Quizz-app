// ä ü ö
import { useEffect, useState, useRef } from 'react';
import { Niemiecki } from './Data';

export default function QnA({style, ListOfQuestions} : any) {
  const input = useRef<HTMLInputElement>(null);
  const right_answer = useRef<HTMLHeadingElement>(null);

  const [points, setPoints] = useState<number>(0);
  const [Questions, setQuestions] = useState(new Map(Niemiecki))

  let question: string = Array.from(Questions)[Math.floor(Math.random() * Questions.size)][0]
  useEffect(() => {
    document.querySelector("h1.points")?.addEventListener('animationend', () => {
      document.querySelector("h1.points")?.classList.remove('right')
    });

    document.addEventListener('keydown', (e) => {
      let key: string = '';
      
      if(e.key == '1'){
        key = 'ä';
      }
      else if(e.key == '2'){
        key = 'ü';
      }
      else if(e.key == '2'){
        key = 'ö';
      }
      else if(e.key == '3'){
        key = 'ß';
      }

      if(key){
        input.current.value += key;
        setTimeout(() => {
          input.current.value = input.current.value.slice(0,-1);
        }, 1)
      }
      
      })
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