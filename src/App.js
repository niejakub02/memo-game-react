import './App.css';
import { useEffect, useState, useRef } from 'react';
import Board from './Board/Board';
import removeIdiom from './helpers/removeIdiom';
import shuffle from './helpers/shuffle';
import splitIdioms from './helpers/splitIdioms';
import addClass from './helpers/addClass';

function App() {
  const load = useRef();
  const [idioms, setIdioms] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetchIdioms();
  }, [])

  useEffect(() => {
    if (!idioms || !isWin()) return;
      onWin();
  }, [idioms]);

  const fetchIdioms = () => {
    setIdioms(null);
    setIsPending(true);

    setTimeout(() => { // timeout dla urealnienia
      fetch('http://localhost:8000/idioms')
      .then(res => res.json())
      .then(data => {
        const newData = shuffle(splitIdioms(data.map(chunk => {
          return {
            ...chunk,
            guessed: false
          }
        })));
        onDataLoad(newData);
      });
    }, 750);
  }

  const onDataLoad = (data) => {
    addClass(load, 'animate__fadeOut');
    setTimeout(() => {
      setIsPending(false);
      setIdioms(data);
    }, 1000);
  }

  const onMatchGlobal = (id) => {
    setIdioms(removeIdiom(idioms, id));
  }

  const isWin = () => {
    for (let idiom of idioms)
      if (!idiom.guessed) return false;
    
    return true;
  }
  
  const onWin = () => {
    alert('congratz!');
  }

  const onStartOverGlobal = () => {
    fetchIdioms();
  }

  const onRandomizeGlobal = () => {
    setIdioms(shuffle(idioms));
  }

  return (
    <div className="app">
      { 
        idioms && <Board 
          onMatchGlobal = { onMatchGlobal }
          onStartOverGlobal = { onStartOverGlobal }
          onRandomizeGlobal = { onRandomizeGlobal }
          idioms = { idioms }
        />
      }

      { isPending && <div className="loading animate__animated animate__fadeIn" ref={ load }>Loading...</div> }
    </div>
  );
}

export default App;
