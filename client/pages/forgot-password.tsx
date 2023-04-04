import Link from 'next/link'
import Image from 'next/image'
import { Label, Input, Button, WindmillContext } from '@roketid/windmill-react-ui'
import Guest from '~/containers/Guest'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import Loading from '~/components/Loading';
import { RootState } from '~/store/store';
import Alert from '~/components/Alert';
import { CheckmarkIcon, ErrorIcon, toast } from 'react-hot-toast';
import { useAuth } from '~/hooks/auth';
import React, { useState, useContext } from 'react'

function ForgotPassword() {
  const { mode } = useContext(WindmillContext)
  const { forgotPassword, apiLoading } = useAuth({ middleware: 'guest' })

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ email?: string[] }>({})
  const [status, setStatus] = useState(null)

  const dispatch = useDispatch()
  const imgSource = mode === 'dark' ? '/assets/img/forgot-password-office-dark.jpeg' : '/assets/img/forgot-password-office.jpeg'
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    }
  });
  const onForgotPassword = (data) => {
    forgotPassword({ email: data.email, setErrors, setStatus })
  }

  return (<Guest>
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>

        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='relative h-32 md:h-auto md:w-1/2'>
            <Image
              aria-hidden='true'
              className='object-cover w-full h-full'
              src={imgSource}
              alt='Office'
              fill
            />
          </div>
          <main className='relative flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            <Loading message='Authenticating...' show={apiLoading} />
            <div className='w-full'>
              <Alert type='error' message={errors} show={Object.values(errors).length != 0 && true} />
              <Alert type='error' message={status} show={status && true} />
              <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                Forgot password
              </h1><form onSubmit={handleSubmit(onForgotPassword)}>

                <Label>
                  <span>Email</span>
                  <Input
                    className='mt-1'
                    type='email'
                    placeholder='john@doe.com'
                    {...register("email", { required: true })}
                  />
                </Label>
                <Button className='mt-4' block type='submit'>
                  Recover Password
                </Button>
              </form>
              <hr className='my-8' />
              <p className='mt-4'>
                <Link className='text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline' href='/login'>
                  back to login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  </Guest>
  );
}

// Define PropTypes.
ForgotPassword.propTypes = {
  props: PropTypes.object,
  login: PropTypes.func,
};

export default ForgotPassword;
