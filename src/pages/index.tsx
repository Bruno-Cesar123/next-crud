import { useState, useEffect } from 'react';
import CollectionClient from '../backend/db/CollectionClient';
import Button from '../components/Button';
import Form from '../components/Form';
import Layout from '../components/Layout'
import Table from '../components/Table'

import Client from '../core/Client';
import ClientRepository from '../core/ClientRepository';

export default function Home() {
  const repo: ClientRepository = new CollectionClient()

  const [visible, setVisible] = useState<'table' | 'form'>('table')
  const [client, setClient] = useState<Client>(Client.empty())
  const [clients, setClients] = useState<Client[]>([])

  useEffect(getAll, [])

  function getAll() {
    repo.index().then(clients => {
      setClients(clients)
      setVisible('table')
    })
  }


  function clientSelected(client: Client) {
    setClient(client)
    setVisible('form')
  }

  async function clientExclude(client: Client) {
    await repo.delete(client)
    getAll()
  }

  function newClient() {
    setClient(Client.empty())
    setVisible('form')
  }

  async function saveClient(client: Client) {
    await repo.save(client)
    getAll()
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
