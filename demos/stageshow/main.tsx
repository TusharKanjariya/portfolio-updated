import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import Gold from './examples/ai-chat';
import VectorDocs from './examples/vectordocs';
import './page.css';

function App(){
 const [run,setRun]=useState(0);
 const gold=new URLSearchParams(location.search).has('gold');
 return <main>
  <header><a href="http://127.0.0.1:4173/#projects">Tushar Kanjariya<span> / Design lab</span></a><span className="badge">Separate concept · 01</span></header>
  <section className="intro"><p className="eyebrow">A little less explaining. A little more showing.</p><h1>Make the work<br/>easy to understand.</h1><p>A focused product story, in your portfolio’s quiet visual language.</p></section>
  <section className="project" aria-labelledby="project-title">
   <div className="copy"><p className="eyebrow">2026 · AI learning project</p><h2 id="project-title">VectorDocs</h2><p className="lead">Your documents.<br/>A more useful answer.</p><p>A conceptual walkthrough of asking a question, retrieving relevant document content, and showing a grounded answer.</p><p className="stack">MongoDB Atlas / PostgreSQL + pgvector</p><button onClick={()=>setRun(n=>n+1)}>Replay the story <span aria-hidden="true">↻</span></button><p className="disclosure">Illustrative UI with sample content.<br/>Not a live AI service or an actual product screenshot.</p></div>
   <figure><div id="example" role="img" aria-label="Conceptual document assistant: a question is typed, relevant passages are retrieved, and an answer appears with its source.">{gold?<Gold key={run}/>:<VectorDocs key={run}/>}</div><figcaption>A question → relevant context → a sourced answer</figcaption></figure>
  </section>
  <section className="notes"><div><span>01 / Clarity</span><h3>Show the outcome</h3><p>Help a hiring manager understand the project without opening its repository.</p></div><div><span>02 / Restraint</span><h3>One story at a time</h3><p>A short sequence that settles into a still. No endless movement competing with your experience.</p></div><div><span>03 / Intent</span><h3>Use it selectively</h3><p>Best for VectorDocs, Sendlio workflows or a sitemap-to-JSON transformation—not every section.</p></div></section>
  <footer>Exploration only. Your current portfolio has not been changed.</footer>
 </main>
}
createRoot(document.getElementById('root')!).render(<App/>);
