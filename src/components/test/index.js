import React, { useState } from 'react'
import { Form, Container } from 'react-bootstrap';
import FLInput from '../libs/flinput';
import FLDate from '../libs/flinput/date';
import style from '../../styles.module.css';


export default function index() {
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
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
        <FLDate
              disable={false}
              value={date}
              changeEvent={setDate}
              label={'Ngày đi'}
              required={false}
            />
      </Form>
    </Container>
  )
}
