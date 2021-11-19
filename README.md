## FinApi - Financeira



### To start
    
        yarn  - for install all dependecies
    
        yarn dev - for start a node server
    

---

### Requisitos

- Deve ser possível criar uma conta. ✔️
- Deve ser possível buscar extrato bancário do cliente.
- Deve ser possível realizar um depósito.
- Deve ser possível realizar um saque.
- Deve ser possível buscar extrato bancário do cliente por data.
- Deve ser possível atualizar dados da conta do cliente.
- Deve ser possível obter dados da conta do cliente.
- Deve ser possível deletar uma conta.

--- 

### Regras de negócio

- Não deve ser possível cadastrar uma conta com CPF já existente. ✔️
- Não deve ser possível realizar depósito em uma conta não existente.
- Não deve ser possível realizar saque em uma conta não existente.
- Não deve ser possível buscar extrato em uma conta não existente.
- Não deve ser possível excluir uma conta não existente.
- Não deve ser possível realizar saque quando o saldo for insuficiente uma conta não existente.
