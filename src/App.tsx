import React, { useEffect, useState } from 'react';
import './App.css';
import { Data } from './Model/data';
import Cards from './components/Cards/cards';
import { Form, Information, Menu, Preloader } from './components/componens';


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const [state, setState] = useState<Data>()

  const [count, setCount] = useState(1)
  const counter = () => {
    setCount(count + 1)

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${count}&count=6`);
        const data = await response.json();
        setState(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [count]);
  return (
    <div className="App">
      {loading == true ? <Preloader /> :
        <div> <Menu />
          <Information />
          <Cards counter={counter} count={count} state={state} users={state?.users} loading={loading} />
          <Form></Form></div>

      }

    </div >

  );
}

export default App;
