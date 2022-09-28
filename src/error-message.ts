export const errorMessage = {
  clientDto: {
    birthDay:
      'erro ao criar o cliente, verifique se a data de nascimento segue o padrao dd/mm/aaaa',
    name: 'erro ao criar o cliente, a propriedade name nao pode ser vazia',
    email:
      'erro ao criar o cliente, email invalido, o valor informado nao representa um email ou o mesmo nao foi informado',
  },
  clientRepository: {
    emailAlredyExist: 'email ja cadastrado',
  },
};
