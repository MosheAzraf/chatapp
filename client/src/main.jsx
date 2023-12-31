import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";

import {store} from '../src/redux/store.js'
import { Provider } from 'react-redux'; // Import Provider from react-redux

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
          <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
  ,
)
