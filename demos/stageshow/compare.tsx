import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import VectorDocs from './examples/vectordocs';
import './compare.css';

const figure=document.querySelector<HTMLElement>('.project-vector-media')!;
const original=figure.innerHTML;
let scene:ReturnType<typeof createRoot>|undefined;
function show(enhanced:boolean){
 scene?.unmount();scene=undefined;
 figure.classList.toggle('comparison-enhanced',enhanced);
 if(enhanced){
  figure.innerHTML='<div class="comparison-scene"></div><figcaption>Conceptual walkthrough · Sample document and answer, not a live product screen</figcaption>';
  scene=createRoot(figure.firstElementChild!);scene.render(<VectorDocs/>);
 }else figure.innerHTML=original;
}
function Controls(){
 const [enhanced,setEnhanced]=useState(false);
 function change(value:boolean){setEnhanced(value);show(value);figure.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 return <><span>Your website <small>Design comparison · Not published</small></span><div className="comparison-options" aria-label="Compare project presentation"><button aria-pressed={!enhanced} onClick={()=>change(false)}>Original</button><button aria-pressed={enhanced} onClick={()=>change(true)}>With Stageshow</button>{enhanced&&<button onClick={()=>show(true)}>Replay</button>}</div></>;
}
const controls=document.createElement('aside');controls.className='comparison-toolbar';controls.setAttribute('aria-label','Website design comparison');document.body.append(controls);createRoot(controls).render(<Controls/>);
requestAnimationFrame(()=>figure.scrollIntoView({block:'center'}));
