import { SIGN_IN, SIGN_OUT, AUTH_ERROR} from "../types";
import api from '../../utils/api'

export const signIn = (email,password) => async dispatch=> {
  const body = JSON.stringify({ email, password });
  try {
    const res = await api.post(`/admin-auth/signin`, body)
    console.log(res);
    dispatch({
      type: SIGN_IN,
      payload: res.data
    });
  } catch (err) {
    console.log('****auth_actions/signIn****',err);
    dispatch({
      type: AUTH_ERROR
    });
  }
}

export const signOut = () => async dispatch => {

  const res = await api.get(`/superadmin/dispatchers?page=1&perPage=10`, {})
  console.log(res,'main');
  // try {
  //   dispatch({
  //     type:SIGN_OUT
  //   })
  // } catch (err) {
  //   console.log('****auth_actions/signOut****', err);
  // }
}
