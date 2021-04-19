import React from 'react'
import styles from './styles.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './components/test';
import FormTest from './components/test/form';
export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export const Form = (props) => {
  console.log('====>', props);
  switch(props.type) {
    case 'BHSK': {
      return <FormTest/>
      break;
    }
    case 'CAR': {
     return <Test/>
      break;
    }
  }
}
