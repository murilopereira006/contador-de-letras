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
        charMap.set(char, 1);
      }
    }
    setCharCount(charMap);
  };

  return (
    <>
      <div>
        <textarea value={text()} onInput={handleTextareaChange} />
      </div>
      <div>
        <table>
        <thead>
          <tr>
            <th>Caractere</th>
            <th>Número de Vezes</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(charCount()).map(([char, count]) => (
            <tr>
              <td>{char}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default App
