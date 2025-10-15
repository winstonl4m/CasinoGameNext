"use client"
import { createContext, useEffect, useContext, useReducer, useState } from "react";


// Add these type definitions at the top of the file
interface AuthState {
  jwtToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
  currentGameId: string | null;
}

interface User {
  id: number;
  name: string;
  username: string;
  balance: number;
}

interface AuthContextType {
  jwtToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  currentGameId: string | null;
  loginSuccess: (jwtToken: string, user: User) => void;
  logout: () => void;
  setCurrentGame: (gameId: string | null) => void;
  updateBalance: (newBalance: number) => void;
}

// Create the context with proper typing
export const AuthContext = createContext<AuthContextType | null>(null);



export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

// Add new action types
const SET_CURRENT_GAME = 'SET_CURRENT_GAME'
const UPDATE_BALANCE = 'UPDATE_BALANCE'

const authReducer = (prevState: AuthState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        jwtToken: action.payload.jwtToken,
        user: action.payload.user,
        isAuthenticated: true,
        currentGameId: null,
      };
    case LOGOUT:
      return {
        ...prevState,
        jwtToken: null,
        user: null,
        isAuthenticated: false,
        currentGameId: null,
      };
    case SET_CURRENT_GAME:
      return {
        ...prevState,
        currentGameId: action.payload,
      };
    case UPDATE_BALANCE:
      return {
        ...prevState,
        user: prevState.user ? {
          ...prevState.user,
          balance: action.payload,
        } : null,
      };
    default:
      return prevState;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {  



    const initialAuthState = (()=>{
        try {
            const jwtToken = window.localStorage.getItem('jwtToken')
            const user = window.localStorage.getItem('user')
            if(jwtToken && user){
                return {
                    jwtToken,
                    user: JSON.parse(user),
                    isAuthenticated: true,
                    currentGameId: null
                }

            }
        } catch (error) {
            console.error("Failed to load from localstorage", error)
        }

        return {
            jwtToken: null,
            user: null,
            isAuthenticated: false,
            currentGameId: null
        }
    })()


    const [authState, dispatch] = useReducer(authReducer, initialAuthState)


    useEffect(() => {


        try {
            if(authState.isAuthenticated){
                 window.localStorage.setItem('jwtToken', authState.jwtToken)
                 window.localStorage.setItem('user', JSON.stringify(authState.user))
            } else {
                window.localStorage.removeItem('jwtToken')
                window.localStorage.removeItem('user')

            }
        } catch (error) {
            console.error("Failed to save localstorage", error)
        }

    },[authState])

    



    const loginSuccess = (jwtToken: any, user: any) => {
        dispatch({ type: LOGIN_SUCCESS, payload: { jwtToken, user } });
    };

    const logout = () => {
        dispatch({
          type: LOGOUT
          
        });
    };

    const setCurrentGame = (gameId: string | null) => {
      dispatch({ type: SET_CURRENT_GAME, payload: gameId });
    };

    const updateBalance = async (newBalance: number) => {
      dispatch({ type: UPDATE_BALANCE, payload:  newBalance  });
    };

    

    return (
      <AuthContext.Provider
        value={{
          jwtToken: authState.jwtToken,
          user: authState.user,
          isAuthenticated: authState.isAuthenticated,
          currentGameId: authState.currentGameId,
          loginSuccess,
          logout,
          setCurrentGame,
          updateBalance,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
}
