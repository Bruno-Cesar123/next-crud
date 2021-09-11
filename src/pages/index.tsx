import { useState } from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import Layout from '../components/Layout'
import Table from '../components/Table'

import Client from '../core/Client';

export default function Home() {
  const [visible, setVisible] = useState<'table' | 'form'>('table')
  const [client, setClient] = useState<Client>(Client.empty())

  const clients = [
    new Client('Bruno', 21, '1'),
    new Client('Cesar', 22, '2'),
    new Client('Ferreira', 23, '3'),
    new Client('Santos', 24, '4'),
  ]

  function clientSelected(client: Client) {
    setClient(client)
    setVisible('form')
  }

  function clientExclude(client: Client) {
    console.log(`excluir: ${client.name}`)
  }

  function newClient() {
    setClient(Client.empty())
    setVisible('form')
  }

  function saveClient(client: Client) {
    console.log(client)
    setVisible('table')
  }

  

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout title="Cadastro simples">
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button
                color="green"
                className="mb-4"
                onClick={newClient}
              >
                Novo cliente
              </Button>
            </div>
            <Table
              clients={clients}
              clientSelected={clientSelected}
              clientExclude={clientExclude}
            />
          </>

        ) : (
          <Form
            client={client}
            clientChanged={saveClient}
            canceled={() => setVisible('table')}
          />
        )}
      </Layout>
    </div>
  )
}
