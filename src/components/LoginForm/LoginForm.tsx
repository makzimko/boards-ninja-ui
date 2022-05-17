import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';

import useAuthActions, {
  loginErrorState,
  loginLoadingState,
} from '../../atoms/auth';
import { useRecoilValue } from 'recoil';
import { LOADING } from '../../atoms/loading/types';

const LoginForm: FC = () => {
  const { performLogin } = useAuthActions();
  const loginLoading = useRecoilValue(loginLoadingState);
  const loginError = useRecoilValue(loginErrorState);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onChangeLogin = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setLogin(e.target.value);
    },
    []
  );
  const onChangePassword = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setPassword(e.target.value);
    },
    []
  );

  const onSubmit = useCallback<FormEventHandler>(
    async (e) => {
      e.preventDefault();
      await performLogin(login, password);
    },
    [login, password, performLogin]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={login} onChange={onChangeLogin} placeholder="Login" />
        <input
          value={password}
          onChange={onChangePassword}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {loginLoading === LOADING.PENDING && 'Loading...'}
        {loginError && <div>{JSON.stringify(loginError)}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
