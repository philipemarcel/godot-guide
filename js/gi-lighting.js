// Laboratório de transporte de luz: traçado de raios, sombra, um rebatimento
// difuso na parede vermelha e captura direcional do ambiente para o metal.
// Modelo didático próprio: não implementa VoxelGI, LightmapGI ou o renderer Godot.
(function () {
  "use strict";
  const add = (a,b) => a.map((v,i)=>v+b[i]);
  const sub = (a,b) => a.map((v,i)=>v-b[i]);
  const mul = (a,k) => a.map(v=>v*k);
  const dot = (a,b) => a.reduce((s,v,i)=>s+v*b[i],0);
  const norm = a => mul(a,1/Math.max(1e-10,Math.sqrt(dot(a,a))));
  const at = (o,d,t) => add(o,mul(d,t));
  const white = [0.72,0.70,0.64], red = [0.75,0.035,0.018];
  const light = [0.2,2.8,0.25], lightPower = 13;
  const balls = [
    {id:"matte",center:[-0.78,0.57,-0.45],radius:0.57,albedo:white},
    {id:"metal",center:[0.80,0.62,-0.80],radius:0.62,albedo:[0.95,0.76,0.40]}
  ];
  const box = {min:[-0.08,0,-1.72],max:[0.30,1.18,-1.10]};

  function intersect(o,d,skip="") {
    let best=null;
    const accept=(t,n,id,color)=>{
      if(t>0.0005 && (!best||t<best.t))best={t,p:at(o,d,t),n,id,albedo:color};
    };
    const planes=[
      {axis:0,pos:-2,n:[1,0,0],id:"red-wall",color:red},
      {axis:0,pos:2,n:[-1,0,0],id:"right-wall",color:white},
      {axis:1,pos:0,n:[0,1,0],id:"floor",color:white},
      {axis:1,pos:3,n:[0,-1,0],id:"ceiling",color:white},
      {axis:2,pos:-2,n:[0,0,1],id:"back-wall",color:white}
    ];
    for(const plane of planes){
      const t=(plane.pos-o[plane.axis])/d[plane.axis];
      if(!Number.isFinite(t)||t<=0.0005)continue;
      const p=at(o,d,t);
      if(p[0]<-2.0001||p[0]>2.0001||p[1]<-0.0001||p[1]>3.0001||p[2]<-2.0001||p[2]>1.0001)continue;
      accept(t,plane.n,plane.id,plane.color);
    }
    for(const sphere of balls){
      if(skip===sphere.id)continue;
      const oc=sub(o,sphere.center), b=dot(oc,d), disc=b*b-dot(oc,oc)+sphere.radius*sphere.radius;
      if(disc<0)continue;
      const root=Math.sqrt(disc);
      const t=(-b-root)>0.0005 ? -b-root : -b+root;
      accept(t,norm(sub(at(o,d,t),sphere.center)),sphere.id,sphere.albedo);
    }
    let near=-Infinity, far=Infinity, nearNormal, farNormal;
    for(let a=0;a<3;a++){
      if(Math.abs(d[a])<1e-10){if(o[a]<box.min[a]||o[a]>box.max[a]){far=-Infinity;break;}continue;}
      let t1=(box.min[a]-o[a])/d[a],t2=(box.max[a]-o[a])/d[a];
      let n1=[0,0,0],n2=[0,0,0];n1[a]=-1;n2[a]=1;
      if(t1>t2){[t1,t2]=[t2,t1];[n1,n2]=[n2,n1];}
      if(t1>near){near=t1;nearNormal=n1;}if(t2<far){far=t2;farNormal=n2;}
    }
    if(far>=near)accept(near>0.0005?near:far,near>0.0005?nearNormal:farNormal,"block",white);
    return best;
  }

  function visible(p,n,target) {
    const start=add(p,mul(n,0.002)),offset=sub(target,start),distance=Math.sqrt(dot(offset,offset));
    const hit=intersect(start,mul(offset,1/distance));
    return !hit || hit.t>=distance-0.004;
  }

  function directIrradiance(p,n) {
    const l=sub(light,p), r2=dot(l,l), cosine=Math.max(0,dot(n,norm(l)));
    return cosine>0&&visible(p,n,light)?lightPower*cosine/r2:0;
  }

  // Integração determinística de nove áreas da parede que recebem luz direta.
  // O fator geométrico inclui orientação, distância e teste de oclusão.
  const patches=[];
  for(let y=0;y<3;y++)for(let z=0;z<3;z++){
    const p=[-1.998,(y+0.5),-2+(z+0.5)],n=[1,0,0];
    patches.push({p,radiance:mul(red,directIrradiance(p,n)/Math.PI)});
  }
  function indirectIrradiance(p,n,id) {
    if(id==="red-wall")return [0,0,0];
    let energy=[0,0,0];
    for(const patch of patches){
      const delta=sub(patch.p,p),r2=dot(delta,delta),direction=norm(delta);
      const receive=Math.max(0,dot(n,direction)),emit=Math.max(0,-direction[0]);
      if(receive===0||emit===0||!visible(p,n,patch.p))continue;
      energy=add(energy,mul(patch.radiance,receive*emit/Math.max(0.04,r2)));
    }
    return energy;
  }
  function diffuse(hit,bounce) {
    if(hit.id === "ceiling" && Math.abs(hit.p[0]-0.2)<0.4 && Math.abs(hit.p[2]-0.25)<0.35)return [6,5.8,5.2];
    const direct=directIrradiance(hit.p,hit.n);
    const indirect=bounce>0?indirectIrradiance(hit.p,hit.n,hit.id):[0,0,0];
    return hit.albedo.map((c,i)=>c*(direct+indirect[i]*bounce)/Math.PI);
  }
  function shade(o,d,hit,bounce,probe) {
    if(!hit)return [0,0,0];
    if(hit.id!=="metal")return diffuse(hit,bounce);
    const view=mul(d,-1), toLight=norm(sub(light,hit.p)), half=norm(add(toLight,view));
    const distance=dot(sub(light,hit.p),sub(light,hit.p));
    const spec=visible(hit.p,hit.n,light)?Math.pow(Math.max(0,dot(hit.n,half)),100)*lightPower/distance*3:0;
    const reflection=sub(d,mul(hit.n,2*dot(d,hit.n)));
    // Captura idealizada no centro da esfera: exclui o próprio objeto, como
    // uma sonda local. A iluminação ambiente difusa da sonda fica desativada.
    const envHit=probe?intersect(balls[1].center,reflection,"metal"):null;
    const env=envHit?diffuse(envHit,bounce):[0,0,0];
    return hit.albedo.map((c,i)=>c*(spec+env[i]));
  }
  const camera=[0,1.45,5.6];
  function sample(u,v,aspect,bounce,probe) {
    const d=norm([u*aspect*0.48,v*0.48-0.025,-1]);
    const hit=intersect(camera,d);
    return {id:hit?.id||"background",color:shade(camera,d,hit,bounce,probe)};
  }
  const encode=c=>Math.round(255*Math.pow(Math.max(0,c)/(1+Math.max(0,c)),1/2.2));
  const cache=new Map();
  const geometryCache=new Map();
  function layers(width,height) {
    const key=width+":"+height;
    if(geometryCache.has(key))return geometryCache.get(key);
    const values=new Float32Array(width*height*12);
    for(let y=0;y<height;y++)for(let x=0;x<width;x++){
      const u=2*(x+.5)/width-1,v=1-2*(y+.5)/height;
      const d=norm([u*(width/height)*.48,v*.48-.025,-1]),hit=intersect(camera,d);
      if(!hit)continue;
      const i=(y*width+x)*12;
      if(hit.id!=="metal"){
        const direct=diffuse(hit,0);
        const indirect=hit.id==='ceiling'&&direct[0]===6?[0,0,0]:indirectIrradiance(hit.p,hit.n,hit.id).map((c,j)=>c*hit.albedo[j]/Math.PI);
        values.set(direct,i);values.set(indirect,i+3);
      }else{
        values.set(shade(camera,d,hit,0,false),i);
        const reflection=sub(d,mul(hit.n,2*dot(d,hit.n))),envHit=intersect(balls[1].center,reflection,"metal");
        if(envHit){
          const direct=diffuse(envHit,0);
          const indirect=envHit.id==='ceiling'&&direct[0]===6?[0,0,0]:indirectIrradiance(envHit.p,envHit.n,envHit.id).map((c,j)=>c*envHit.albedo[j]/Math.PI);
          values.set(direct.map((c,j)=>c*hit.albedo[j]),i+6);
          values.set(indirect.map((c,j)=>c*hit.albedo[j]),i+9);
        }
      }
    }
    if(geometryCache.size>=3)geometryCache.delete(geometryCache.keys().next().value);
    geometryCache.set(key,values);return values;
  }
  function image(width,height,bounce,probe) {
    const key=[width,height,bounce,probe].join(":");
    if(cache.has(key))return cache.get(key);
    const rgba=new Uint8ClampedArray(width*height*4);
    const values=layers(width,height);
    for(let p=0;p<width*height;p++){
      const i=p*4,k=p*12;
      for(let c=0;c<3;c++)rgba[i+c]=encode(values[k+c]+values[k+3+c]*bounce+(probe?values[k+6+c]+values[k+9+c]*bounce:0));
      rgba[i+3]=255;
    }
    if(cache.size>=6)cache.delete(cache.keys().next().value);
    const result={width,height,data:rgba};cache.set(key,result);return result;
  }
  function render(ctx,w,h,state) {
    const gi=state.giMode==='gi_probe',bounce=gi?Number(state.bounce):0,probe=state.probe==='on',stacked=w<620;
    const maxW=stacked?w-24:(w-36)/2;
    const panelW=Math.max(100,Math.min(maxW,(stacked?(h-100)/2:h-80)/1.05));
    const panelH=panelW*1.05,unit=panelH+48,totalH=stacked?unit*2+12:unit;
    const y0=Math.max(8,(h-totalH)/2),x0=stacked?(w-panelW)/2:(w-(panelW*2+12))/2;
    const pixelW=Math.min(200,Math.max(100,Math.round(panelW))),pixelH=Math.round(pixelW*1.05);
    const configs=[{bounce:0,probe:false,title:'01 · LUZ DIRETA',color:'#d4a359'},{bounce,probe,title:'02 · SEUS AJUSTES',color:'#5ce1e6'}];
    configs.forEach((config,index)=>{
      const x=x0+(stacked?0:index*(panelW+12)),top=y0+(stacked?index*(unit+12):0);
      ctx.fillStyle=config.color;ctx.font='bold 12px monospace';ctx.fillText(config.title,x,top+14);
      const pixels=image(pixelW,pixelH,config.bounce,config.probe);
      let buffer=pixels.canvas;
      if(!buffer){buffer=document.createElement('canvas');buffer.width=pixelW;buffer.height=pixelH;const bctx=buffer.getContext('2d'),data=bctx.createImageData(pixelW,pixelH);data.data.set(pixels.data);bctx.putImageData(data,0,0);pixels.canvas=buffer;}
      ctx.drawImage(buffer,x,top+24,panelW,panelH);ctx.strokeStyle='#6e512c';ctx.lineWidth=1;ctx.strokeRect(x,top+24,panelW,panelH);
      ctx.fillStyle='#d2bc95';ctx.font='11px monospace';ctx.fillText(index===0?'GI: 0 · Reflexo: off':`GI: ${bounce.toFixed(1)}x · Reflexo: ${probe?'on':'off'}`,x,top+panelH+42);
    });
  }
  window.GILightingLab={render,sample,image,indirectIrradiance,directIrradiance,intersect};
})();
