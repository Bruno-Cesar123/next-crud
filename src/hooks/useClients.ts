import { useState, useEffect } from 'react';

import ClientRepository from '../core/ClientRepository';
import CollectionClient from '../backend/db/CollectionClient';
import Client from '../core/Client';
import useVisible from './useVisible';

export default function useClients() {
  const repo: ClientRepository = new CollectionClient();

  const {
    tableVisible,
    formVisible,
    showForm,
    showTable
  } = useVisible()

  const [client, setClient] = useState<Client>(Client.empty());
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(getAll, []);

  function getAll() {
    repo.index().then((clients) => {
      setClients(clients);
      showTable()
    });
  }

  function selectedClient(client: Client) {
    setClient(client);
    showForm()
  }

  async function excludeClient(client: Client) {
    await repo.delete(client);
    getAll();
  }

  function newClient() {
    setClient(Client.empty());
    showForm()
  }

  async function saveClient(client: Client) {
    await repo.save(client);
    getAll();
  }

  return {
    tableVisible,
    showTable,
    client,
    clients,
    newClient,
    saveClient,
    excludeClient,
    selectedClient,
    getAll
  }
}
