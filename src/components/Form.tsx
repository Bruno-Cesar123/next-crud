import { useState } from "react";
import Client from '../core/Client';
import Button from "./Button";
import Input from "./Input";

interface FormProps {
  client: Client
}

export default function Form(props: FormProps) {
  const id = props.client?.id
  const [name, setName] = useState(props.client?.name ?? '')
  const [age, setAge] = useState(props.client?.age ?? 0)
  return (
    <div>
      {id ? (
        <Input
          readOnly
          text="Código"
          value={id}
          className="mb-5"
        />
      ): false}
      <Input
        text="Nome"
        value={name}
        valueChanged={setName}
        className="mb-5"
      />
      <Input
        text="Idade"
        value={age}
        valueChanged={setAge}
        type="number"
      />

      <div className="flex justify-end mt-7">
        <Button color="blue" className="mr-2">
          {id ? 'Alterar' : 'Salvar'}
        </Button>
        <Button>
          Cancelar
        </Button>
      </div>
    </div>
  )
}