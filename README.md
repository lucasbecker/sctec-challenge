# SCTEC Challenge

## Visão Geral

Este projeto consiste em uma aplicação web do tipo **CRUD (Create, Read, Update, Delete)** desenvolvida para gerenciar informações sobre **empreendimentos localizados no estado de Santa Catarina**.

O objetivo do sistema é fornecer uma ferramenta simples para organização de informações relacionadas ao empreendedorismo regional, permitindo acompanhar dados de empresas, empreendedores e seus respectivos segmentos de atuação. A aplicação permite cadastrar, visualizar, editar e remover registros de empreendimentos por meio de uma interface gráfica moderna e intuitiva.

A aplicação foi construída com **React + TypeScript + Vite** e utiliza **localStorage** para persistência de dados, não sendo necessário backend para execução.

## Funcionalidades

### Cadastro de empreendimentos

Permite registrar um novo empreendimento informando via formulário.

Campos obrigatórios:

- Nome do empreendimento
- Nome do empreendedor(a) responsável
- Município
- Segmento
- E-mail
- Telefone
- Status

Campos opcionais:

- CNPJ
- Descrição

O sistema gera automaticamente:

- Identificador único
- Data de criação
- Data de atualização

### Listagem de registros

Todos os empreendimentos cadastrados são exibidos em uma tabela com:

- Empreendimento
- Empreendedor(a)
- Município
- Segmento
- E-mail
- Telefone
- Status

A tabela permite ordenação e ações de gerenciamento.

### Edição de registros

Os dados de um empreendimento podem ser atualizados por meio da interface de edição.

### Remoção de registros

O sistema permite excluir registros existentes mediante confirmação do usuário.

### Busca e filtros

A aplicação possui mecanismos de filtragem:

- Busca textual
- Filtro por segmento
- Filtro por status

Isso permite localizar rapidamente registros específicos.

### Estatísticas

A interface também apresenta indicadores gerais:

- Total de empreendimentos cadastrados
- Quantidade de empreendimentos ativos
- Quantidade de empreendimentos inativos
- Número de segmentos representados

## Arquitetura

A aplicação segue uma arquitetura **frontend modular baseada em componentes**, utilizando boas práticas de organização de código.

Essa estrutura separa:

- **Interface do usuário**
- **Lógica da aplicação**
- **Persistência de dados**

Facilitando manutenção e evolução do sistema.

### Modelo de Dados

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

### Estrutura do Projeto

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

### Organização dos Componentes

#### `app.tsx`

Arquivo principal da aplicação. Responsável por integrar todos os componentes da interface.

#### `use-enterprise.tsx`

Hook responsável pela lógica de negócio:

- cadastro
- atualização
- exclusão
- filtros
- busca

#### `storage.ts`

Responsável pela persistência dos dados utilizando localStorage.

#### `enterprise-form.tsx`

Formulário de cadastro e edição.

#### `enterprise-table.tsx`

Tabela responsável pela listagem dos empreendimentos.

#### `enterprise-filters.tsx`

Interface de busca e filtragem de dados.

#### `enterprise-stats.tsx`

Componente que apresenta indicadores estatísticos.

### Persistência de Dados

A aplicação utiliza **localStorage** para armazenar os dados no navegador.

Chave utilizada: `sctec-challenge`.

Isso permite que:

- Os dados permaneçam após atualização da página
- Não seja necessário backend
- O sistema seja executado localmente com facilidade

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

## Como Executar

```
git clone <url-do-repositorio>  # 1. Clonar o repositório
cd sctec-challenge              # 2. Acessar a pasta do projeto
npm install                     # 3. Instalar dependências
npm run dev                     # 4. Executar o projeto
```

### Scripts

```
npm run dev        # Ambiente de desenvolvimento
npm run build      # Build de produção
npm run preview    # Visualizar build
npm run lint       # Lint do projeto
npm run typecheck  # Verificação de tipos
```

## Deploy

O projeto possui **deploy automatizado no GitHub Pages utilizando GitHub Actions**.

Sempre que ocorre um **push na branch `main`**, o workflow executa automaticamente as etapas de build e publicação da aplicação.

Fluxo do pipeline:

1. Clona o repositório
2. Configura o ambiente Node.js
3. Instala as dependências
4. Gera o build de produção
5. Publica a pasta `dist` no GitHub Pages

Isso garante que a versão publicada esteja sempre sincronizada com o código da branch principal.

Após a execução do workflow, o GitHub Pages publica automaticamente a aplicação gerada na pasta `dist` e disponibiliza em [lucasbecker.github.io/sctec-challenge](https://lucasbecker.github.io/sctec-challenge/).

O workflow utilizado está disponível em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

## Melhorias Futuras

Possíveis evoluções da aplicação:

- [ ] Integração com backend
- [ ] Autenticação de usuários
- [ ] Paginação da tabela
- [ ] Exportação de dados
- [ ] Dashboards com gráficos
- [ ] Validação avançada de formulário
- [ ] Integração com APIs públicas de empresas
