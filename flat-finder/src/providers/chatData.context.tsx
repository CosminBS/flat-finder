import { createContext, useContext, useReducer } from "react";
import { UserDataContext } from "./userData.context";

export const ChatContext = createContext({});

export const ChatContextProvider = ({ children }) => {
  const { userDetails } = useContext<any>(UserDataContext);
  
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:
            userDetails.uid > action.payload.uid
              ? userDetails.uid + action.payload.uid
              : action.payload.uid + userDetails.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
