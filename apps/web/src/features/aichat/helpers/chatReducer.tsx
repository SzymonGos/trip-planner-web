type TMessageProps = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

type TChatStateProps = {
  messages: TMessageProps[];
  inputValue: string;
  isLoading: boolean;
  error: string | null;
};

type ChatAction =
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SEND_MESSAGE'; payload: string }
  | { type: 'MESSAGE_SENT'; payload: TMessageProps }
  | { type: 'AI_RESPONSE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET_CHAT' };

export const initialState: TChatStateProps = {
  messages: [],
  inputValue: '',
  isLoading: false,
  error: null,
};

export const chatReducer = (state: TChatStateProps, action: ChatAction): TChatStateProps => {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, inputValue: action.payload };
    case 'SEND_MESSAGE': {
      const userMessage: TMessageProps = {
        id: Date.now().toString(),
        content: action.payload,
        role: 'user',
        timestamp: new Date(),
      };
      return {
        ...state,
        messages: [...state.messages, userMessage],
        inputValue: '',
        isLoading: true,
        error: null,
      };
    }
    case 'MESSAGE_SENT':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'AI_RESPONSE': {
      const aiMessage: TMessageProps = {
        id: (Date.now() + 1).toString(),
        content: action.payload,
        role: 'assistant',
        timestamp: new Date(),
      };
      return {
        ...state,
        messages: [...state.messages, aiMessage],
        isLoading: false,
      };
    }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'RESET_CHAT':
      return initialState;
    default:
      return state;
  }
};
