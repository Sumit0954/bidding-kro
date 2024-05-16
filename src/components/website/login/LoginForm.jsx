import React from 'react'
import styles from './LoginForm.module.scss'
import CustomInput from '../../../elements/CustomInput/CustomInput'
import { useForm } from 'react-hook-form'
import cn from 'classnames'

const LoginForm = () => {
  const { control } = useForm();

  return (
    <>
      <div className="container">
        <div className="row">

          <div className={styles['form-container']}>
            <div className={cn('row', styles['form-heading'])}>
              <h3>Sign In</h3>
            </div>

            <div className={cn('row', styles['form-section'])}>
              <form action="">
                <div className="row">
                  <div className="col-lg-12">
                    <CustomInput
                      control={control}
                      label='Login with Mobile'
                      name='login with mobile'
                      placeholder='Login with Mobile'
                      rules={{
                        required: 'Login with mobile is required.'
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
                  <div className="col-lg-6">
                    <p className={styles['frogetpassword-link']} > <a href='/login/forgot-password'>Forgot your Password? </a> </p>
                  </div>
                  <div className="col-lg-6">
                    <p className={styles['email-link']} > <a href='#'>Login with Email </a> </p>
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

export default LoginForm