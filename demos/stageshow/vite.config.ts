import {defineConfig} from 'vite';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';

const site=resolve('../..');
export default defineConfig({plugins:[{
 name:'portfolio-comparison',
 configureServer(server){
  server.middlewares.use(async(req,res,next)=>{
   const url=new URL(req.url || '/', 'http://localhost');
   if(url.pathname==='/compare'){
    let html=await readFile(resolve(site,'index.html'),'utf8');
    html=html.replace('<head>','<head><base href="/portfolio/"><meta name="robots" content="noindex,nofollow">');
    html=html.replace(/<script src="analytics\.js[^>]*><\/script>/,'');
    html=html.replace('</body>','<script type="module" src="/compare.tsx"></script></body>');
    res.setHeader('Content-Type','text/html');res.end(await server.transformIndexHtml('/compare',html));return;
   }
   if(!url.pathname.startsWith('/portfolio/'))return next();
   const file=resolve(site,decodeURIComponent(url.pathname.slice(11)) || 'index.html');
   if(!file.startsWith(site+sep)||file.includes(`${sep}.`)){res.statusCode=403;res.end();return;}
   try{
    const types={'.css':'text/css','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.jpg':'image/jpeg','.woff2':'font/woff2','.pdf':'application/pdf','.html':'text/html'};
    res.setHeader('Content-Type',types[extname(file)] || 'application/octet-stream');res.end(await readFile(file));
   }catch{res.statusCode=404;res.end();}
  });
 }
}]});
