import React, {useState, useEffect} from 'react'
import commonService from '../../service/menu/commonService'

export default function PaymentPolicy() {

  // state
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  // side effects

  useEffect(() => {
    commonService
      .getData("page/paymentPolicy")
      .then((res) => {
        setTitle(res.title)
        setBody(res.body)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  
  return (
    <div className='container pt-5'>
      <h1>{title}</h1>
      <div  dangerouslySetInnerHTML={{ __html: body }} />
    </div>

  )
}
