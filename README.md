# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de chek-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obster seu histórico de chek-ins;
- [ ] Deve ser possível o usuário buscar academias proximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar chek-in em uma academia;
- [ ] Deve ser possível validar chek-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

# RNs (Requisitos não funcionais)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 chek-ins no mesmo dia;
- [ ] O usuário não pode fazer chek-in de não estiver perto (100m) de uma academia;
- [ ] O chek-in so pode ser validado em até 20 minutos após criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos não funcionais)

- [x] A senhra do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);