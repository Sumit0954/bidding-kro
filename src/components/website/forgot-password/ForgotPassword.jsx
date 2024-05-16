import React from 'react'
import styles from './ForgotPassword.module.scss'
import CustomInput from '../../../elements/CustomInput/CustomInput'
import { useForm } from 'react-hook-form'
import cn from 'classnames'


const ForgotPassword = () => {
  const { control } = useForm();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles['form-container']}>
            <div className={cn('row', styles['form-heading'])}>
              <h3>Forgot Password</h3>
            </div>
            <div className={cn('row', styles['restpassword-text'])}>

              <p>Enter the phone associated with your account. We will send you <br />an OTP to reset your password.</p>

            </div>

            <div className={cn('row', styles['form-section'])}>
              <form action="">
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label='Mobile Number'
                      name='mobilr number'
                      placeholder='Mobile Number'
                      inputType='tel'
                      rules={{
                        required: 'Mobile number is required.'
                      }}
                    />
                  </div>

                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <p className={styles['email-link']} > <a href='#'>Use Email Instead</a> </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default ForgotPassword