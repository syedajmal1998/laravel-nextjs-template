import { Button, Input, Label } from '@roketid/windmill-react-ui'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Alert from '~/components/Alert'
import Loading from '~/components/Loading'
import Layout from '~/containers/Layout'
import { useAuth } from '~/hooks/auth'

const VerifyEmail = () => {
    const { logout, resendEmailVerification, apiLoading } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState({})

    return (
        <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
            <div className='relative flex-1 h-full max-w-lg p-4 mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
                <Loading message='Authenticating...' show={apiLoading} />
                <div className='grid grid-cols-1 overflow-y-auto md:flex-row'>

                    <div className="mb-4 text-sm text-gray-600">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we just
                        emailed to you? If you didn&apos;t receive the email, we will
                        gladly send you another.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-4">
                        <Button
                            onClick={() => resendEmailVerification({ setStatus, setErrors })}>
                            Resend Verification Email
                        </Button>

                        <button
                            type="button"
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                            onClick={e => logout()}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail