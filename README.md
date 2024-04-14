<!--
██████╗ ██████╗ ██   ██╗ █████ ██  ███  ██╗ ██████╗ ██████╗██████╗ 
██╔══██╗██╔══╗  ██╔══██╗╚██╗ ╔╝██╔═██║█ ██  ██╔══██╗██╔══╗ ██╔═══█ 
██   ██╔██████╔╝██   ██╔╝████╔╝██  ██╗█ ██  ██   ██╔██████╔██████╗ 
██╔══██╗██╔══╗   ██╔██╗  ██╔╝  ██╔═██║ ███  ██╔══██╗██╔══╗ ██╔█══╝ 
██████╔╝██████╔╝  ██╔╝   ██║   ██  ██   ██╗ ██████╔╝██████╔██╗ ██  
╚═════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝╚══════╝ -->


**Deployment** [https://dev-finder-rose.vercel.app](https://dev-finder-rose.vercel.app)  
    

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Create your local postgres db;   
Run npm run db:push to run the sql commands by drizzle orm to create the database's tables and relations in the new db  

```bash
npm run db:push
```

Or host the database on a docker container  
```bash
docker compose up
# run the docker container to host the postgres database
```