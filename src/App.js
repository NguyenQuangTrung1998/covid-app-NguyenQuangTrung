import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import TodoList from './components/todolist';
import Header from './components/header';
import FormSearch from './components/formSearch';


import axios from 'axios';

var i = 0;
function App() {
  const [todolist, setTodolist] = useState([]);
  const [count, setCount] = useState(0);
  const [filterCountry, setFilterCountry] = useState([]);

  useEffect(() => {

    async function callData() {
      try {
        const url = 'https://disease.sh/v3/covid-19/countries';
        var getData = await axios.get(url)
          .then(function (res) {
            setTodolist([...res.data]);
          })
          .catch(function (err) {
            console.log(err);
          })
      } catch (error) {
        console.log(error);
      }
      return getData;
    }
    callData();

    var interval = setInterval(() => {
      i++;
      setCount(i);
    }, 180000);

    return () => {
      clearInterval(interval);
    }
  }, [count]);

  var updateCases = useMemo(() => {
    var sumCases = todolist.reduce((x, y) => {
      return x + y.cases;
    }, 0);
    // console.log('case ' + sumCases)
    return sumCases;
  }, [todolist]);

  var updateDeaths = useMemo(() => {
    var sumDeaths = todolist.reduce((x, y) => {
      return x + y.deaths;
    }, 0);
    // console.log('death' + sumDeaths)
    return sumDeaths;
  }, [todolist]);
  var updateRecoveries = useMemo(() => {
    var sumRecoveries = todolist.reduce((x, y) => {
      return x + y.recovered;
    }, 0);
    // console.log('recover')
    return sumRecoveries;
  }, [todolist]);

  function onhandleFilter(params) {
    var countries = todolist.filter((x) => {
      return x.country.toLowerCase().indexOf(params.search.toLowerCase()) !== -1;
    });
    setFilterCountry([...countries]);
    if (params.search === '' || params.search === null) {
      setFilterCountry([]);
    }
  }

  return (
    <div className="App">
      <div className='header'>
        <Header cases={updateCases}
          deaths={updateDeaths}
          recoveries={updateRecoveries}
        />
        <div>
          <FormSearch filterItem={onhandleFilter} />
        </div>
      </div>
      <TodoList
        data={todolist}
        country={filterCountry}
      />
    </div>
  );
}

export default App;
