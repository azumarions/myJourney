import React, { useState } from "react"
import { useRouter } from "next/router"
import Cookie from "universal-cookie"
import { createProf, getProf, getMyProf } from "../../api/profile";

const cookie = new Cookie();

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const login = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/authen/jwt/create/`,
        {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res.status === 400) {
          throw 'authlization failed';
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const options = { path: '/' };
        cookie.set('access_token', data.access, options);
        getProf();
      });
      router.push('/posts');
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/register/`, {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 400) {
            throw 'すでに登録されているメールアドレスです。ログインしてください。';
          }
        });
        await login();
        await createProf();
      } catch (err) {
        alert(err);
      }
    }
  }

  return (
    <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
            <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white-900">
              {isLogin? 'Login' : 'Sign up'}
            </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
            <div>
                <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                />
            </div>
            <div>
                <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                />
            </div>
            </div>
            <div className="flex items-center justify-center">
            <div className="text-sm">
                <span 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="font-medium cursor-pointer text-white-600 hover:text-indigo-500"
                >
                    change mode ?
                </span>
            </div>
            </div>

            <div>
            <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round" 
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" 
                    />
                  </svg>
                </span>
                {isLogin ? 'Login with JWT' : 'Create new user'}
            </button>
            </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Auth