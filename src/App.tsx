import React from 'react';
import styles from './App.module.css';
import { fetchData } from './api';

import { ResponseData } from './api/types';
import { Cards } from './components';

import image from './images/image.png';

const App: React.FC = () => {

  const [ data, setData ] = React.useState<ResponseData>({} as ResponseData);

  React.useEffect(() => {
    async function fetchAPI(): Promise<void> {
      const response =  (await fetchData()) as ResponseData;
      console.log(response)
      setData(response);
    }
    fetchAPI();
  }, []);

  
  return (
    <div className={styles.container}>
      <img className = { styles.image } src = { image } alt = "COVID-19 Tracker"/>
      <Cards data = { data }/>
    </div>
  );
}

export default App;
