import { loginUserRefreshFeetch } from '../actions/creators/auth/auth'; //Dispath Action  
import moment from 'moment'
import jwtDecode from 'jwt-decode';

export function jwt({ dispatch, getState }) {

    return (next) => (action) => {
        if(action.jwt != undefined){

            if (getState().auth && getState().auth.token) {
                      let token = getState().auth.token
                    let tokenExpiration = jwtDecode(token);

                if (tokenExpiration.exp < (Date.now() / 1000)){
    
                    return dispatch(loginUserRefreshFeetch(token)).then(() => next(action));
                    
                        }
                }
        }
        
        return next(action);
    };
}
