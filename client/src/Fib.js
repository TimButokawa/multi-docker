import React from 'react';
import axios from 'axios';

const Fib = () => {
  const [indexes, setIndexes] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [index, setIndex] = React.useState('');

  const fetchValues = React.useCallback(async () => {
    try {
      const { data } = await axios.get('/api/values/current');
      setValues(data);
    } catch(e) {
      console.log('there was an error: ', e);
    }
  }, [setValues]);

  const fetchIndexes = React.useCallback(async () => {
    try {
      const { data } = await axios.get('/api/values/all');
      setIndexes(data);
    } catch(e) {
      console.log('there was an error: ', e);
    }
  }, [setIndexes]);

  React.useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/values', {
        index,
      });
      setIndex('');
    } catch(e) {
      console.log('there was an error: ', e);
    }
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>Enter index:</label>
        <input
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          style={{ margin:'0 10px' }}
        />
        <button type="submit">submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {!!indexes.length && indexes.map((index, i) => {
        return (
          <span key={i}>
            {index.number}
            {i !== indexes.length - 1 && ', '}
          </span>
        );
      })}
      <h3>Calculated values:</h3>
      {values && Object.keys(values).map((value, i) => {
        return (
          <div key={i}>For index: {value}, I saw {values[value]}</div>
        );
      })}
    </div>
  );
}

export default Fib;
