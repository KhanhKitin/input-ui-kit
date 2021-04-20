import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap';
import FLInput from '../libs/flinput';
import FLDate from '../libs/flinput/date';
import style from '../../styles.module.css';


export default function index(props) {
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');

  return (
    <Container className={style.mt_kt}>
      <Form>
        <FLInput
          required={true}
          value={address}
          changeEvent={setAddress}
          label={'Địa chỉ'}
          hideborder={true}
        />
        <div className={style.mt_kt} />
         <FLInput
          required={true}
          value={address2}
          changeEvent={setAddress2}
          label={'Địa chỉ'}
          hideborder={true}
        />
        <div className={style.mt_kt} />
         <FLInput
          required={true}
          value={address3}
          changeEvent={setAddress3}
          label={'Địa chỉ'}
          hideborder={true}
        />
         <div className={style.mt_kt} />
        <Button
          onClick={() => props.onSubmit({address, address2, address3})}
        > 
          OK
        </Button>
       
      </Form>
    </Container>
  )
}
