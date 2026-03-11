import LoginForm from '@/components/loginForm/loginForm';
import { handleGithubLogin, handleGoogleLogin } from '@/lib/action';
import styles from './login.module.css'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button className={styles.github}>Login with GitHub</button>
      </form>
      <form action={handleGoogleLogin}>
        <button className={styles.google}>Login with Google</button>
      </form>
      <LoginForm />
    </div>
  )
}

export default LoginPage
