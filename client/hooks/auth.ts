import useSWR from 'swr'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery, stringify } from 'querystring';
import axios, { csrf } from 'lib/axios'
import { toast } from 'react-hot-toast';

declare type AuthMiddleware = 'auth' | 'guest'

interface IUseAuth {
  middleware?: AuthMiddleware
  redirectIfAuthenticated?: string
}

interface IApiRequest {
  setErrors?: React.Dispatch<React.SetStateAction<any>>
  setStatus?: React.Dispatch<React.SetStateAction<any>>
  [key: string]: any
}

export const useAuth = (config: IUseAuth) => {
  const loginUrl = process.env.NEXT_PUBLIC_AUTH_PAGE_LOGIN || '/login'
  const verifyEmailUrl = process.env.NEXT_PUBLIC_AUTH_LOGIN || '/verify-email'
  const redirectedUrl = process.env.NEXT_PUBLIC_AUTH_REDIRECTED || '/'

  const apiPathUser = process.env.NEXT_PUBLIC_API_PATH_USER || '/user'
  const apiPathLogin = process.env.NEXT_PUBLIC_API_PATH_LOGIN || '/login'
  const apiPathRegister = process.env.NEXT_PUBLIC_API_PATH_REGISTER || '/register'
  const apiPathForgotPassword = process.env.NEXT_PUBLIC_API_PATH_FORGOT_PASSWORD || '/forgot-password'
  const apiPathResetPassword = process.env.NEXT_PUBLIC_API_PATH_RESET_PASSWORD || '/reset-password'
  const apiPathVerifyEmail = process.env.NEXT_PUBLIC_API_PATH_VERIFY_EMAIL || '/email/verification-notification'
  const apiPathLogout = process.env.NEXT_PUBLIC_API_PATH_LOGIN || '/logout'

  const router = useRouter()

  const { middleware, redirectIfAuthenticated } = config || {}
  const redirectIfAuthenticatedUrl = router.query.next_to ? String(router.query.next_to) : redirectIfAuthenticated || redirectedUrl


  const [loading, setLoadingState] = useState(true)
  const [apiLoading, setApiLoading] = useState(false)

  const { data: user, error, mutate } = useSWR(apiPathUser, () =>
    axios
      .get(apiPathUser)
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error

        router.push(redirectIfAuthenticatedUrl.indexOf('verify-email') < 0 ? verifyEmailUrl : redirectIfAuthenticatedUrl)
      }),
  )

  const register = async (args: IApiRequest) => {
    setApiLoading(true)
    const { setErrors, ...props } = args
    await csrf()
    setErrors && setErrors([])
    axios
      .post(apiPathRegister, props)
      .then(() => { setApiLoading(false); mutate() })
      .catch(error => {
        setApiLoading(false)
        if (error.response.status !== 422) throw error

        console.log(error?.response, error);
        
        setErrors && setErrors(Object.values(error?.response?.data?.errors || {}).flat() as never[])
      }).finally(() => setApiLoading(false))
  }

  const login = async (args: IApiRequest) => {
    setApiLoading(true)
    const { setErrors, setStatus, ...props } = args
    await csrf()
    setErrors && setErrors([])
    setStatus && setStatus(null)
    axios
      .post(apiPathLogin, props)
      .then(() => { setApiLoading(false); mutate() })
      .catch(error => {
        toast.error(error?.response?.data?.message)
        console.log(error?.response, error);
        
        setErrors && setErrors(Object.values(error?.response?.data?.errors || {}).flat() as never[])
        // if (error.response.status !== 422) throw error

      }).finally(() => setApiLoading(false))
  }

  const forgotPassword = async (args: IApiRequest) => {
    setApiLoading(true)
    const { setErrors, setStatus, email } = args
    await csrf()
    setErrors && setErrors([])
    setStatus && setStatus(null)
    axios
      .post(apiPathForgotPassword, { email })
      .then(response => { setStatus && setStatus(response.data.status); setApiLoading(false); })
      .catch(error => {
        if (error.response.status !== 422) throw error

        console.log(error?.response, error);
        
        setErrors && setErrors(Object.values(error?.response?.data?.errors || {}).flat() as never[])
      }).finally(() => setApiLoading(false))
  }

  const resetPassword = async (args: IApiRequest) => {
    setApiLoading(true)
    const { setErrors, setStatus, ...props } = args
    await csrf()
    setErrors && setErrors([])
    setStatus && setStatus(null)
    axios
      .post(apiPathResetPassword, { token: router.query.token, ...props })
      .then(response => router.push(loginUrl + '?reset=' + btoa(response.data.status)))
      .catch(error => {
        if (error.response.status !== 422) throw error

        console.log(error?.response, error);
        
        setErrors && setErrors(Object.values(error?.response?.data?.errors || {}).flat() as never[])
      }).finally(() => setApiLoading(false))
  }

  const resendEmailVerification = (args: IApiRequest) => {
    setApiLoading(true)
    const { setStatus } = args
    axios
      .post(apiPathVerifyEmail)
      .then(response => setStatus && setStatus(response.data.status)).finally(() => setApiLoading(false))
  }

  const logout = useCallback(async (nextUrl?: string, nextQuery?: ParsedUrlQuery) => {
    if (!error) {
      setApiLoading(true)
      await axios.post(apiPathLogout)
      setApiLoading(false)
      mutate()
    }

    let wrapNextUrl = loginUrl as string

    if (nextUrl) {
      const queryString = stringify(nextQuery)
      wrapNextUrl = encodeURIComponent(nextUrl + (queryString ? '?' + queryString : ''))
    }
    // window.location.pathname = '/login'
    window.location.assign(loginUrl + (nextUrl && nextUrl.indexOf(loginUrl) < 0 && nextUrl.indexOf(verifyEmailUrl) < 0 ? '?next_to=' + wrapNextUrl : ''))
  }, [mutate, error, loginUrl, apiPathLogout, verifyEmailUrl])

  useEffect(() => {
    if (user && !user.email_verified_at && router.pathname != '/verify-email') {
      router.push('/verify-email')
      setLoadingState(false)
    }
    if (user && user.email_verified_at && router.pathname == '/verify-email') {
      router.push('/')
      setLoadingState(false)
    }
    if (middleware === 'guest' && user) {
      router.push(redirectIfAuthenticatedUrl)
    }
    if (middleware === 'auth' && error) {
      logout(router.pathname, router.query)
      setLoadingState(false)
    }
    setLoadingState(false)
    return () => {
      setLoadingState(true)
    }
  }, [middleware, redirectIfAuthenticatedUrl, router, user, error, logout])

  return {
    loginUrl,
    verifyEmailUrl,
    redirectedUrl,
    apiPathUser,
    apiPathLogin,
    apiPathRegister,
    apiPathForgotPassword,
    apiPathResetPassword,
    apiPathVerifyEmail,
    apiPathLogout,
    apiLoading,
    loading,
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout
  }
}