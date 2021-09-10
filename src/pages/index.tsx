import Layout from '../components/Layout'
import Table from '../components/Table'

import Client from '../core/Client';

export default function Home() {

  const clients = [
    new Client('Bruno', 21, '1'),
    new Client('Cesar', 22, '2'),
    new Client('Ferreira', 23, '3'),
    new Client('Santos', 24, '4'),
  ]

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
       <Layout title="Cadastro simples">
         <Table clients={clients}>

         </Table>
            
       </Layout>
    </div>
  )
}
