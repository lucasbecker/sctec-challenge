# SCTEC Challenge

## Visão Geral

Este projeto consiste em uma aplicação web do tipo **CRUD (Create, Read, Update, Delete)** desenvolvida para gerenciar informações sobre **empreendimentos localizados no estado de Santa Catarina**.

A aplicação permite cadastrar, visualizar, editar e remover registros de empreendimentos por meio de uma interface gráfica moderna e intuitiva.

O objetivo do sistema é fornecer uma ferramenta simples para organização de informações relacionadas ao empreendedorismo regional, permitindo acompanhar dados de empresas, empreendedores e seus respectivos segmentos de atuação.

A aplicação foi desenvolvida utilizando **React + TypeScript + Vite**, com persistência de dados no **localStorage**, dispensando a necessidade de backend ou banco de dados externo para execução.

## Objetivo do Sistema

O sistema foi projetado para permitir:

- Cadastro de novos empreendimentos
- Visualização de registros existentes
- Atualização de dados cadastrados
- Exclusão de registros
- Busca e filtragem de dados
- Visualização de estatísticas básicas

Dessa forma, o projeto atende ao requisito de implementação de um sistema **CRUD funcional com interface gráfica web**.

## Informações Gerenciadas

Cada empreendimento registrado no sistema contém as seguintes informações:

### Campos obrigatórios

| Campo                    | Descrição                           |
| ------------------------ | ----------------------------------- |
| Nome do empreendimento   | Nome da empresa ou negócio          |
| Empreendedor responsável | Nome da pessoa responsável          |
| Município                | Cidade localizada em Santa Catarina |
| Segmento de atuação      | Área de atuação da empresa          |
| E-mail                   | Contato principal                   |
| Status                   | Situação do empreendimento          |

### Campos adicionais implementados

Além dos campos mínimos exigidos no desafio, foram adicionados:

| Campo               | Descrição                         |
| ------------------- | --------------------------------- |
| CNPJ                | Identificação da empresa          |
| Telefone            | Contato alternativo               |
| Descrição           | Breve descrição do empreendimento |
| Data de criação     | Registro automático               |
| Data de atualização | Atualização automática            |

## Funcionalidades da Aplicação

### Cadastro de empreendimentos

Permite registrar um novo empreendimento informando todos os campos do formulário.

O sistema gera automaticamente:

- identificador único
- data de criação
- data de atualização

### Listagem de registros

Todos os empreendimentos cadastrados são exibidos em uma tabela com:

- nome
- município
- segmento
- status
- contato

A tabela permite ordenação e ações de gerenciamento.

### Edição de registros

Os dados de um empreendimento podem ser atualizados por meio da interface de edição.

### Remoção de registros

O sistema permite excluir registros existentes mediante confirmação do usuário.

### Busca e filtros

A aplicação possui mecanismos de filtragem:

- busca textual
- filtro por segmento
- filtro por status

Isso permite localizar rapidamente registros específicos.

### Estatísticas

A interface também apresenta indicadores gerais:

- total de empreendimentos cadastrados
- quantidade de empreendimentos ativos
- quantidade de empreendimentos inativos
- número de segmentos representados

## Arquitetura da Aplicação

A aplicação segue uma arquitetura **frontend modular baseada em componentes**, utilizando boas práticas de organização de código.

Principais camadas:

```
Interface (React Components)
↓
Hooks de Lógica de Negócio
↓
Camada de Persistência (LocalStorage)
```

Essa estrutura separa:

- **interface do usuário**
- **lógica da aplicação**
- **persistência de dados**

facilitando manutenção e evolução do sistema.

## Modelo de Dados

A estrutura principal utilizada para representar um empreendimento é:

```ts

type Enterprise = {
  id: string
  name: string
  entrepreneur: string
  city: string
  segment: Segment
  email: string
  phone?: string
  document?: string
  description?: string
  status: Status
  createdAt: string
  updatedAt: string
}

type Segment = "Tecnologia" | "Comércio" | "Indústria" | "Serviços" | "Agronegócio"

type Status = "Ativo" | "Inativo"
```

## Estrutura do Projeto

```
src
│
├── components
│   ├── enterprise-form.tsx
│   ├── enterprise-table.tsx
│   ├── enterprise-filters.tsx
│   ├── enterprise-header.tsx
│   ├── enterprise-stats.tsx
│   └── enterprise-confirm.tsx
│
├── hooks
│   └── use-enterprise.tsx
│
├── lib
│   ├── storage.ts
│   └── utils.ts
│
├── constants
│   ├── segments.ts
│   └── status.ts
│
├── types
│   ├── enterprise.ts
│   ├── segment.ts
│   └── status.ts
│
├── app.tsx
├── main.tsx
└── index.css
```

## Organização dos Componentes

### `app.tsx`

Arquivo principal da aplicação. Responsável por integrar todos os componentes da interface.

### `use-enterprise.tsx`

Hook responsável pela lógica de negócio:

- cadastro
- atualização
- exclusão
- filtros
- busca

### `storage.ts`

Responsável pela persistência dos dados utilizando localStorage.

### `enterprise-form.tsx`

Formulário de cadastro e edição.

### `enterprise-table.tsx`

Tabela responsável pela listagem dos empreendimentos.

### `enterprise-filters.tsx`

Interface de busca e filtragem de dados.

### `enterprise-stats.tsx`

Componente que apresenta indicadores estatísticos.

## Persistência de Dados

A aplicação utiliza **localStorage** para armazenar os dados no navegador.

Chave utilizada: `sctec-challenge`.

Isso permite que:

- os dados permaneçam após atualização da página
- não seja necessário backend
- o sistema seja executado localmente com facilidade

## Tecnologias Utilizadas

| Tecnologia   | Finalidade                        |
| ------------ | --------------------------------- |
| React        | Construção da interface           |
| TypeScript   | Tipagem estática                  |
| Vite         | Ambiente de desenvolvimento       |
| Tailwind CSS | Estilização da interface          |
| shadcn/ui    | Componentes de interface          |
| Radix UI     | Acessibilidade e componentes base |
| Lucide React | Ícones                            |
| Sonner       | Notificações                      |
| ESLint       | Padronização de código            |
| Prettier     | Formatação automática             |

## Como Executar o Projeto

### 1. Clonar o repositório

```
git clone <url-do-repositorio>
```

### 2. Acessar a pasta do projeto

```
cd sctec-challenge
```

### 3. Instalar dependências

```
npm install
```

### 4. Executar o projeto

```
npm run dev
```

### 5. Acessar no navegador

```
http://localhost:5173
```

## Scripts Disponíveis

Executar ambiente de desenvolvimento

```
npm run dev
```

Gerar build de produção

```
npm run build
```

Visualizar build

```
npm run preview
```

Executar lint

```
npm run lint
```

Verificação de tipos

```
npm run typecheck
```

## Melhorias Futuras

Possíveis evoluções da aplicação:

- [ ] integração com backend
- [ ] utilização de banco de dados relacional
- [ ] autenticação de usuários
- [ ] paginação da tabela
- [ ] exportação de dados
- [ ] dashboards com gráficos
- [ ] validação avançada de formulário
- [ ] integração com APIs públicas de empresas
