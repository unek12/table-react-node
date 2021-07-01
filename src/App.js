import React  from "react"
import AppRouter from "./router/router"
import {Layout} from 'antd'
import 'antd/dist/antd.css';

function App() {

  return (
      <Layout>
        <AppRouter />
      </Layout>
  )
}

export default App;
