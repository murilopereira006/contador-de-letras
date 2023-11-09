import { createSignal } from 'solid-js'
import './App.css'

function App() {
  const [text, setText] = createSignal('')
  const [charCount, setCharCount] = createSignal<Map<string, number>>(new Map());


  const handleTextareaChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    const newText = target.value;
    setText(newText);
    updateCharCount(newText);
  };

  const updateCharCount = (newText: string) => {
    const charMap = new Map<string, number>();
    for (const char of newText) {
      if (charMap.has(char)) {
        charMap.set(char, charMap.get(char)! + 1);
      } else {
        if(char !== ' ' && char !== '\n') charMap.set(char, 1);
      }
    }
    setCharCount(charMap);
  };

  return (
    <>
      <div class="textarea-container">
        <textarea value={text()} onInput={handleTextareaChange} placeholder='Escreva aqui!' />
      </div>
      <div class="table-container">
        {
          text() ? 
          <table>
          <tbody>
            <tr>
            <th>Caractere</th>
              {Array.from(charCount()).map(([char, count]) => (
                <td>{char}</td>
              ))}
            </tr>
            <tr>
              <th>Número de Vezes</th>
              {Array.from(charCount()).map(([char, count]) => (
                <td>{count}</td>
              ))}
            </tr>
          </tbody>
        </table>
        :
        null
        }
      </div>
    </>
  )
}

export default App
