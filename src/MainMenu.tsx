export default function MainMenu({style, func} : any){
    return(
    <>
        <div className="MainMenu" style={{...style}}>
            <div>
                <button style={{...style.backgroundColor, ...style.color}} onClick={() => func('QnA')}>Create Quizz</button>
                <button style={{...style.backgroundColor, ...style.color}}>Browse</button>
            </div>
        </div>
    </>
    )
}