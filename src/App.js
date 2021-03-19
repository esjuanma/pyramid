import { useEffect, useState } from 'react';
import './App.css';
import { getFastest } from './services/pyramid';
import userInput from './pyramid';

function Row (position, number, index) {
  const selected = position === index;
  const style = selected && {
    color: 'blue',
    fontWeight: 'bold'
  } || {};
  return (
    <div className="number" style={style}>
      {number}
    </div>
  )
}

function App() {
  const [pyramid, setPyramid] = useState(null);
  const [pos, setPos] = useState(0);
  const [intv, setIntv] = useState(null);

  const click = () => {
    if (intv) {
      clearInterval(intv);
      setIntv(null);
    } else {
      timer(pos);
    }
  };

  const timer = (pos) => {
    let newPos = pos;

    setIntv(setInterval(() => {
      newPos++;

      if (newPos === userInput.length) {
        newPos = 1;
      }
      setPos(newPos);

      const input = userInput.slice(0, newPos).join('\n');
      setPyramid(getFastest(input));
    }, 500));

    return () => clearInterval(intv);
  };

  useEffect(() => timer(pos), []);

  let position = 0;

  return (
    <div className="App">
      {pyramid && (
        <>
          <button onClick={click}>{intv ? 'Pause' : 'Play'}</button>
          <h1>{pyramid.min}</h1>
          {pyramid.input.map((row, index) => {
            if (index && pyramid.path[index - 1] === 'right') {
              position++;
            }

            return (
              <div className="row">
                {row.map(Row.bind(null, position))}
              </div>
            )
          })}
        </>
      )}

    </div>
  );
}







export default App;
