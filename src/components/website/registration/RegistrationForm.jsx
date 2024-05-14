import React from 'react'
import styles from './RegistrationForm.module.scss'
import CustomInput from '../../../elements/CustomInput/CustomInput'
import { useForm } from 'react-hook-form'
import cn from 'classnames'


const RegistrationForm = () => {
  const { control } = useForm();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles['form-container']}>
            <div className={cn('row', styles['form-heading'])}>
              <h3>Sign Up</h3>
            </div>

            <div className={cn('row', styles['form-section'])}>
              <form action="">
                <div className="row">
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label='First Name'
                      name='first-name'
                      placeholder='First Name'
                      rules={{
                        required: 'First name is required.'
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <CustomInput
                      control={control}
                      label='Last Name'
                      name='last-name'
                      placeholder='Last Name'
                      rules={{
                        required: 'Last name is required.'
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label='Email'
                      name='email'
                      placeholder='Email'
                      inputType='email'
                      rules={{
                        required: 'Email address is required.'
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label='Mobile'
                      name='mobile'
                      placeholder='Mobile'
                      inputType='tel'
                      rules={{
                        required: 'Mobile number is required.'
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label='Password'
                      name='password'
                      placeholder='Password'
                      inputType='password'
                      rules={{
                        required: 'Password is required.'
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p className={styles['tnc-note']} >By continuing, you agree to our <a href='#'>Terms and Conditions</a> and <a href='#'>Privacy Policy</a></p>
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

export default RegistrationForm