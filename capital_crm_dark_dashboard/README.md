# Capital CRM - Dark Mode + Dashboard (Vercel Ready)

## O que tem aqui
- Frontend moderno (React + Vite) com **dark mode** e toggle. Layout responsivo e dashboard com gráfico.
- API serverless em `api/vercel/` (endpoints demo): `/login` e `/reports/summary`.
- `vercel.json` configurado para hospedar frontend e API no mesmo deploy.

## Como publicar no Vercel
1. Crie repositório e faça push do conteúdo deste ZIP.
2. Importe o repositório no Vercel.
3. Nas variáveis do projeto defina (opcional para demo):
   - JWT_SECRET (se for implementar tokens reais)
   - MYSQL_URL (se for conectar DB real)
4. Deployar. O frontend ficará disponível e as rotas `/api/*` mapearão para `api/vercel/*`.

## Credenciais demo
- Email: admin@capital.com.br
- Senha: 123456

---
Este pacote é um frontend/apresentação + API demo para facilitar testes e deploy imediato no Vercel.
