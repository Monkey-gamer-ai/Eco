const cv=document.getElementById('c'),g=cv.getContext('2d');
const W=800,H=500,R=14,SP=3.2,LEN=1200,MAXE=4;
const F='"Bricolage Grotesque",system-ui,sans-serif';
let lv=0,ecos=[],rec=[],tick=0,px=0,py=0,round=1,op=[],pr=[],state='menu',sel=-1,fi=0,prev='ready',lat=[],lc=0,ldx=0,ldy=0,fx=1,fy=0,cx=0,cy=0,cs=1,lt=[],pcd=0,mv=0,vx=0,vy=0,CW=800,CH=500,PS=[],shk=0,ppr=[],pop=[],plat=[],ivx=0,ivy=0,dsel=0,MTh=10,toast=null,ls=3,net=null,peer=null,co=0,host=0,rsk=0,rp=null,rpp=null,myFin=0,thFin=0,myRec=[],thRec=[],rdyMe=0,rdyTh=0,cdn=0,inMsg=0,netMsg='',code='',lgo=0,lgi=0,HV=[],oecos=[],rcol=0,rhat=0,dmA=0,dm=null,pv={col:0,hat:0};
const keys={};
function reset(){const s=co&&!host&&L[lv].s2?L[lv].s2:L[lv].s;px=s[0];py=s[1];rec=[];tick=0;lat=[];lt=[];pcd=0;lc=0;ppr=[];pop=[];plat=[];ivx=ivy=0;fx=1;fy=0;cs=1;state='ready'}
function newLevel(i){lv=i;ecos=[];oecos=[];round=1;sel=-1;MTh=L[lv].th;mv=0;PS=[];reset();if(L[lv].nm)state='info';if(co){coInit();if(host&&!inMsg)send({t:'lv',i:lv});if(state!=='info')coReady()}}
function keepEco(){if(co){if(!myFin&&state==='play')coFin('s');return}echoSfx();burst(px,py,'#fff',24);vib(40);if(!rec.length)rec.push([px,py]);ecos.push(rec.slice());if(ecos.length>L[lv].ne)ecos.shift();round++;reset()}
function epos(e,t){return e[Math.min(t,e.length-1)]}
function calc(){const q=L[lv],A=[...(co&&myFin?[]:[[px,py]]),...(co&&rp?[rp]:[]),...ecos.map(e=>epos(e,tick)),...oecos.map(e=>epos(e,tick))];
const nr=([x,y])=>A.some(([a,b])=>(a-x)**2+(b-y)**2<26*26);pr=q.p.map(nr);q.v.forEach((l,i)=>{if(nr(l)){lat[i]=1;lt[i]=tick}});
op=Array.from({length:30},(_,k)=>q.p.every((p,i)=>p[2]!==k||pr[i])&&q.v.every((l,i)=>l[2]!==k||(l[3]?tick-lt[i]<l[3]:lat[i])));fxs()}
function hit(x,y){const q=L[lv],rs=q.w.slice();if(!lc)rs.push(...q.f);q.d.forEach((r,k)=>{if(!op[k])rs.push(r)});
for(const[a,b,c,d]of rs){const cx=Math.max(a,Math.min(x,a+c)),cy=Math.max(b,Math.min(y,b+d));if((x-cx)**2+(y-cy)**2<R*R)return true}return false}
function step(){
let dx=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0),dy=(keys.arrowdown||keys.s?1:0)-(keys.arrowup||keys.w?1:0);
if(jv){dx=jx;dy=jy}
if(state==='cd'){if(--cdn<=0)state='play';calc();return}
if(state==='ready'){if(!co&&(dx||dy))state='play';else{calc();return}}
if(state!=='play')return;
if(co&&myFin){tick++;calc();return}
calc();
if(!lc)for(const[a,b,ux,uy,c]of L[lv].m)if(op[c]&&(a-px)**2+(b-py)**2<400){lc=14;ldx=ux;ldy=uy;sfx(300,.25,'sine',.15);sfx(620,.2,'sine',.12,.08)}
let sp=SP;if(lc){dx=ldx;dy=ldy;sp=8;lc--}else if(dx&&dy&&!jv){dx*=.7071;dy*=.7071}
if(!lc&&L[lv].ic.some(([a,b,c,d])=>px>a&&px<a+c&&py>b&&py<b+d)){ivx=ivx*.95+dx*.12;ivy=ivy*.95+dy*.12;const m=Math.hypot(ivx,ivy);if(m>1){ivx/=m;ivy/=m}dx=ivx;dy=ivy}else{ivx=dx;ivy=dy}
if(dx||dy){fx=dx;fy=dy}
const nx=Math.max(R,Math.min(L[lv].ww-R,px+dx*sp));if(!hit(nx,py))px=nx;
const ny=Math.max(R,Math.min(L[lv].wh-R,py+dy*sp));if(!hit(px,ny))py=ny;
for(const[a,b,c,d,ux,uy]of L[lv].bl)if(px>a&&px<a+c&&py>b&&py<b+d){const qx=px+ux*2.4,qy=py+uy*2.4;if(!hit(qx,py))px=qx;if(!hit(px,qy))py=qy}
if(pcd)pcd--;else for(const[a,b,c,d,k]of L[lv].pt)if(op[k]&&(a-px)**2+(b-py)**2<400){px=c;py=d;pcd=40;sfx(200,.3,'sine',.15);sfx(900,.3,'sine',.12,.1);break}
for(const[a,b,c,d,ph]of L[lv].sp)if((tick+ph)%120<66){const qx=Math.max(a,Math.min(px,a+c)),qy=Math.max(b,Math.min(py,b+d));if((px-qx)**2+(py-qy)**2<R*R*.6){sfx(120,.5,'sawtooth',.25);burst(px,py,'#e0566b',26);vib(150);shk=8;if(co){const s=!host&&L[lv].s2?L[lv].s2:L[lv].s;px=s[0];py=s[1];lc=0;pcd=0}else{reset();return}}}
if((dx||dy)&&tick%14===0)sfx(140+Math.random()*40,.07,'square',.035);
rec.push([px,py]);tick++;calc();if(co&&tick%2===0)send({t:'p',x:Math.round(px),y:Math.round(py)});
const x=co&&!host&&L[lv].x2?L[lv].x2:L[lv].x;
if(px>x[0]&&px<x[0]+x[2]&&py>x[1]&&py<x[1]+x[3]){if(co)coFin('x');else{state='win';fan();onWin()}}
else if(tick>=LN()){if(co)coFin('s');else state='fail'}
}
addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=true;audio();if(k==='m'){S.musicOn=!S.musicOn;vol()}if(k==='f')fs();
if(['arrowup','arrowdown','arrowleft','arrowright',' ','backspace'].includes(k))e.preventDefault();
const go=k===' '||k==='enter';
if(MS.includes(state))menuKey(k);else if(state==='lsel'||state==='ach')xKey(k);
else if(state==='play'||state==='ready'){if(k==='r'){if(!co)reset()}else if(k==='enter'&&state==='play')keepEco();else if(k==='p'||k==='escape')pause();else if(k==='v')mv=!mv;else if(selk(k));else if(k==='backspace')delEco()}
else if(state==='fail'){if(go)keepEco();else if(k==='d'){round++;reset()}else if(selk(k));else if(k==='backspace')delEco()}
else if(state==='win'){if(go&&!(co&&!host)){if(lv===XL||lv===CXL)xnext();else if(lv+1===XL||lv+1===CXL)finale();else L[lv+1].dn===L[lv].dn||lv===0?newLevel(lv+1):(state='done',[392,523,659,784,1047].forEach((f,i)=>sfx(f,.5,'triangle',.14,i*.12)))}}
else if(state==='end'){if(go)goMenu()}else if(state==='done'){if(go)newLevel(lv+1);else if(k==='escape')goMenu()}else if(state==='info'){if(go){state='ready';if(co)coReady()}}
});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false});

const DC=new Proxy({},{get:(_,k)=>'hsl('+(+k*53+8)%360+' 75% 62%)'});
const DN=['Fácil','Médio','Difícil','Extremo','Tutorial'],DS=[10,20,15,5,1],OF=[0,10,30,45,60],LI=[1,11,31,46],FA=[1.8,1.6,1.45,1.35,2];
const TH=[['Floresta','#0f2a1c','#1d4a33','#2a5c40','#4a3322','#9be37a',-.15],['Caverna','#14122b','#2a2150','#3a3070','#554a8a','#b39dff',.1],['Deserto','#3a2a17','#6b4a22','#8a6532','#b88a48','#ffd27a',.2],['Geleira','#12263a','#274a66','#3a6d92','#a9cde4','#e3f6ff',.5],['Vulcão','#2a0e0e','#5a1b12','#6a2a1c','#1b0a0a','#ff7a3d',-.6],['Neon','#0a0a1f','#1b0f3a','#241f52','#0d0d24','#ff4fd8',0],['Oceano','#06222c','#0c4a5c','#146579','#0a3140','#5ff0e0',-.4],['Espaço','#05050f','#10102a','#1a1a44','#34346a','#8fb4ff',.05],['Ruínas','#2a2620','#4a4236','#645a46','#2d2820','#e8d28a',.12],['Laboratório','#0e1e22','#1a3a40','#245560','#0a1518','#7dffb2',-.25]];
const CF=[[[3,3,0,0],[3,2,0,0],[3,3,1,0],[3,1,0,0],[3,2,1,0],[3,2,1,0],[3,1,1,0],[3,1,1,0],[3,2,2,0],[3,1,2,0]],
Array.from({length:20},(_,i)=>[4+(i/5|0),i%2?1:2,(i>5)+(i>12),1+(i>12),(i>9)+(i>16)]),
Array.from({length:15},(_,i)=>[9+(i*4/15|0),i%3?2:3,1+(i>6)+(i>11),1+(i>4),1+(i>8),0,1+(i>4)+(i>9),(i>6)+(i>10),(i>9)+(i>12)]),
[[15,3,2,1,1,1,2,1,1],[16,4,2,2,1,1,2,2,1],[18,3,3,2,2,2,3,2,2],[19,5,2,3,2,2,3,2,2],[20,4,3,3,2,3,4,3,2]],[[2,1,0,0]]];
function rng(s){return()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function gen(df,ix,tot,[n,ppg,lvr,spr,por=0,tmr=0,sk=0,bt=0,icn=0],seed){
const rd=rng(seed),r2=rng(seed*31+7),V=df>0&&df<4,Gp=Math.ceil(n/ppg),G=Gp+lvr+tmr,Rm=G+1,GW=70,th=(OF[df]+ix-1)%10;
let c,r;if(V){const o=[];for(let q=2;q<=4;q++){const cc=Math.ceil(Rm/q);if(cc*q-Rm<=2&&cc<=6)o.push([cc,q])}if(!o.length)o.push([Math.ceil(Rm/3),3]);[c,r]=o[r2()*o.length|0]}else{r=Rm<=4?2:Rm<=15?3:4;c=Math.ceil(Rm/r)}
const vt=V&&r2()<.5,mx=V&&r2()<.5,my=V&&r2()<.5,bw=[400,440,480,520][df],bh=[250,290,320,340][df];
const cws=Array.from({length:c},()=>V?bw*(.85+.3*r2()):800/c),chs=Array.from({length:r},()=>V?bh*(.85+.3*r2()):500/r);
const xs=[0],ys=[0];cws.forEach((q,i)=>xs.push(xs[i]+q));chs.forEach((q,i)=>ys.push(ys[i]+q));const ww=xs[c],wh=ys[r];
const cell=i=>{let x,y;if(vt){x=i/r|0;y=x%2?r-1-i%r:i%r}else{y=i/c|0;x=y%2?c-1-i%c:i%c}return[mx?c-1-x:x,my?r-1-y:y]};
const at=new Map();for(let i=0;i<Rm;i++)at.set(cell(i).join(),i);
const RR=i=>{const[x,y]=cell(i);return[xs[x],ys[y],cws[x],chs[y]]},ctr=i=>{const q=RR(i);return[q[0]+q[2]/2,q[1]+q[3]/2]};
const ty=Array(G).fill('d');
let ps=G-1;const put=t=>{while(ps>=0&&ty[ps]!=='d')ps--;if(ps>=0){ty[ps]=t;ps-=2}};[...'l'.repeat(lvr)+'t'.repeat(tmr)].forEach(put);ps=G-2;[...'s'.repeat(spr)+'p'.repeat(por)].forEach(put);
const pt=[],sp=[],bl=[],ic=[],hz=[],w=[],d=[],f=[],m=[],v=[],p=[],GR=[],GC=[],GD=[],rooms=[];
for(let i=0;i<Rm;i++)rooms.push(RR(i));
for(let y=0;y<r;y++)for(let x=0;x<c;x++)for(const[ox,oy]of[[1,0],[0,1]]){
const X=x+ox,Y=y+oy;if(X>=c||Y>=r)continue;const a=at.get(x+','+y),b=at.get(X+','+Y);if(a==null&&b==null)continue;
const gt=a!=null&&b!=null&&Math.abs(a-b)===1?Math.min(a,b):-1,gf=V?.3+.4*r2():.5,sg=a<b?1:-1;
if(ox){const xb=xs[X]-8,y0=ys[y],h=chs[y],gy=y0+h*gf;if(gt<0)w.push([xb,y0,16,h]);else{w.push([xb,y0,16,gy-GW/2-y0],[xb,gy+GW/2,16,y0+h-gy-GW/2]);GR[gt]=[xb,gy-GW/2,16,GW];GC[gt]=[xb+8,gy];GD[gt]=[sg,0]}}
else{const yb=ys[Y]-8,x0=xs[x],cw2=cws[x],gx=x0+cw2*gf;if(gt<0)w.push([x0,yb,cw2,16]);else{w.push([x0,yb,gx-GW/2-x0,16],[gx+GW/2,yb,x0+cw2-gx-GW/2,16]);GR[gt]=[gx-GW/2,yb,GW,16];GC[gt]=[gx,yb+8];GD[gt]=[0,sg]}}}
const E=ctr(Rm-1),used=[ctr(0),E];let PL=120*Rm;
for(let k=0;k<G;k++){const a=ctr(k),b=ctr(k+1),e=GC[k],[ux,uy]=GD[k];PL+=Math.hypot(b[0]-a[0],b[1]-a[1]);used.push(e);
if(ty[k]==='s'){f.push(GR[k]);d.push([0,0,0,0]);const pd=[e[0]-ux*50,e[1]-uy*50];m.push([pd[0],pd[1],ux,uy,k]);used.push(pd)}else if(ty[k]==='p'){w.push(GR[k]);d.push([0,0,0,0]);const A=[e[0]-ux*50,e[1]-uy*50],B=[e[0]+ux*50,e[1]+uy*50];pt.push([A[0],A[1],B[0],B[1],k]);used.push(A,B)}else d.push(GR[k])}
const cand=[];ty.forEach((t,k)=>'dlt'.includes(t)&&cand.push(k));
const el=[...cand],hzs=(cnt,dd,fn,sh)=>{for(let j=0;j<cnt&&(sh?el.length:cand.length);j++){const k=sh?el[r2()*el.length|0]:cand.splice(r2()*cand.length|0,1)[0],e=GC[k],[ux,uy]=GD[k],[x0,y0,rw,rh]=RR(k);let a,b,c2,d2;if(ux){c2=dd;d2=170;a=ux>0?e[0]-8-dd:e[0]+8;b=e[1]-85}else{c2=170;d2=dd;b=uy>0?e[1]-8-dd:e[1]+8;a=e[0]-85}
const x1=Math.max(a,x0+8),y1=Math.max(b,y0+8),x2=Math.min(a+c2,x0+rw-8),y2=Math.min(b+d2,y0+rh-8),R2=[x1,y1,x2-x1,y2-y1];fn(R2,ux,uy);hz.push(R2)}};
hzs(sk,50,q=>sp.push([...q,r2()*120|0]));hzs(bt,90,(q,ux,uy)=>bl.push([...q,-ux,-uy]));hzs(icn,110,q=>ic.push(q),1);
if(V)for(let i=0;i<Rm;i++)if(r2()<.7){const[x0,y0,rw,rh]=RR(i),pw=44+r2()*20,ph=44+r2()*46;for(let t=0;t<30;t++){const x=x0+70+r2()*(rw-140-pw),y=y0+70+r2()*(rh-140-ph),qx=x+pw/2,qy=y+ph/2;if(used.every(u=>Math.hypot(u[0]-qx,u[1]-qy)>120)){w.push([x,y,pw,ph]);used.push([qx,qy]);break}}}
const pl=(i,gp)=>{const[x0,y0,rw,rh]=RR(i);let b;for(let t=0;t<80;t++){const x=x0+40+rd()*(rw-80),y=y0+40+rd()*(rh-80);b=[x,y];if(used.every(u=>Math.hypot(u[0]-x,u[1]-y)>(t<50?62:42))&&(!gp||Math.hypot(x-gp[0],y-gp[1])>80&&Math.hypot(x-gp[0],y-gp[1])<240)&&hz.every(h=>!(x>h[0]-30&&x<h[0]+h[2]+30&&y>h[1]-30&&y<h[1]+h[3]+30))&&(!V||w.every(([a,c,e,f])=>Math.hypot(x-Math.max(a,Math.min(x,a+e)),y-Math.max(c,Math.min(y,c+f)))>34)))break}used.push(b);return b};
const pg=[];ty.forEach((t,k)=>!'lt'.includes(t)&&pg.push(k));const cn=Array(G).fill(0);for(let i=0;i<n;i++)cn[pg[i%pg.length]]++;
for(let k=0;k<G;k++){for(let j=0;j<cn[k];j++){const q=pl(k);p.push([q[0],q[1],k])}if(ty[k]==='l'||ty[k]==='t'){const q=pl(k,ty[k]==='t'?GC[k]:0);v.push([q[0],q[1],k,ty[k]==='t'?300:0])}}
const dc=[];for(let i=0;i<Rm;i++){const[x0,y0,rw,rh]=RR(i),k=Math.max(2,rw*rh/42000|0);for(let j=0;j<k;j++)for(let t=0;t<20;t++){const x=x0+30+r2()*(rw-60),y=y0+40+r2()*(rh-60);if(used.every(u=>Math.hypot(u[0]-x,u[1]-y)>46)){dc.push([r2()<.6?0:1,x,y,.8+r2()*.6]);break}}}
dc.sort((a,b)=>a[2]-b[2]);const gp=[];for(let i=0;i<ww*wh/1800;i++)gp.push([r2()*ww,r2()*wh,r2()]);
return{dn:DN[df],ix,tot,n:TH[th][0],th,ne:n,ww,wh,dc,gp,t:Math.ceil(PL/192*FA[df]+4+3*lvr),s:ctr(0),p,w,d,f,m,v,rooms,x:[E[0]-35,E[1]-35,70,70],pt,sp,bl,ic,mk:(ty.includes('l')?'l':'')+(ty.includes('s')?'s':'')+(ty.includes('p')?'p':'')+(sp.length?'x':'')+(bl.length?'b':'')+(ty.includes('t')?'t':'')+(ic.length?'i':''),h:n+(n>1?' ecos.':' eco.')}}
const L=[];[4,0,1,2,3].forEach(df=>CF[df].forEach((c,ix)=>L.push(gen(df,ix+1,CF[df].length,c,(OF[df]+ix)*7919+13))));
const seen=new Set();L.forEach(l=>{l.nm=[...l.mk].find(c=>!seen.has(c))||'';[...l.mk].forEach(c=>seen.add(c));if(l.dn==='Tutorial')l.nm='u'});
const XL=L.length;L[XL]=null;const CO0=XL+1;
const CC=[[[3,1,0,0],[2,1,0,0],[3,1,1,0],[4,1,1,0],[3,1,0,0],[4,1,1,0],[5,1,2,0],[3,1,1,0],[5,1,2,0],[4,1,1,0]],
Array.from({length:20},(_,i)=>[4+(i/5|0),1,(i>5)+(i>12),1+(i>12),(i>9)+(i>16)]),
Array.from({length:15},(_,i)=>[4+(i/7|0),2,1+(i>6),1+(i>4),1+(i>8),0,1+(i>4)+(i>9),(i>6)+(i>10),(i>9)+(i>12)]),
[[7,2,1,2,1,1,2,1,1],[6,3,1,2,1,1,3,2,2],[7,2,1,2,2,1,3,2,2],[6,3,1,2,1,1,3,2,2],[8,2,1,2,2,1,3,2,2]]];
[0,1,2,3].forEach(df=>CC[df].forEach((c,ix)=>L.push(genCo(df,ix+1,CC[df].length,c,(OF[df]+ix)*6151+77))));
const CXL=L.length;L[CXL]=null;const LIC=[CO0,CO0+10,CO0+30,CO0+45],seenC=new Set();
for(let i=CO0;i<CXL;i++){const l=L[i];l.nm=[...l.mk].find(c=>!seenC.has(c))||'';[...l.mk].forEach(c=>seenC.add(c))}L[CO0].nm='c';
function selk(k){if(/^[1-9]$/.test(k))sel=+k-1;else if(k==='q'||k==='e')sel=Math.max(0,Math.min(L[lv].ne-1,sel+(k==='e'?1:-1)));else return 0;return 1}
const ci=(x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill()},rc=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)},tri=(x,y,w,h,c)=>{g.fillStyle=c;g.beginPath();g.moveTo(x-w/2,y);g.lineTo(x,y-h);g.lineTo(x+w/2,y);g.fill()};
const GB=['#3f8a3a','#241c46','#b8863d','#7fb3d0','#c2410c','#0a0a22','#b9a56a','#0a0a1c','#8a7d62','#8fb0b8'];
const GF=[
(x,y,v)=>{g.strokeStyle=v<.5?'#2f7a2c':'#5fbb4f';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x-2,y-7);g.moveTo(x,y);g.lineTo(x+3,y-6);g.stroke();if(v>.97)ci(x,y,3,'#ff9ec4')},
(x,y,v,t)=>{g.globalAlpha=v<.9?.5:.4+.4*Math.sin(t*3+x);rc(x,y,3+v*4,3,v<.9?'#3d3470':'#b39dff')},
(x,y,v)=>{g.strokeStyle='rgba(255,230,170,.3)';g.lineWidth=2;g.beginPath();g.arc(x,y,6+v*10,.2,2.6);g.stroke()},
(x,y,v)=>{g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=1.5;g.beginPath();g.moveTo(x,y);g.lineTo(x+8+v*10,y+4-v*8);g.lineTo(x+14+v*14,y+2);g.stroke()},
(x,y,v,t)=>{g.globalAlpha=.6;ci(x,y,4+3*Math.sin(t*2+x*.1)+v*6,v<.5?'#ff9d3c':'#ffd27a')},
(x,y,v,t)=>{g.globalAlpha=.25+.3*Math.sin(t*2+y);rc(x,y,2,2,v<.5?'#ff4fd8':'#4fd8ff')},
(x,y,v,t)=>{g.strokeStyle='rgba(190,255,245,.25)';g.lineWidth=1.5;g.beginPath();g.arc(x,y,8+v*8+Math.sin(t+x)*2,0,3.2);g.stroke()},
(x,y,v,t)=>{g.globalAlpha=.3+.6*Math.abs(Math.sin(t*2+x));rc(x,y,1+v*2,1+v*2,'#fff')},
(x,y,v)=>rc(x,y,10+v*14,6,'rgba(0,0,0,.14)'),
(x,y)=>rc(x,y,2,2,'rgba(255,255,255,.3)')];
const DR=[
[(x,y,s)=>{rc(x-5*s,y-8*s,10*s,24*s,'#5a3b22');ci(x,y-26*s,20*s,'#2f8f4e');ci(x-14*s,y-14*s,14*s,'#37a45a');ci(x+14*s,y-14*s,14*s,'#2a7d44')},(x,y,s)=>{ci(x,y,12*s,'#2d7a38');ci(x-11*s,y+3*s,9*s,'#3d9a48');ci(x+11*s,y+3*s,9*s,'#3d9a48');ci(x+4*s,y-4*s,3*s,'#e85d75')}],
[(x,y,s)=>{g.shadowColor='#b39dff';g.shadowBlur=12;tri(x,y,16*s,34*s,'#b39dff');tri(x+10*s,y,10*s,20*s,'#8a6bff');g.shadowBlur=0},(x,y,s)=>{tri(x,y,20*s,26*s,'#4a3f7a');tri(x+9*s,y,12*s,16*s,'#5d5094')}],
[(x,y,s)=>{rc(x-5*s,y-28*s,10*s,32*s,'#3f8a3a');rc(x-15*s,y-18*s,10*s,5*s,'#3f8a3a');rc(x-15*s,y-26*s,5*s,13*s,'#3f8a3a');rc(x+5*s,y-14*s,10*s,5*s,'#3f8a3a');rc(x+10*s,y-22*s,5*s,13*s,'#3f8a3a')},(x,y,s)=>{ci(x,y,11*s,'#8a6532');ci(x+12*s,y+3*s,7*s,'#9b7440')}],
[(x,y,s)=>{g.shadowColor='#e3f6ff';g.shadowBlur=10;tri(x,y,18*s,36*s,'#cdeeff');tri(x-9*s,y,10*s,20*s,'#9fd6f2');g.shadowBlur=0},(x,y,s)=>{ci(x,y,14*s,'#f2fbff');ci(x+10*s,y+4*s,9*s,'#e3f6ff')}],
[(x,y,s)=>{tri(x,y,24*s,24*s,'#3a1a14');tri(x+10*s,y,14*s,15*s,'#4d241a')},(x,y,s)=>{ci(x,y,12*s,'#1b0a0a');g.shadowColor='#ff7a3d';g.shadowBlur=16;ci(x,y,7*s,'#ff7a3d');g.shadowBlur=0}],
[(x,y,s)=>{g.shadowColor='#ff4fd8';g.shadowBlur=14;rc(x-4*s,y-30*s,8*s,34*s,'#ff4fd8');g.shadowBlur=0;rc(x-2*s,y-30*s,4*s,34*s,'#fff')},(x,y,s)=>{g.strokeStyle='#4fd8ff';g.lineWidth=3*s;g.shadowColor='#4fd8ff';g.shadowBlur=12;g.beginPath();g.arc(x,y-10*s,12*s,0,7);g.stroke();g.shadowBlur=0}],
[(x,y,s)=>{g.strokeStyle='#ff7aa8';g.lineWidth=5*s;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-22*s);g.moveTo(x,y-10*s);g.lineTo(x-10*s,y-22*s);g.moveTo(x,y-14*s);g.lineTo(x+10*s,y-26*s);g.stroke()},(x,y,s)=>{g.strokeStyle='#2fbf71';g.lineWidth=4*s;g.beginPath();g.moveTo(x,y);g.bezierCurveTo(x-10*s,y-14*s,x+10*s,y-26*s,x,y-38*s);g.stroke()}],
[(x,y,s)=>{ci(x,y-14*s,18*s,'#7a6bd1');ci(x-6*s,y-18*s,6*s,'#9a8be8');g.strokeStyle='#cfc8ff';g.lineWidth=2*s;g.beginPath();g.ellipse(x,y-14*s,28*s,7*s,-.3,0,7);g.stroke()},(x,y,s)=>{ci(x,y,11*s,'#555578');ci(x+4*s,y-3*s,4*s,'#6c6c92')}],
[(x,y,s)=>{rc(x-9*s,y-30*s,18*s,34*s,'#b8ab8a');rc(x-12*s,y-34*s,24*s,6*s,'#cfc2a0');rc(x-12*s,y+2*s,24*s,5*s,'#a2967a')},(x,y,s)=>{rc(x-9*s,y-14*s,18*s,18*s,'#a2967a');tri(x-9*s,y-14*s,12*s,8*s,'#a2967a');rc(x+10*s,y-2*s,12*s,6*s,'#8d826a')}],
[(x,y,s)=>{rc(x-16*s,y-10*s,32*s,6*s,'#cfdde2');rc(x-14*s,y-4*s,4*s,14*s,'#8aa0a8');rc(x+10*s,y-4*s,4*s,14*s,'#8aa0a8');tri(x-6*s,y-10*s,10*s,16*s,'#7dffb2');rc(x+3*s,y-18*s,8*s,8*s,'#5fb4f2')},(x,y,s)=>{rc(x-14*s,y-26*s,28*s,20*s,'#0a1518');rc(x-11*s,y-23*s,22*s,14*s,'#7dffb2');rc(x-3*s,y-6*s,6*s,8*s,'#8aa0a8');rc(x-10*s,y+2*s,20*s,3*s,'#8aa0a8')}]];
function bg(){const q=L[lv],T=TH[q.th],th=q.th,t=performance.now()/1000;
const cm=co&&myFin&&rp?rp:[px,py],tx=Math.max(0,Math.min(q.ww-W,cm[0]-W/2)),ty=Math.max(0,Math.min(q.wh-H,cm[1]-H/2));if(cs){cx=tx;cy=ty;cs=0}cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;
const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,T[1]);gr.addColorStop(1,T[2]);g.fillStyle=gr;g.fillRect(0,0,W,H);
const z=mv?Math.min(W/q.ww,H/q.wh,1):1;CW=W/z;CH=H/z;vx=mv?-(CW-q.ww)/2:Math.round(cx);vy=mv?-(CH-q.wh)/2:Math.round(cy);g.save();if(shk>.5){g.translate((Math.random()-.5)*shk,(Math.random()-.5)*shk);shk*=.9}g.scale(z,z);g.translate(-vx,-vy);
rc(0,0,q.ww,q.wh,GB[th]);
if(th===5||th===8||th===9){g.strokeStyle=th===5?'rgba(255,79,216,.18)':'rgba(0,0,0,.12)';g.lineWidth=1;const st=th===9?50:th===8?90:70;g.beginPath();for(let i=0;i<q.ww;i+=st){g.moveTo(i,0);g.lineTo(i,q.wh)}for(let i=0;i<q.wh;i+=st){g.moveTo(0,i);g.lineTo(q.ww,i)}g.stroke()}
const gf=GF[th];for(const[x,y,v]of q.gp){if(x<vx-30||x>vx+CW+30||y<vy-30||y>vy+CH+30)continue;g.globalAlpha=1;gf(x,y,v,t)}g.globalAlpha=1;
q.rooms.forEach(([x,y,w,h])=>{g.fillStyle=th===4?'#2b1411':T[3];g.globalAlpha=th===4?.96:.55;g.fillRect(x,y,w,h);g.globalAlpha=.4;g.strokeStyle=th===4?'#ff9d3c':T[5];g.lineWidth=2;g.strokeRect(x,y,w,h)});g.globalAlpha=1;
const dr=DR[th];for(const[k,x,y,s]of q.dc){if(x<vx-50||x>vx+CW+50||y<vy-20||y>vy+CH+70)continue;dr[k](x,y,s)}
g.fillStyle=T[5];for(let i=0;i<30;i++){g.globalAlpha=.2+.25*Math.sin(t*2+i);g.beginPath();g.arc(vx+(i*131+Math.sin(t+i)*14+800)%CW,vy+(((i*79+t*T[6]*60*(1+i%3))%CH)+CH)%CH,1+i%3,0,7);g.fill()}g.globalAlpha=1}
const INFO={u:['Como jogar',['Mova-se com as setas ou WASD.','Pise no botão colorido e aperte Enter: a rodada vira um eco','que repete seus movimentos e segura o botão para você.','Atravesse a porta e chegue à saída verde.','1 a 9 ou Q/E escolhem um eco, Backspace apaga o eco escolhido.','R reinicia a rodada. P ou Esc pausam o jogo.']],
l:['Alavanca',['Toque na alavanca: ela fica ligada para sempre.','Abre a porta da mesma cor, sem ninguém segurando nada.']],
s:['Mola',['A mola só funciona com o botão da mesma cor pressionado.','Pise nela para ser lançado por cima da grade.','Peça a um eco para segurar o botão.']],
p:['Portal',['O portal atravessa o muro até a sala seguinte.','Só funciona com o botão da mesma cor pressionado.','Pise no anel de entrada para ser transportado.']],
x:['Espinhos',['Os espinhos sobem e descem em ciclos.','Quando ficarem laranja, vão subir: espere.','Se encostar neles, a rodada recomeça. Ecos não são afetados.']],
b:['Esteira',['A esteira empurra você para trás.','Corra contra ela para chegar à porta.']],
t:['Alavanca temporizada',['Ela liga a porta só por alguns segundos.','Toque e corra para passar antes que apague.']],i:['Gelo',['O chão de gelo é escorregadio: você desliza e demora para parar.','Planeje a parada antes dos espinhos e das portas.']],c:['Cooperação',['Cada jogador tem a sua própria pista e os seus próprios ecos.','Os botões de uma pista abrem as portas da pista do parceiro.','Seus ecos seguram botões para o parceiro, e os dele para você.','Quando os dois chegam à sua saída, a fase termina.']]};
function drawInfo(){if(state!=='info')return;const nm=L[lv].nm,[T,ls]=INFO[nm];g.fillStyle='rgba(6,12,18,.94)';g.fillRect(0,0,W,H);
txt(nm==='u'?T:'Nova mecânica',W/2,80,36,800,'#ffd166','center');if(nm!=='u')txt(T,W/2,125,28,800,'#dbe7ee','center');
ls.forEach((x,i)=>txt(x,W/2,185+i*32,18,500,'#dbe7ee','center'));txt('Espaço: começar',W/2,H-36,18,800,'#ffd166','center')}
function drawDone(){if(state!=='done')return;const t=performance.now()/1000,q=L[lv];g.fillStyle='rgba(6,12,18,.9)';g.fillRect(0,0,W,H);
for(let i=0;i<40;i++){g.fillStyle='hsl('+(i*41+t*60)%360+' 85% 62%)';g.fillRect((i*127+Math.sin(t+i)*30+800)%W,((i*71+t*(40+i%5*14))%(H+20))-10,6,10)}
txt('PARABÉNS!',W/2,130,64,800,'#ffd166','center');txt('Você concluiu a dificuldade '+q.dn+'.',W/2,185,24,800,'#dbe7ee','center');
txt('Espaço ou Enter: avançar para '+L[lv+1].dn,W/2,290,20,800,'#5fd3a1','center');txt('Esc: voltar ao menu principal',W/2,330,18,500,'#9fb4c1','center')}
function finale(){state='end';[523,659,784,1047,784,1047,1319,1568].forEach((f,i)=>sfx(f,.6,'triangle',.16,i*.16));[262,330,392].forEach(f=>sfx(f,2,'sine',.14,1.3))}
function drawEnd(){if(state!=='end')return;const t=performance.now()/1000,gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#1a0f3a');gr.addColorStop(1,'#0b2a3a');g.fillStyle=gr;g.fillRect(0,0,W,H);
for(let i=0;i<70;i++){g.fillStyle='hsl('+(i*37+t*60)%360+' 85% 62%)';g.globalAlpha=.85;g.fillRect((i*113+Math.sin(t+i)*30+800)%W,((i*67+t*(40+i%5*14))%(H+20))-10,6,10)}g.globalAlpha=1;
chr(W/2,300+Math.sin(t*3)*6,'#ffd166',1,[1,0],[0,0],1);
txt('PARABÉNS!',W/2,130,72,800,'#ffd166','center');txt('Você completou todas as fases do ECO.',W/2,180,22,500,'#dbe7ee','center');txt('Criado por Eduardo Zimmermann',W/2,380,20,800,'#dbe7ee','center');txt('Espaço: voltar ao menu',W/2,440,18,500,'#9fb4c1','center')}
let tm=false,jv=0,jx=0,jy=0,jp=-1,jo=[0,0];
const TB=[['eco',710,410,44,'ECO'],['r',620,445,28,'↺'],['del',620,375,28,'⌫'],['pv',545,445,28,'‹'],['nx',545,375,28,'›'],['map',475,445,26,'V']],KT={eco:'Enter',r:'r',del:'Backspace',pv:'q',nx:'e',d:'d',go:' ',esc:'Escape',map:'v'};
function tact(k){for(const t of['keydown','keyup'])dispatchEvent(new KeyboardEvent(t,{key:KT[k]}))}
function tdown(e){if(e.pointerType==='mouse')return;tm=true;const[x,y]=mpos(e);
if(state==='play'||state==='ready'){for(const[k,bx,by,r]of TB)if((x-bx)**2+(y-by)**2<(r+10)**2){tact(k);return}if(x<480&&y>70&&jp<0){jp=e.pointerId;jo=[x,y];jx=jy=0;jv=0;cv.setPointerCapture(e.pointerId)}}
else if(state==='fail')tact(x<W/2?'eco':'d');else if(state==='done')tact(y>380?'esc':'go');else if(state==='win'||state==='end')tact('go')}
function tmove(e){if(e.pointerId!==jp)return;const[x,y]=mpos(e),dx=x-jo[0],dy=y-jo[1],m=Math.hypot(dx,dy),c=Math.min(1,m/60);jv=m>14?1:0;jx=m?dx/m*c:0;jy=m?dy/m*c:0}
function tup(e){if(e.pointerId===jp){jp=-1;jv=0;jx=jy=0}}
cv.addEventListener('pointerdown',tdown);cv.addEventListener('pointermove',tmove);cv.addEventListener('pointerup',tup);cv.addEventListener('pointercancel',tup);cv.addEventListener('contextmenu',e=>e.preventDefault());
function touchUI(){if(!tm)return;
if(state==='play'||state==='ready'){g.globalAlpha=.6;g.lineWidth=3;
TB.forEach(([k,x,y,r,l])=>{g.fillStyle='rgba(10,20,30,.6)';g.strokeStyle='#dbe7ee';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();txt(l,x,y+(r>30?8:7),r>30?20:22,800,'#fff','center')});
if(jp>=0){g.strokeStyle='#dbe7ee';g.beginPath();g.arc(jo[0],jo[1],60,0,7);g.stroke();g.fillStyle='#ffd166';g.beginPath();g.arc(jo[0]+jx*60,jo[1]+jy*60,24,0,7);g.fill()}
else{g.strokeStyle='rgba(255,255,255,.4)';g.beginPath();g.arc(110,400,60,0,7);g.stroke()}g.globalAlpha=1}
else if(state==='fail')[[130,'GUARDAR ECO'],[420,'DESCARTAR']].forEach(([x,l])=>{g.fillStyle='rgba(95,211,161,.22)';g.fillRect(x,330,250,70);g.strokeStyle='#dbe7ee';g.lineWidth=2;g.strokeRect(x,330,250,70);txt(l,x+125,373,20,800,'#fff','center')});
else if(state==='win'||state==='end')txt('Toque na tela para continuar',W/2,H-24,16,500,'#ffd166','center');
else if(state==='done')txt('Toque para avançar. Toque na parte de baixo para voltar ao menu.',W/2,H-24,16,500,'#ffd166','center')}
const COLS=[['Dourado','#ffd166',0],['Menta','#5fd3a1',5],['Rosa','#ff7aa8',10],['Azul','#5fb4f2',15],['Roxo','#b58cf2',20],['Laranja','#ff9d3c',28],['Turquesa','#3fe0d0',36],['Vermelho','#ff5a5a',46],['Neve','#dff3ff',56],['Sombra','#8b8bb0',66],['Lima','#b6f23c',78],['Arco-íris','rb',90]];
const HATS=[['Antena',0,0],['Coroa',1,6],['Laço',2,12],['Boné',3,18],['Chifres',4,24],['Auréola',5,32],['Cartola',6,42],['Chapéu de bruxa',7,52],['Óculos de sol',8,62],['Fones de ouvido',9,72],['Bigode',10,84],['Gorro de gelo',11,100]];
const SKC=(i=SV.col)=>{const c=COLS[i][1];return c==='rb'?'hsl('+(performance.now()/10%360)+' 80% 62%)':c},TS=()=>Object.values(SV.d).reduce((a,b)=>a+b,0);
function cyc(m,d){const a=m.k==='col'?COLS:HATS;pv[m.k]=(pv[m.k]+d+a.length)%a.length;if(TS()>=a[pv[m.k]][2]){SV[m.k]=pv[m.k];sv()}sfx(520,.08,'sine',.1)}
const vib=m=>{try{S.vib&&!dmQ&&navigator.vibrate&&navigator.vibrate(m)}catch(e){}};
let ip=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();ip=e});
function fs(){try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch(e){}}
function burst(x,y,c,n){for(let i=0;i<n;i++){const a=Math.random()*6.28,v=1+Math.random()*3;PS.push([x,y,Math.cos(a)*v,Math.sin(a)*v,30+Math.random()*20,c])}}
function drawPS(){PS=PS.filter(p=>p[4]>0);for(const p of PS){p[0]+=p[2];p[1]+=p[3];p[2]*=.96;p[3]*=.96;p[4]--;g.globalAlpha=Math.min(1,p[4]/20);ci(p[0],p[1],3,p[5])}g.globalAlpha=1}
function fxs(){const q=L[lv],pl=state==='play';if(pl){pr.forEach((v,i)=>{if(v&&!ppr[i])sfx(700,.06,'square',.06)});
for(let k=0;k<q.d.length;k++)if(op[k]&&!pop[k]&&q.d[k][2]){sfx(330,.15,'triangle',.12);sfx(494,.2,'triangle',.1,.08);burst(q.d[k][0]+q.d[k][2]/2,q.d[k][1]+q.d[k][3]/2,DC[k],14)}
q.v.forEach((l,i)=>{if(lat[i]&&!plat[i])sfx(250,.12,'sawtooth',.08)})}ppr=pr.slice();pop=op.slice();plat=lat.slice()}
function hat(t,col){g.lineWidth=2;
if(t===0){g.strokeStyle=col;g.beginPath();g.moveTo(0,-R-1);g.lineTo(0,-R-8);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(0,-R-10,3,0,7);g.fill()}
else if(t===1){g.fillStyle='#ffd166';g.beginPath();g.moveTo(-9,-R+1);g.lineTo(-9,-R-9);g.lineTo(-4,-R-4);g.lineTo(0,-R-11);g.lineTo(4,-R-4);g.lineTo(9,-R-9);g.lineTo(9,-R+1);g.fill()}
else if(t===2){g.fillStyle='#ff4f8b';g.beginPath();g.moveTo(0,-R-3);g.lineTo(-10,-R-10);g.lineTo(-10,-R+2);g.moveTo(0,-R-3);g.lineTo(10,-R-10);g.lineTo(10,-R+2);g.fill()}
else if(t===3){g.fillStyle='#e0566b';g.beginPath();g.arc(0,-R+1,10,Math.PI,0);g.fill();g.fillRect(0,-R-1,14,3)}
else if(t===4){g.fillStyle='#e0566b';for(const q of[-1,1]){g.beginPath();g.moveTo(q*10,-R+3);g.lineTo(q*7,-R-9);g.lineTo(q*3,-R);g.fill()}}
else if(t===5){g.strokeStyle='#ffe27a';g.shadowColor='#ffe27a';g.shadowBlur=8;g.beginPath();g.ellipse(0,-R-7,10,3,0,0,7);g.stroke();g.shadowBlur=0}
else if(t===6){g.fillStyle='#1b1b2a';g.fillRect(-8,-R-15,16,14);g.fillRect(-12,-R-2,24,4);g.fillStyle='#e0566b';g.fillRect(-8,-R-6,16,3)}
else if(t===7){g.fillStyle='#5b3b8a';g.beginPath();g.moveTo(-14,-R+1);g.lineTo(14,-R+1);g.lineTo(3,-R-3);g.lineTo(5,-R-20);g.lineTo(-4,-R-3);g.closePath();g.fill();g.fillStyle='#ffd166';g.fillRect(-5,-R-4,9,3)}
else if(t===8){g.fillStyle='#10202b';g.fillRect(-11,-8,10,6);g.fillRect(1,-8,10,6);g.fillRect(-2,-7,4,2);g.fillStyle='rgba(255,255,255,.5)';g.fillRect(-9,-7,3,2);g.fillRect(3,-7,3,2)}
else if(t===9){g.strokeStyle='#2a2a3a';g.lineWidth=3;g.beginPath();g.arc(0,-2,R+1,Math.PI,0);g.stroke();g.fillStyle='#e0566b';g.fillRect(-R-4,-6,6,11);g.fillRect(R-2,-6,6,11)}
else if(t===10){g.fillStyle='#3a2a1a';g.beginPath();g.ellipse(-4,4,5,2.5,.3,0,7);g.ellipse(4,4,5,2.5,-.3,0,7);g.fill()}
else{g.fillStyle='#6fc3ff';g.beginPath();g.arc(0,-R+2,R-1,Math.PI,0);g.fill();g.fillStyle='#e8f6ff';g.fillRect(-R+1,-R-1,2*R-2,3);g.beginPath();g.arc(0,-R-6,4,0,7);g.fill()}}
function sym(x,y,k,s){g.fillStyle='#fff';g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();const t=k%6;
if(t===0)g.arc(x,y,s*.6,0,7);else if(t===1)g.rect(x-s*.55,y-s*.55,s*1.1,s*1.1);
else if(t===2){g.moveTo(x,y-s*.7);g.lineTo(x+s*.7,y+s*.55);g.lineTo(x-s*.7,y+s*.55);g.closePath()}
else if(t===3){g.moveTo(x,y-s*.75);g.lineTo(x+s*.75,y);g.lineTo(x,y+s*.75);g.lineTo(x-s*.75,y);g.closePath()}
else if(t===4){g.moveTo(x-s*.7,y);g.lineTo(x+s*.7,y);g.moveTo(x,y-s*.7);g.lineTo(x,y+s*.7)}
else{g.moveTo(x-s*.6,y-s*.6);g.lineTo(x+s*.6,y+s*.6);g.moveTo(x+s*.6,y-s*.6);g.lineTo(x-s*.6,y+s*.6)}
t<4?g.fill():g.stroke()}
function syms(q){q.p.forEach(([a,b,k])=>sym(a,b,k,8));q.d.forEach(([a,b,c,d],k)=>{if(c)sym(a+c/2,b+d/2,k,7)});q.m.forEach(([a,b,,,k])=>sym(a,b,k,7));q.pt.forEach(([a,b,c,d,k])=>{sym(a,b,k,7);sym(c,d,k,7)});q.v.forEach(([a,b,k])=>sym(a,b+8,k,5))}
const rg=(a,n)=>{let o=0;for(let i=a;i<a+n;i++)if(SV.d[i])o++;return o};
const ACH=[['Primeiro Eco','Conclua uma fase',()=>Object.keys(SV.d).length>0],['Aquecimento Concluído','Conclua o modo Fácil',()=>rg(1,10)===10],['Veterano dos Ecos','Conclua o modo Médio',()=>rg(11,20)===20],['Mente Brilhante','Conclua o modo Difícil',()=>rg(31,15)===15],['Eco Eterno','Conclua o modo Extremo',()=>rg(46,5)===5],['Perfeccionista','Ganhe 3 estrelas em 10 fases',()=>Object.values(SV.d).filter(v=>v===3).length>=10],['Caçador de Estrelas','Junte 50 estrelas',()=>TS()>=50],['Maratonista Infinito','Chegue à onda 5 do modo infinito',()=>SV.w>=5],['Desafiante do Dia','Conclua a fase do dia',()=>!!SV.dy],['Dupla Dinâmica','Conclua uma fase no modo online',()=>!!SV.co]];
function chk(){ACH.forEach(([n,,f],i)=>{if(!SV.a.includes(i)&&f()){SV.a.push(i);toast=[n,performance.now()+3500];sfx(660,.2,'triangle',.14);sfx(990,.3,'triangle',.14,.12)}});sv()}
function onWin(){if(dmQ)return;const q=L[lv];const n2=q.ne;ls=round<=n2+1?3:round<=n2+3?2:1;if(co)SV.co=1;if(lv!==XL&&lv!==CXL)SV.d[lv]=Math.max(SV.d[lv]||0,ls);else if(q.dn==='Infinito'){if(co)SV.wc=(SV.wc||0)+1;else SV.w=(SV.w||0)+1}else SV.dy=1;burst(q.x[0]+35,q.x[1]+35,'#5fd3a1',40);shk=10;vib([60,40,120]);chk()}
function drawToast(){if(!toast||performance.now()>toast[1])return;g.fillStyle='rgba(10,20,30,.92)';g.fillRect(W/2-190,70,380,44);g.strokeStyle='#ffd166';g.lineWidth=2;g.strokeRect(W/2-190,70,380,44);txt('★ Conquista: '+toast[0],W/2,98,18,800,'#ffd166','center')}
function drawAch(){if(state!=='ach')return;g.fillStyle='rgba(6,12,18,.85)';g.fillRect(0,0,W,H);drawDeco();txt('Conquistas',W/2,60,38,800,'#ffd166','center');ACH.forEach(([n,d],i)=>{const y=110+i*38,ok=SV.a.includes(i);txt((ok?'★ ':'☆ ')+n,90,y,19,800,ok?'#ffd166':'#6f8794');txt(d,360,y,16,500,ok?'#dbe7ee':'#6f8794')});txt('Estrelas: '+TS()+'   Esc: voltar',W/2,H-24,16,500,'#9fb4c1','center')}
function drawLsel(){if(state!=='lsel')return;const n=DS[dsel],b=(co?LIC:LI)[dsel];g.fillStyle='rgba(6,12,18,.85)';g.fillRect(0,0,W,H);drawDeco();txt(DN[dsel],W/2,60,38,800,'#ffd166','center');txt('Escolha a fase',W/2,88,16,500,'#9fb4c1','center');
for(let i=0;i<n;i++){const x=90+(i%5)*125,y=110+(i/5|0)*88,s=SV.d[b+i]||0,f=i===fi;const hv=HV[i]=(HV[i]||0)+((f?1:0)-(HV[i]||0))*.22;g.fillStyle=mixc('#14232d','#305061',hv);g.fillRect(x,y-hv*4,110,76);if(hv>.05){g.strokeStyle='rgba(255,209,102,'+hv+')';g.lineWidth=2;g.strokeRect(x,y-hv*4,110,76)}txt(''+(i+1),x+55,y+38,26,800,s?'#dbe7ee':'#8aa0ae','center');txt('★'.repeat(s)+'☆'.repeat(3-s),x+55,y+62,16,500,'#ffd166','center')}}
function lclick(x,y){const n=DS[dsel];for(let i=0;i<n;i++){const X=90+(i%5)*125,Y=110+(i/5|0)*88;if(x>=X&&x<=X+110&&y>=Y&&y<=Y+76){newLevel((co?LIC:LI)[dsel]+i);return}}if(y>H-40)sw('diff')}
function xKey(k){if(k==='escape'){sw(state==='lsel'?'diff':'menu');return}if(state==='ach'){if(k==='enter'||k===' ')sw('menu');return}const n=DS[dsel],m={arrowleft:-1,a:-1,arrowright:1,d:1,arrowup:-5,w:-5,arrowdown:5,s:5}[k];if(m)fi=Math.max(0,Math.min(n-1,fi+m));else if(k==='enter'||k===' ')newLevel((co?LIC:LI)[dsel]+fi)}
function okLv(l){const S=10,gw=Math.ceil(l.ww/S),gh=Math.ceil(l.wh/S),bk=new Uint8Array(gw*gh),sn=new Uint8Array(gw*gh),cl=([x,y])=>(x/S|0)+gw*(y/S|0);
for(let gy=0;gy<gh;gy++)for(let gx=0;gx<gw;gx++){const x=gx*S+5,y=gy*S+5;let b=x<14||y<14||x>l.ww-14||y>l.wh-14;if(!b)for(const[a,c,e,f]of l.w)if((x-Math.max(a,Math.min(x,a+e)))**2+(y-Math.max(c,Math.min(y,c+f)))**2<225){b=1;break}bk[gy*gw+gx]=b?1:0}
const fl=st=>{while(st.length){const u=st.pop(),x=u%gw,y=(u-x)/gw;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+a,Y=y+b;if(X<0||Y<0||X>=gw||Y>=gh)continue;const v=Y*gw+X;if(!sn[v]&&!bk[v]){sn[v]=1;st.push(v)}}}};
sn[cl(l.s)]=1;fl([cl(l.s)]);if(l.s2){sn[cl(l.s2)]=1;fl([cl(l.s2)])}for(let i=0;i<9;i++)for(const[a,b,c,d]of l.pt)if(sn[cl([a,b])]&&!sn[cl([c,d])]){sn[cl([c,d])]=1;fl([cl([c,d])])}
return[...l.p,...l.v,[l.x[0]+35,l.x[1]+35],...(l.x2?[[l.x2[0]+35,l.x2[1]+35]]:[]),...l.pt.map(q=>[q[2],q[3]])].every(q=>sn[cl(q)])}
function mkX(kind){const dl=kind==='d',w=SV.w||0,d=new Date(),sd=dl?d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate():Date.now()%1e6,df=dl?2:Math.min(3,1+(w/4|0)),
cfg=dl?[8+sd%4,2,2,2,1,0,2,1,1]:[Math.min(20,4+w),2+(w%3?0:1),1+(w>3)+(w>8),1+(w>2),(w>1)+(w>6),(w>10)+(w>15),(w>0)+(w>5)+(w>12),(w>4)+(w>9),(w>7)+(w>13)];
for(let t=0;t<8;t++){const l=gen(df,1+t,1,cfg,sd+t*131);if(okLv(l)||t===7){l.dn=dl?'Diária':'Infinito';l.ix=dl?1:w+1;l.tot=dl?1:'∞';l.nm='';L[XL]=l;return}}}
function xnext(){if(L[lv].dn==='Infinito'){if(co)hostX('i');else{mkX('i');newLevel(XL)}}else goMenu()}
const LANGS=['English','Português','Español','Italiano','Deutsch'];
function setLang(i){S.lang=i;lgo=0;vol();capt()}
function capt(){try{const e=document.querySelector('p');e.textContent=TR('Clique na tela se as teclas não responderem. No celular, use o modo paisagem (deitado).');document.documentElement.lang=['en','pt-BR','es','it','de'][S.lang]}catch(e){}}
const send=o=>{try{net&&net.open&&net.send(JSON.stringify(o))}catch(e){}};
function loadPeer(cb){if(window.Peer)return cb();const t=document.createElement('script');t.src='https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js';t.onload=cb;t.onerror=()=>netErr('Não foi possível carregar o modo online.');document.head.appendChild(t)}
function netErr(m){netMsg=m;co=0;host=0;rp=null;try{net&&net.close();peer&&peer.destroy()}catch(e){}net=null;peer=null;sw('net')}
function leaveCo(){try{net&&net.close();peer&&peer.destroy()}catch(e){}co=0;host=0;rp=null;net=null;peer=null;goMenu()}
function link(){co=1;send({t:'hi',c:SV.col,h:SV.hat});sw(host?'diff':'gwait')}
function hostRoom(){netMsg='';loadPeer(()=>{code=Array.from({length:5},()=>'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.random()*31|0]).join('');host=1;sw('wait');peer=new Peer('eco-'+code);
peer.on('connection',c=>{if(net)return;net=c;c.on('open',link);c.on('data',onNet);c.on('close',()=>netErr('A conexão foi encerrada.'))});
peer.on('error',e=>netErr(e.type==='unavailable-id'?'Código em uso. Tente de novo.':'Servidor online indisponível neste ambiente.'))})}
function joinRoom(c){netMsg='';loadPeer(()=>{host=0;code=c;sw('wait');peer=new Peer();
peer.on('open',()=>{net=peer.connect('eco-'+c,{reliable:true});net.on('open',link);net.on('data',onNet);net.on('close',()=>netErr('A conexão foi encerrada.'))});
peer.on('error',e=>netErr(e.type==='peer-unavailable'?'Sala não encontrada.':'Servidor online indisponível neste ambiente.'))})}
function askCode(){const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:9';
d.innerHTML='<div style="background:#14232d;padding:20px;border-radius:10px;color:#fff;text-align:center;font:18px sans-serif"><div>'+TR('Digite o código da sala')+'</div><input maxlength=5 style="font:28px monospace;text-transform:uppercase;width:7em;text-align:center;margin:12px"><br><button style="font:18px sans-serif;padding:6px 18px">OK</button></div>';
document.body.appendChild(d);const i=d.querySelector('input'),b=d.querySelector('button'),ok=()=>{const v=i.value.trim().toUpperCase();d.remove();if(v)joinRoom(v)};b.onclick=ok;i.focus();i.onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')ok();if(e.key==='Escape')d.remove()}}
function onNet(m){try{m=JSON.parse(m)}catch(e){return}
if(m.t==='hi'){rcol=m.c;rhat=m.h}else if(m.t==='x')mkXC(m.k,m.sd,m.w);else if(m.t==='lv'){inMsg=1;newLevel(m.i);inMsg=0}else if(m.t==='menu')sw('gwait');
else if(m.t==='p'){rpp=rp;rp=[m.x,m.y]}else if(m.t==='fin'){thFin=m.k;thRec=m.r;rp=null;chkRound()}else if(m.t==='rdy'){rdyTh=1;chkGo()}}
function coInit(){myFin=thFin=0;myRec=[];thRec=[];rdyMe=rdyTh=0;rp=null;cdn=0}
function coReady(){rdyMe=1;send({t:'rdy'});chkGo()}
function chkGo(){if(co&&rdyMe&&rdyTh&&state==='ready'){state='cd';cdn=180;rdyMe=rdyTh=0}}
function coFin(k){myRec=rec.map(p=>[+p[0].toFixed(1),+p[1].toFixed(1)]);if(!myRec.length)myRec.push([px,py]);myFin=k;send({t:'fin',k,r:myRec});if(k==='x'){fan();burst(px,py,'#5fd3a1',30)}else{echoSfx();burst(px,py,'#fff',24)}vib(40);chkRound()}
function chkRound(){if(!myFin||!thFin)return;const A=host?[myFin,myRec]:[thFin,thRec],B=host?[thFin,thRec]:[myFin,myRec];
if(myFin==='x'&&thFin==='x'){state='win';fan();onWin();return}
if(myFin==='s')ecos.push(myRec);if(thFin==='s'&&thRec.length)oecos.push(thRec);while(ecos.length>L[lv].ne)ecos.shift();while(oecos.length>L[lv].ne)oecos.shift();round++;sel=-1;reset();myFin=thFin=0;myRec=[];thRec=[];rp=null;coReady()}
function drawCo(){if(!co)return;if(state==='cd')txt(''+Math.ceil(cdn/60),W/2,H/2+30,110,800,'#ffd166','center');
if(state==='play'&&myFin&&!thFin)txt('Modo espectador: assistindo o outro jogador',W/2,100,20,800,'#ffd166','center');
if(state==='win'&&!host)txt('Aguardando o anfitrião...',W/2,H-60,18,800,'#ffd166','center')}
const EN=`Jogar online=Play online=Jugar en línea=Gioca online=Online spielen
Jogar=Play=Jugar=Gioca=Spielen
Conquistas=Achievements=Logros=Obiettivi=Erfolge
Personagens=Characters=Personajes=Personaggi=Figuren
Configurações=Settings=Ajustes=Impostazioni=Einstellungen
Créditos=Credits=Créditos=Crediti=Mitwirkende
Dificuldade=Difficulty=Dificultad=Difficoltà=Schwierigkeit
Idioma=Language=Idioma=Lingua=Sprache
Fase do dia=Daily level=Nivel del día=Livello del giorno=Tageslevel
Modo infinito=Endless mode=Modo infinito=Modalità infinita=Endlosmodus
Cada rodada volta como um fantasma que repete seus movimentos.=Every round comes back as a ghost that repeats your moves.=Cada ronda vuelve como un fantasma que repite tus movimientos.=Ogni round torna come un fantasma che ripete le tue mosse.=Jede Runde kehrt als Geist zurück, der deine Bewegungen wiederholt.
Voltar=Back=Volver=Indietro=Zurück
Continuar=Resume=Continuar=Continua=Fortsetzen
Menu principal=Main menu=Menú principal=Menu principale=Hauptmenü
Jogo pausado=Game paused=Juego en pausa=Gioco in pausa=Spiel pausiert
Volume geral=Master volume=Volumen general=Volume generale=Gesamtlautstärke
Música ligada=Music on=Música activada=Musica attiva=Musik an
Efeitos ligados=Effects on=Efectos activados=Effetti attivi=Effekte an
Música e sons: gerados no navegador=Music and sounds: generated in the browser=Música y sonidos: generados en el navegador=Musica e suoni: generati nel browser=Musik und Klänge: im Browser erzeugt
Música=Music=Música=Musica=Musik
Efeitos=Effects=Efectos=Effetti=Effekte
Vibração=Vibration=Vibración=Vibrazione=Vibration
Tela cheia=Fullscreen=Pantalla completa=Schermo intero=Vollbild
Instalar app=Install app=Instalar app=Installa app=App installieren
Ligado=On=Activado=Attivo=An
Desligado=Off=Desactivado=Spento=Aus
Idealizado por=Conceived by=Idea de=Ideato da=Idee von
Criado por=Created by=Creado por=Creato da=Erstellt von
Programação e design: Claude, da Anthropic=Programming and design: Claude, by Anthropic=Programación y diseño: Claude, de Anthropic=Programmazione e design: Claude, di Anthropic=Programmierung und Design: Claude von Anthropic
Obrigado por jogar!=Thanks for playing!=¡Gracias por jugar!=Grazie per aver giocato!=Danke fürs Spielen!
Fácil=Easy=Fácil=Facile=Leicht
Médio=Medium=Medio=Medio=Mittel
Difícil=Hard=Difícil=Difficile=Schwer
Extremo=Extreme=Extremo=Estremo=Extrem
Diária=Daily=Diaria=Giornaliero=Täglich
Infinito=Endless=Infinito=Infinito=Endlos
 fases= levels= niveles= livelli= Level
 fase= level= nivel= livello= Level
Escolha a fase=Choose a level=Elige un nivel=Scegli un livello=Wähle ein Level
Rodada =Round =Ronda =Round =Runde 
Ecos =Echoes =Ecos =Echi =Echos 
 ecos.= echoes.= ecos.= echi.= Echos.
 eco.= echo.= eco.= eco.= Echo.
Floresta=Forest=Bosque=Foresta=Wald
Caverna=Cave=Caverna=Caverna=Höhle
Deserto=Desert=Desierto=Deserto=Wüste
Geleira=Glacier=Glaciar=Ghiacciaio=Gletscher
Vulcão=Volcano=Volcán=Vulcano=Vulkan
Oceano=Ocean=Océano=Oceano=Ozean
Espaço: voltar ao menu=Space: back to menu=Espacio: volver al menú=Spazio: torna al menu=Leertaste: zurück zum Menü
Espaço: começar=Space: start=Espacio: empezar=Spazio: inizia=Leertaste: starten
Espaço: próximo nível=Space: next level=Espacio: siguiente nivel=Spazio: livello successivo=Leertaste: nächstes Level
Espaço: continuar=Space: continue=Espacio: continuar=Spazio: continua=Leertaste: weiter
Espaço: guardar esta rodada como eco=Space: save this round as an echo=Espacio: guardar esta ronda como eco=Spazio: salva questo round come eco=Leertaste: Runde als Echo speichern
Espaço ou Enter: avançar para =Space or Enter: go to =Espacio o Enter: ir a =Spazio o Invio: vai a =Leertaste oder Enter: weiter zu 
Espaço=Space=Espacio=Spazio=Weltraum
Ruínas=Ruins=Ruinas=Rovine=Ruinen
Laboratório=Laboratory=Laboratorio=Laboratorio=Labor
D: descartar e tentar de novo=D: discard and try again=D: descartar y reintentar=D: scarta e riprova=D: verwerfen und neu versuchen
Mova-se para começar a rodada.=Move to start the round.=Muévete para empezar la ronda.=Muoviti per iniziare il round.=Beweg dich, um die Runde zu starten.
Aguardando o outro jogador...=Waiting for the other player...=Esperando al otro jugador...=In attesa dell'altro giocatore...=Warte auf den anderen Spieler...
Tempo esgotado=Time is up=Se acabó el tiempo=Tempo scaduto=Zeit abgelaufen
Nível concluído=Level complete=Nivel completado=Livello completato=Level geschafft
PARABÉNS!=CONGRATULATIONS!=¡FELICIDADES!=COMPLIMENTI!=GLÜCKWUNSCH!
Você concluiu a dificuldade =You completed the difficulty =Completaste la dificultad =Hai completato la difficoltà =Du hast die Schwierigkeit geschafft: 
Você completou todas as fases do ECO.=You completed every level of ECO.=Completaste todos los niveles de ECO.=Hai completato tutti i livelli di ECO.=Du hast alle Level von ECO geschafft.
Esc: voltar ao menu principal=Esc: back to main menu=Esc: volver al menú principal=Esc: torna al menu principale=Esc: zurück zum Hauptmenü
Estrelas: =Stars: =Estrellas: =Stelle: =Sterne: 
   Esc: voltar=   Esc: back=   Esc: volver=   Esc: indietro=   Esc: zurück
Conquista: =Achievement: =Logro: =Obiettivo: =Erfolg: 
Como jogar=How to play=Cómo jugar=Come giocare=Spielanleitung
Nova mecânica=New mechanic=Nueva mecánica=Nuova meccanica=Neue Mechanik
Mova-se com as setas ou WASD.=Move with the arrow keys or WASD.=Muévete con las flechas o WASD.=Muoviti con le frecce o WASD.=Bewege dich mit den Pfeiltasten oder WASD.
Pise no botão colorido e aperte Enter: a rodada vira um eco=Step on the colored button and press Enter: the round becomes an echo=Pisa el botón de color y pulsa Enter: la ronda se convierte en eco=Calpesta il pulsante colorato e premi Invio: il round diventa un eco=Tritt auf den farbigen Knopf und drücke Enter: die Runde wird zum Echo
que repete seus movimentos e segura o botão para você.=that repeats your moves and holds the button for you.=que repite tus movimientos y mantiene el botón por ti.=che ripete le tue mosse e tiene premuto il pulsante per te.=das deine Bewegungen wiederholt und den Knopf für dich hält.
Atravesse a porta e chegue à saída verde.=Go through the door and reach the green exit.=Cruza la puerta y llega a la salida verde.=Attraversa la porta e raggiungi l'uscita verde.=Geh durch die Tür und erreiche den grünen Ausgang.
1 a 9 ou Q/E escolhem um eco, Backspace apaga o eco escolhido.=1-9 or Q/E pick an echo, Backspace deletes the chosen echo.=1-9 o Q/E eligen un eco, Retroceso borra el eco elegido.=1-9 o Q/E scelgono un eco, Backspace elimina l'eco scelto.=1-9 oder Q/E wählen ein Echo, Rücktaste löscht das gewählte Echo.
R reinicia a rodada. P ou Esc pausam o jogo.=R restarts the round. P or Esc pauses the game.=R reinicia la ronda. P o Esc pausan el juego.=R riavvia il round. P o Esc mettono in pausa il gioco.=R startet die Runde neu. P oder Esc pausiert das Spiel.
Alavanca temporizada=Timed lever=Palanca temporizada=Leva a tempo=Zeitgesteuerter Hebel
Alavanca=Lever=Palanca=Leva=Hebel
Toque na alavanca: ela fica ligada para sempre.=Touch the lever: it stays on forever.=Toca la palanca: queda activada para siempre.=Tocca la leva: resta attiva per sempre.=Berühre den Hebel: Er bleibt für immer an.
Abre a porta da mesma cor, sem ninguém segurando nada.=It opens the door of the same color, with nobody holding anything.=Abre la puerta del mismo color, sin que nadie sostenga nada.=Apre la porta dello stesso colore, senza che nessuno tenga niente.=Sie öffnet die Tür derselben Farbe, ohne dass jemand etwas hält.
Mola=Spring=Resorte=Molla=Feder
A mola só funciona com o botão da mesma cor pressionado.=The spring only works while the button of the same color is pressed.=El resorte solo funciona con el botón del mismo color pulsado.=La molla funziona solo con il pulsante dello stesso colore premuto.=Die Feder funktioniert nur, wenn der Knopf derselben Farbe gedrückt ist.
Pise nela para ser lançado por cima da grade.=Step on it to be launched over the fence.=Písalo para salir lanzado por encima de la valla.=Calpestala per essere lanciato oltre la recinzione.=Tritt darauf, um über den Zaun geschleudert zu werden.
Peça a um eco para segurar o botão.=Ask an echo to hold the button.=Pide a un eco que mantenga el botón.=Chiedi a un eco di tenere premuto il pulsante.=Lass ein Echo den Knopf halten.
Portal=Portal=Portal=Portale=Portal
O portal atravessa o muro até a sala seguinte.=The portal crosses the wall into the next room.=El portal atraviesa el muro hasta la siguiente sala.=Il portale attraversa il muro fino alla stanza successiva.=Das Portal führt durch die Wand in den nächsten Raum.
Só funciona com o botão da mesma cor pressionado.=It only works while the button of the same color is pressed.=Solo funciona con el botón del mismo color pulsado.=Funziona solo con il pulsante dello stesso colore premuto.=Es funktioniert nur, wenn der Knopf derselben Farbe gedrückt ist.
Pise no anel de entrada para ser transportado.=Step on the entry ring to be teleported.=Pisa el anillo de entrada para ser transportado.=Calpesta l'anello d'ingresso per essere teletrasportato.=Tritt auf den Eingangsring, um teleportiert zu werden.
Espinhos=Spikes=Pinchos=Spuntoni=Stacheln
Os espinhos sobem e descem em ciclos.=Spikes rise and fall in cycles.=Los pinchos suben y bajan en ciclos.=Gli spuntoni salgono e scendono a cicli.=Die Stacheln fahren in Zyklen hoch und runter.
Quando ficarem laranja, vão subir: espere.=When they turn orange they are about to rise: wait.=Cuando se vuelvan naranja van a subir: espera.=Quando diventano arancioni stanno per salire: aspetta.=Wenn sie orange werden, fahren sie gleich hoch: warte.
Se encostar neles, a rodada recomeça. Ecos não são afetados.=If you touch them the round restarts. Echoes are not affected.=Si los tocas, la ronda se reinicia. Los ecos no se ven afectados.=Se li tocchi il round ricomincia. Gli echi non sono colpiti.=Wenn du sie berührst, beginnt die Runde neu. Echos sind nicht betroffen.
Esteira=Conveyor=Cinta=Nastro=Förderband
A esteira empurra você para trás.=The conveyor pushes you backwards.=La cinta te empuja hacia atrás.=Il nastro ti spinge all'indietro.=Das Förderband schiebt dich zurück.
Corra contra ela para chegar à porta.=Run against it to reach the door.=Corre contra ella para llegar a la puerta.=Corri contro di esso per raggiungere la porta.=Lauf dagegen an, um die Tür zu erreichen.
Ela liga a porta só por alguns segundos.=It opens the door only for a few seconds.=Abre la puerta solo unos segundos.=Apre la porta solo per pochi secondi.=Sie öffnet die Tür nur für ein paar Sekunden.
Toque e corra para passar antes que apague.=Touch it and run through before it turns off.=Tócala y corre para pasar antes de que se apague.=Toccala e corri per passare prima che si spenga.=Berühre ihn und renn hindurch, bevor er ausgeht.
Gelo=Ice=Hielo=Ghiaccio=Eis
O chão de gelo é escorregadio: você desliza e demora para parar.=The ice floor is slippery: you slide and take a while to stop.=El suelo de hielo resbala: te deslizas y tardas en parar.=Il pavimento di ghiaccio è scivoloso: scivoli e ci metti un po' a fermarti.=Der Eisboden ist glatt: Du rutschst und brauchst eine Weile, um anzuhalten.
Planeje a parada antes dos espinhos e das portas.=Plan your stop before spikes and doors.=Planea tu parada antes de los pinchos y las puertas.=Pianifica la fermata prima di spuntoni e porte.=Plane deinen Halt vor Stacheln und Türen.
GUARDAR ECO=SAVE ECHO=GUARDAR ECO=SALVA ECO=ECHO SPEICHERN
DESCARTAR=DISCARD=DESCARTAR=SCARTA=VERWERFEN
Toque na tela para continuar=Tap the screen to continue=Toca la pantalla para continuar=Tocca lo schermo per continuare=Tippe auf den Bildschirm, um fortzufahren
Toque para avançar. Toque na parte de baixo para voltar ao menu.=Tap to continue. Tap the bottom to go back to the menu.=Toca para avanzar. Toca la parte de abajo para volver al menú.=Tocca per proseguire. Tocca in basso per tornare al menu.=Tippe zum Weitermachen. Tippe unten, um zum Menü zurückzukehren.
Dourado=Gold=Dorado=Oro=Gold
Menta=Mint=Menta=Menta=Minze
Rosa=Pink=Rosa=Rosa=Rosa
Azul=Blue=Azul=Blu=Blau
Roxo=Purple=Morado=Viola=Lila
Arco-íris=Rainbow=Arcoíris=Arcobaleno=Regenbogen
Primeiro Eco=First Echo=Primer eco=Primo eco=Erstes Echo
Conclua uma fase no modo online=Complete a level in online mode=Completa un nivel en modo en línea=Completa un livello in modalità online=Schließe ein Level im Online-Modus ab
Conclua uma fase=Complete a level=Completa un nivel=Completa un livello=Schließe ein Level ab
Aquecimento Concluído=Warm-up Done=Calentamiento completado=Riscaldamento completato=Aufwärmen geschafft
Conclua o modo Fácil=Complete Easy mode=Completa el modo Fácil=Completa la modalità Facile=Schließe den Leicht-Modus ab
Veterano dos Ecos=Echo Veteran=Veterano de los ecos=Veterano degli echi=Echo-Veteran
Conclua o modo Médio=Complete Medium mode=Completa el modo Medio=Completa la modalità Medio=Schließe den Mittel-Modus ab
Mente Brilhante=Brilliant Mind=Mente brillante=Mente brillante=Brillanter Geist
Conclua o modo Difícil=Complete Hard mode=Completa el modo Difícil=Completa la modalità Difficile=Schließe den Schwer-Modus ab
Eco Eterno=Eternal Echo=Eco eterno=Eco eterno=Ewiges Echo
Conclua o modo Extremo=Complete Extreme mode=Completa el modo Extremo=Completa la modalità Estremo=Schließe den Extrem-Modus ab
Perfeccionista=Perfectionist=Perfeccionista=Perfezionista=Perfektionist
Ganhe 3 estrelas em 10 fases=Earn 3 stars in 10 levels=Consigue 3 estrellas en 10 niveles=Ottieni 3 stelle in 10 livelli=Erhalte 3 Sterne in 10 Leveln
Caçador de Estrelas=Star Hunter=Cazador de estrellas=Cacciatore di stelle=Sternenjäger
Junte 50 estrelas=Collect 50 stars=Reúne 50 estrellas=Raccogli 50 stelle=Sammle 50 Sterne
Maratonista Infinito=Endless Marathoner=Maratoniano infinito=Maratoneta infinito=Endlos-Läufer
Chegue à onda 5 do modo infinito=Reach wave 5 in endless mode=Llega a la oleada 5 del modo infinito=Raggiungi l'ondata 5 nella modalità infinita=Erreiche Welle 5 im Endlosmodus
Desafiante do Dia=Daily Challenger=Retador del día=Sfidante del giorno=Tages-Herausforderer
Conclua a fase do dia=Complete the daily level=Completa el nivel del día=Completa il livello del giorno=Schließe das Tageslevel ab
Dupla Dinâmica=Dynamic Duo=Dúo dinámico=Duo dinamico=Dynamisches Duo
Criar sala=Create room=Crear sala=Crea stanza=Raum erstellen
Entrar na sala=Join room=Unirse a la sala=Entra nella stanza=Raum beitreten
Digite o código da sala=Enter the room code=Escribe el código de la sala=Inserisci il codice della stanza=Gib den Raumcode ein
Código da sala: =Room code: =Código de la sala: =Codice stanza: =Raumcode: 
Conectado!=Connected!=¡Conectado!=Connesso!=Verbunden!
Aguardando o anfitrião escolher a fase...=Waiting for the host to choose the level...=Esperando a que el anfitrión elija el nivel...=In attesa che l'host scelga il livello...=Warte darauf, dass der Host ein Level wählt...
Aguardando o anfitrião...=Waiting for the host...=Esperando al anfitrión...=In attesa dell'host...=Warte auf den Host...
Cancelar=Cancel=Cancelar=Annulla=Abbrechen
Sair=Leave=Salir=Esci=Verlassen
Um jogador cria a sala e o outro entra com o código.=One player creates the room and the other joins with the code.=Un jugador crea la sala y el otro entra con el código.=Un giocatore crea la stanza e l'altro entra con il codice.=Ein Spieler erstellt den Raum und der andere tritt mit dem Code bei.
Modo espectador: assistindo o outro jogador=Spectator mode: watching the other player=Modo espectador: viendo al otro jugador=Modalità spettatore: guardi l'altro giocatore=Zuschauermodus: Du siehst dem anderen Spieler zu
Não foi possível carregar o modo online.=Could not load online mode.=No se pudo cargar el modo en línea.=Impossibile caricare la modalità online.=Online-Modus konnte nicht geladen werden.
A conexão foi encerrada.=The connection was closed.=La conexión se cerró.=La connessione è stata chiusa.=Die Verbindung wurde getrennt.
Código em uso. Tente de novo.=Code in use. Try again.=Código en uso. Inténtalo de nuevo.=Codice in uso. Riprova.=Code bereits belegt. Versuche es erneut.
Servidor online indisponível neste ambiente.=Online server unavailable in this environment.=Servidor en línea no disponible en este entorno.=Server online non disponibile in questo ambiente.=Online-Server in dieser Umgebung nicht verfügbar.
Sala não encontrada.=Room not found.=Sala no encontrada.=Stanza non trovata.=Raum nicht gefunden.
Clique na tela se as teclas não responderem. No celular, use o modo paisagem (deitado).=Click the screen if the keys do not respond. On a phone, use landscape mode.=Haz clic en la pantalla si las teclas no responden. En el móvil, usa el modo horizontal.=Fai clic sullo schermo se i tasti non rispondono. Sul telefono, usa la modalità orizzontale.=Klicke auf den Bildschirm, falls die Tasten nicht reagieren. Am Handy bitte im Querformat spielen.
Sala=Room=Sala=Stanza=Raum`.split('\n').map(l=>l.split('=')).sort((a,b)=>b[0].length-a[0].length);
const EN2=`saída=exit=salida=uscita=Ausgang
Cooperação=Co-op=Cooperación=Cooperazione=Koop
Cada jogador tem a sua própria pista e os seus próprios ecos.=Each player has their own lane and their own echoes.=Cada jugador tiene su propio carril y sus propios ecos.=Ogni giocatore ha la sua corsia e i suoi echi.=Jeder Spieler hat seine eigene Bahn und seine eigenen Echos.
Os botões de uma pista abrem as portas da pista do parceiro.=The buttons in one lane open the doors in the partner's lane.=Los botones de un carril abren las puertas del carril del compañero.=I pulsanti di una corsia aprono le porte della corsia del compagno.=Die Knöpfe einer Bahn öffnen die Türen der Bahn des Partners.
Seus ecos seguram botões para o parceiro, e os dele para você.=Your echoes hold buttons for your partner, and theirs for you.=Tus ecos mantienen botones para tu compañero y los suyos para ti.=I tuoi echi tengono premuti i pulsanti per il compagno e i suoi per te.=Deine Echos halten Knöpfe für deinen Partner und seine für dich.
Quando os dois chegam à sua saída, a fase termina.=When both reach their exit, the level ends.=Cuando los dos llegan a su salida, el nivel termina.=Quando entrambi raggiungono la propria uscita, il livello termina.=Wenn beide ihren Ausgang erreichen, ist das Level geschafft.
Cor=Color=Color=Colore=Farbe
Acessório=Accessory=Accesorio=Accessorio=Zubehör
Laranja=Orange=Naranja=Arancione=Orange
Turquesa=Turquoise=Turquesa=Turchese=Türkis
Vermelho=Red=Rojo=Rosso=Rot
Neve=Snow=Nieve=Neve=Schnee
Sombra=Shadow=Sombra=Ombra=Schatten
Lima=Lime=Lima=Lime=Limette
Antena=Antenna=Antena=Antenna=Antenne
Coroa=Crown=Corona=Corona=Krone
Laço=Bow=Lazo=Fiocco=Schleife
Boné=Cap=Gorra=Berretto=Kappe
Chifres=Horns=Cuernos=Corna=Hörner
Auréola=Halo=Aureola=Aureola=Heiligenschein
Cartola=Top hat=Chistera=Cilindro=Zylinder
Chapéu de bruxa=Witch hat=Sombrero de bruja=Cappello da strega=Hexenhut
Óculos de sol=Sunglasses=Gafas de sol=Occhiali da sole=Sonnenbrille
Fones de ouvido=Headphones=Auriculares=Cuffie=Kopfhörer
Bigode=Mustache=Bigote=Baffi=Schnurrbart
Gorro de gelo=Ice beanie=Gorro de hielo=Berretto di ghiaccio=Eismütze`.split('\n').map(l=>l.split('='));
const ALL=EN.concat(EN2).sort((a,b)=>b[0].length-a[0].length),MAP={},RX=new RegExp(ALL.map(r=>{MAP[r[0]]=r;return r[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}).join('|'),'g');
function TR(s){const c=[1,0,2,3,4][S.lang];if(!c)return s;return s.replace(RX,m=>{const r=MAP[m];return r[c]||r[1]})}
function genCo(df,ix,tot,[m,pp,lvr,spr,por=0,tmr=0,sk=0,bt=0,icn=0],seed){
const rd=rng(seed),r2=rng(seed*31+7),GW=70,th=(OF[df]+ix+5)%10,c=m+1,mx=r2()<.5,LA=r2()<.5?1:0,bw=[400,440,480,520][df],bh=[250,290,320,340][df];
const cws=Array.from({length:c},()=>bw*(.85+.3*r2())),chs=[bh*(.85+.3*r2()),bh*(.85+.3*r2())],xs=[0],ys=[0,chs[0],chs[0]+chs[1]];
cws.forEach((q,i)=>xs.push(xs[i]+q));const ww=xs[c],wh=ys[2];
const colx=i=>mx?m-i:i,RR=(ln,i)=>{const x=colx(i);return[xs[x],ys[ln],cws[x],chs[ln]]},ctr=(ln,i)=>{const q=RR(ln,i);return[q[0]+q[2]/2,q[1]+q[3]/2]};
const mkT=rev=>{const ty=Array(m).fill('d');let ps=rev?0:m-1;const put=t=>{while(ps>=0&&ps<m&&ty[ps]!=='d')ps+=rev?1:-1;if(ps>=0&&ps<m){ty[ps]=t;ps+=rev?2:-2}};[...'l'.repeat(lvr)+'t'.repeat(tmr)].forEach(put);ps=rev?1:m-2;[...'s'.repeat(spr)+'p'.repeat(por)].forEach(put);return ty};
const TY=[];TY[LA]=mkT(0);TY[1-LA]=mkT(1);
const w=[],d=Array.from({length:2*m},()=>[0,0,0,0]),f=[],mm=[],v=[],p=[],pt=[],sp=[],bl=[],ic=[],hz=[],GR=[[],[]],GC=[[],[]],rooms=[],ux=mx?-1:1;
for(let ln=0;ln<2;ln++)for(let i=0;i<=m;i++)rooms.push(RR(ln,i));
for(let x=0;x<c;x++)w.push([xs[x],ys[1]-8,cws[x],16]);
for(let ln=0;ln<2;ln++)for(let x=0;x<m;x++){const xb=xs[x+1]-8,y0=ys[ln],h=chs[ln],gy=y0+h*(.3+.4*r2()),k=mx?m-1-x:x;
w.push([xb,y0,16,gy-GW/2-y0],[xb,gy+GW/2,16,y0+h-gy-GW/2]);GR[ln][k]=[xb,gy-GW/2,16,GW];GC[ln][k]=[xb+8,gy]}
const S1=ctr(LA,0),S2=ctr(1-LA,0),E1=ctr(LA,m),E2=ctr(1-LA,m),used=[S1,S2,E1,E2];let PL=120*(m+1);
for(let ln=0;ln<2;ln++)for(let k=0;k<m;k++){const t=TY[ln][k],ch=ln===LA?k:m+k,e=GC[ln][k],a=ctr(ln,k),b=ctr(ln,k+1);if(ln===LA)PL+=Math.hypot(b[0]-a[0],b[1]-a[1]);used.push(e);
if(t==='s'){f.push(GR[ln][k]);const pd=[e[0]-ux*50,e[1]];mm.push([pd[0],pd[1],ux,0,ch]);used.push(pd)}
else if(t==='p'){w.push(GR[ln][k]);const A=[e[0]-ux*50,e[1]],B=[e[0]+ux*50,e[1]];pt.push([A[0],A[1],B[0],B[1],ch]);used.push(A,B)}
else d[ch]=GR[ln][k]}
const cand=[];for(let ln=0;ln<2;ln++)TY[ln].forEach((t,k)=>'dlt'.includes(t)&&cand.push([ln,k]));const el=[...cand];
const hzs=(cnt,dd,fn,sh)=>{for(let j=0;j<cnt&&(sh?el.length:cand.length);j++){const[ln,k]=sh?el[r2()*el.length|0]:cand.splice(r2()*cand.length|0,1)[0],e=GC[ln][k],[x0,y0,rw,rh]=RR(ln,k),a=ux>0?e[0]-8-dd:e[0]+8,b=e[1]-85,x1=Math.max(a,x0+8),y1=Math.max(b,y0+8),x2=Math.min(a+dd,x0+rw-8),y2=Math.min(b+170,y0+rh-8),R2=[x1,y1,x2-x1,y2-y1];fn(R2);hz.push(R2)}};
hzs(sk,50,q=>sp.push([...q,r2()*120|0]));hzs(bt,90,q=>bl.push([...q,-ux,0]));hzs(icn,110,q=>ic.push(q),1);
for(let ln=0;ln<2;ln++)for(let i=0;i<=m;i++)if(r2()<.7){const[x0,y0,rw,rh]=RR(ln,i),pw=44+r2()*20,ph=44+r2()*46;for(let t=0;t<30;t++){const x=x0+70+r2()*(rw-140-pw),y=y0+70+r2()*(rh-140-ph),qx=x+pw/2,qy=y+ph/2;if(used.every(u=>Math.hypot(u[0]-qx,u[1]-qy)>120)){w.push([x,y,pw,ph]);used.push([qx,qy]);break}}}
const pl=(ln,i,gp)=>{const[x0,y0,rw,rh]=RR(ln,i);let b;for(let t=0;t<80;t++){const x=x0+40+rd()*(rw-80),y=y0+40+rd()*(rh-80);b=[x,y];if(used.every(u=>Math.hypot(u[0]-x,u[1]-y)>(t<50?62:42))&&(!gp||Math.hypot(x-gp[0],y-gp[1])>80&&Math.hypot(x-gp[0],y-gp[1])<240)&&hz.every(h=>!(x>h[0]-30&&x<h[0]+h[2]+30&&y>h[1]-30&&y<h[1]+h[3]+30))&&w.every(([a,c2,e,f2])=>Math.hypot(x-Math.max(a,Math.min(x,a+e)),y-Math.max(c2,Math.min(y,c2+f2)))>34))break}used.push(b);return b};
let neA=0,neB=0;for(let ln=0;ln<2;ln++)for(let k=0;k<m;k++){const t=TY[ln][k],ch=ln===LA?k:m+k;
if(t==='l'||t==='t'){const q=pl(ln,k,t==='t'?GC[ln][k]:0);v.push([q[0],q[1],ch,t==='t'?300:0])}
else for(let j=0;j<pp;j++){const q=pl(1-ln,k);p.push([q[0],q[1],ch]);if(1-ln===LA)neA++;else neB++}}
const dc=[];for(let ln=0;ln<2;ln++)for(let i=0;i<=m;i++){const[x0,y0,rw,rh]=RR(ln,i),k=Math.max(2,rw*rh/42000|0);for(let j=0;j<k;j++)for(let t=0;t<20;t++){const x=x0+30+r2()*(rw-60),y=y0+40+r2()*(rh-60);if(used.every(u=>Math.hypot(u[0]-x,u[1]-y)>46)){dc.push([r2()<.6?0:1,x,y,.8+r2()*.6]);break}}}
dc.sort((a,b)=>a[2]-b[2]);const gp=[];for(let i=0;i<ww*wh/1800;i++)gp.push([r2()*ww,r2()*wh,r2()]);
const all=TY[0].join('')+TY[1].join('');
return{dn:DN[df],ix,tot,n:TH[th][0]+' 2P',th,ne:Math.max(neA,neB),ww,wh,dc,gp,t:Math.ceil(PL/192*FA[df]+4+3*(lvr+tmr)),s:S1,s2:S2,p,w,d,f,m:mm,v,rooms,pt,sp,bl,ic,x:[E1[0]-35,E1[1]-35,70,70],x2:[E2[0]-35,E2[1]-35,70,70],mk:(all.includes('l')?'l':'')+(all.includes('s')?'s':'')+(all.includes('p')?'p':'')+(sp.length?'x':'')+(bl.length?'b':'')+(all.includes('t')?'t':'')+(ic.length?'i':''),h:'2P',co:1}}
const dateSeed=()=>{const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()};
function mkXC(k,sd,w){const dl=k==='d',df=dl?2:Math.min(3,1+(w/4|0)),cfg=dl?[5,2,1,1,1,0,1,1,1]:[4+Math.min(4,w/2|0),1+(w>6)+(w>14),(w>1)+(w>8),1+(w>3),(w>2)+(w>9),(w>10)+0,(w>0)+(w>5)+(w>11),(w>4)+(w>9),(w>7)+(w>13)];
for(let t=0;t<8;t++){const l=genCo(df,1+t,1,cfg,sd+t*131);if(okLv(l)||t===7){l.dn=dl?'Diária':'Infinito';l.ix=dl?1:w+1;l.tot=dl?1:'∞';l.nm='';L[CXL]=l;return}}}
function hostX(k){const w=SV.wc||0,sd=k==='d'?dateSeed():Date.now()%1e6;mkXC(k,sd,w);send({t:'x',k,sd,w});newLevel(CXL)}
const mixc=(a,b,t)=>{const q=z=>[1,3,5].map(i=>parseInt(z.slice(i,i+2),16)),A=q(a),B=q(b);return'rgb('+A.map((v,i)=>v+(B[i]-v)*t|0).join()+')'};
function titleAnim(){const t=performance.now()/1000;['E','C','O'].forEach((ch,i)=>{const x=W/2+(i-1)*64,y=112+Math.sin(t*2.2+i*.9)*8;g.save();g.shadowColor='hsl('+(45+i*60+Math.sin(t)*25)+' 90% 60%)';g.shadowBlur=18+8*Math.sin(t*3+i);txt(ch,x,y,82,800,'hsl('+(45+i*50+Math.sin(t*1.5)*20)+' 90% 66%)','center');g.restore()});
chr(W/2+128+Math.cos(t*1.5)*10,88+Math.sin(t*2)*8,'#ffd166',.9,[Math.cos(t*1.5)>0?-1:1,0],[0,0],0)}
const DS2={};
function decoSet(st){if(DS2[st])return DS2[st];const r=rng([...st].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7)),a=[];for(let i=0;i<8;i++){const left=i%2===0;a.push({k:i<5?i:r()*5|0,x:left?40+r()*120:640+r()*120,y:140+r()*300,th:r()*10|0,s:.9+r()*.4,ph:r()*6.28,hu:r()*360|0})}return DS2[st]=a}
function drawDeco(){const t=performance.now()/1000;for(const o of decoSet(state)){const x=o.x,y=o.y,s=o.s,b=Math.sin(t*1.6+o.ph)*6,col='hsl('+o.hu+' 70% 72%)';
if(o.k===0)chr(x,y+b,col,.85,[Math.sin(t+o.ph)>0?1:-1,0],[0,0],0);
else if(o.k===1){g.save();g.translate(x,y+b);g.scale(1,-1);chr(0,0,col,.85,[1,0],[0,0],0);g.restore()}
else if(o.k===2){const pk=Math.max(0,Math.sin(t*.8+o.ph));chr(x+10*s+pk*24,y-12*s,col,.9,[pk>.5?1:-1,0],[0,0],0);DR[0][0](x,y,s)}
else if(o.k===3){g.save();g.translate(x,y);g.rotate(Math.sin(t*1.4+o.ph)*.06);DR[o.th][o.ph>3?1:0](0,0,s);g.restore()}
else chr(x,y+b*.6,col,.85,[Math.floor(t/1.6+o.ph)%3-1,0],[0,0],0)}}
let dmQ=0;
function segP(l,a,b){const S=10,gw=Math.ceil(l.ww/S),gh=Math.ceil(l.wh/S);
if(!l.bk){const bk=new Uint8Array(gw*gh);for(let gy=0;gy<gh;gy++)for(let gx=0;gx<gw;gx++){const x=gx*S+5,y=gy*S+5;let o=x<16||y<16||x>l.ww-16||y>l.wh-16;if(!o)for(const[p,q,e,f]of l.w)if((x-Math.max(p,Math.min(x,p+e)))**2+(y-Math.max(q,Math.min(y,q+f)))**2<256){o=1;break}bk[gy*gw+gx]=o?1:0}l.bk=bk}
const bk=l.bk,cl=([x,y])=>Math.max(0,Math.min(gw-1,x/S|0))+gw*Math.max(0,Math.min(gh-1,y/S|0)),s0=cl(a),t0=cl(b),par=new Int32Array(gw*gh).fill(-2);par[s0]=-1;const qu=[s0];
for(let h=0;h<qu.length&&par[t0]===-2;h++){const u=qu[h],x=u%gw,y=(u-x)/gw;for(const[p,q]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+p,Y=y+q;if(X<0||Y<0||X>=gw||Y>=gh)continue;const v=Y*gw+X;if(par[v]===-2&&(!bk[v]||v===t0)){par[v]=u;qu.push(v)}}}
if(par[t0]===-2)return[b];const o=[];for(let u=t0,i=0;u>=0&&par[u]!==-1;u=par[u],i++)if(i%3===0)o.push([(u%gw)*S+5,((u/gw)|0)*S+5]);if(!o.length)o.push(b);o.reverse();o[o.length-1]=b;return o}
function planL(l){const R=l.rooms,ct=i=>[R[i][0]+R[i][2]/2,R[i][1]+R[i][3]/2],G=l.d.length,W=[],ends=[],ent=[l.s.slice()];let cur=l.s.slice();
const go=(t,f)=>{for(const q of segP(l,cur,t))W.push([q[0],q[1],0]);if(f)W[W.length-1][2]=f;cur=t};
for(let k=0;k<G;k++){const a=ct(k),b=ct(k+1),n=Math.hypot(b[0]-a[0],b[1]-a[1]),dr=[(b[0]-a[0])/n,(b[1]-a[1])/n],sm=l.m.find(q=>q[4]===k),pp=l.pt.find(q=>q[4]===k),lv_=l.v.find(q=>q[2]===k);
if(sm){const gc=[sm[0]+sm[2]*50,sm[1]+sm[3]*50];go([sm[0],sm[1]],1);cur=[gc[0]+dr[0]*62,gc[1]+dr[1]*62]}
else if(pp){go([pp[0],pp[1]],1);cur=[pp[2],pp[3]]}
else{const r=l.d[k],gc=[r[0]+r[2]/2,r[1]+r[3]/2];if(lv_)go([lv_[0],lv_[1]]);go([gc[0]-dr[0]*30,gc[1]-dr[1]*30]);go([gc[0]+dr[0]*55,gc[1]+dr[1]*55])}
ends.push(W.length);ent.push(cur.slice())}
go([l.x[0]+35,l.x[1]+35]);const fin=W.map(q=>q.slice()),rt=[];
for(const P of[...l.p].sort((u,v)=>u[2]-v[2])){const k=P[2],W0=(k?W.slice(0,ends[k-1]):[]).map(q=>q.slice());segP(l,ent[k],[P[0],P[1]]).forEach(q=>W0.push([q[0],q[1],0]));W0[W0.length-1][2]=3;rt.push(W0)}
rt.push(fin);return rt}
function dmInit(i0){const c=[];for(let i=1;i<XL;i++)if(L[i].dn==='Fácil'||L[i].dn==='Médio')c.push(i);let i=i0||c[Math.random()*c.length|0];if(!i0&&dm&&i===dm.l)i=c[(c.indexOf(i)+1)%c.length];
lv=i;ecos=[];oecos=[];myFin=0;rp=null;mv=0;PS=[];MTh=10;dm={l:i,rt:planL(L[i]),r:0,need:1,wi:0,w:0,t:0}}
function dmStep(){const l=L[lv],R=dm.rt[dm.r],st0=state,c0=co;if(!R){dmInit();return}
if(dm.need){reset();dm.wi=0;dm.need=0;dm.t=0}
if(++dm.t>2600){dmInit();return}
let wp=R[dm.wi];while(wp&&wp[2]!==1&&Math.hypot(wp[0]-px,wp[1]-py)<(wp[2]===3?6:11)){if(wp[2]===3){ecos.push(rec.slice());burst(px,py,'#fff',16);dm.r++;dm.need=1;return}wp=R[++dm.wi]}
if(wp&&wp[2]===1&&(lc>0||pcd>0))wp=R[++dm.wi];
let jx0=0,jy0=0;if(wp){const dx=wp[0]-px,dy=wp[1]-py,d=Math.hypot(dx,dy)||1;if(!(wp[2]===1&&d<18)){jx0=dx/d;jy0=dy/d}}
for(const[a,b,c,e,ph]of l.sp){const nx=px+jx0*26,ny=py+jy0*26;if(nx>a-8&&nx<a+c+8&&ny>b-8&&ny<b+e+8&&!(px>a-3&&px<a+c+3&&py>b-3&&py<b+e+3)){const m=(tick+ph)%120;if(m<66||m>94){jx0=jy0=0}}}
jv=1;jx=jx0;jy=jy0;state='play';co=0;dmQ=1;step();dmQ=0;co=c0;jv=0;jx=jy=0;
if(state==='win'){burst(px,py,'#5fd3a1',44);dm.w=100}else if(state==='fail')dmInit();else if(state==='ready')dm.wi=0;
state=st0}
function demoTick(){const on=(MS.includes(state)&&state!=='pause')||state==='lsel'||state==='ach';if(!on){dmA=0;return}if(!dmA){dmA=1;dmInit()}MTh=10;
for(let n=0;n<3;n++){if(dm.w>0){if(--dm.w===0)dmInit();break}dmStep()}}
function drawBot(){if(!dmA)return;g.strokeStyle='rgba(255,209,102,.35)';g.lineWidth=3;g.beginPath();rec.slice(-70).forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()}
function vig(){const v=g.createRadialGradient(W/2,H/2,160,W/2,H/2,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.45)');g.fillStyle=v;g.fillRect(0,0,W,H)}
function mini(){const q=L[lv];if(q.ww<=W&&q.wh<=H)return;const s=Math.min(170/q.ww,110/q.wh),rr=3.2/s,dot=(x,y,c,r)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill()};
g.save();g.translate(W-12-q.ww*s,52);g.scale(s,s);g.globalAlpha=.85;rc(0,0,q.ww,q.wh,'#06101a');
g.fillStyle='#5b7384';q.w.forEach(([a,b,c,d])=>g.fillRect(a,b,c,d));
q.d.forEach(([a,b,c,d],k)=>{if(!op[k])rc(a,b,c,d,DC[k])});rc(q.x[0],q.x[1],q.x[2],q.x[3],'rgba(95,211,161,.9)');
q.p.forEach(([a,b,k],i)=>dot(a,b,DC[k],pr[i]?rr*1.3:rr*.8));q.m.forEach(([a,b,,,k])=>dot(a,b,DC[k],rr*.8));q.v.forEach(([a,b,k],i)=>dot(a,b,lat[i]?DC[k]:'#8aa0ae',rr*.8));
ecos.forEach((e,i)=>{const p=epos(e,tick);dot(p[0],p[1],'hsl('+(190+i*45)+' 80% 65%)',rr)});dot(px,py,'#ffd166',rr*1.4);
g.globalAlpha=1;g.strokeStyle='#fff';g.lineWidth=1.2/s;g.strokeRect(cx,cy,W,H);g.restore()}
function walls(){const q=L[lv],T=TH[q.th];q.w.forEach(([a,b,c,d])=>{g.fillStyle=T[4];g.fillRect(a,b,c,d);g.fillStyle=T[5];g.globalAlpha=.4;g.fillRect(a,b,c,2);g.fillRect(a,b,2,d);g.globalAlpha=.55;g.strokeStyle='#000';g.lineWidth=2;g.strokeRect(a,b,c,d);g.globalAlpha=1});g.strokeStyle=T[5];g.globalAlpha=.5;g.lineWidth=3;g.strokeRect(1,1,q.ww-2,q.wh-2);g.globalAlpha=1}
function mech(){const q=L[lv],T=TH[q.th];
q.f.forEach(([a,b,c,d])=>{g.fillStyle=T[5];g.globalAlpha=.25;g.fillRect(a,b,c,d);g.globalAlpha=.8;g.setLineDash([5,5]);g.strokeStyle=T[5];g.lineWidth=2;g.strokeRect(a,b,c,d);g.setLineDash([]);g.globalAlpha=1});
q.m.forEach(([a,b,ux,uy,k])=>{const on=op[k];g.save();g.translate(a,b);g.rotate(Math.atan2(uy,ux));g.fillStyle=on?DC[k]:'#3a4a55';g.beginPath();g.arc(0,0,18,0,7);g.fill();g.fillStyle=on?'#fff':'#6f8794';const o=on?(tick%20)/4:0;g.beginPath();g.moveTo(-7+o,-9);g.lineTo(8+o,0);g.lineTo(-7+o,9);g.closePath();g.fill();g.restore()});
q.v.forEach(([a,b,k,du],i)=>{const on=du?tick-lt[i]<du:lat[i],hx=a+(on?12:-12);if(du&&on){g.strokeStyle=DC[k];g.lineWidth=3;g.beginPath();g.arc(a,b,22,-1.57,-1.57+6.28*(1-(tick-lt[i])/du));g.stroke()}g.fillStyle='#1a2630';g.fillRect(a-14,b+4,28,9);g.strokeStyle=DC[k];g.lineWidth=4;g.beginPath();g.moveTo(a,b+6);g.lineTo(hx,b-10);g.stroke();g.fillStyle=on?DC[k]:'#8aa0ae';g.beginPath();g.arc(hx,b-10,5,0,7);g.fill()})}
function mech2(){const q=L[lv],t=tick;
q.ic.forEach(([a,b,c,d])=>{g.fillStyle='rgba(190,235,255,.45)';g.fillRect(a,b,c,d);g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1.5;g.strokeRect(a,b,c,d);for(let i=0;i<5;i++){g.beginPath();g.moveTo(a+c*(i*.19+.05),b+d*.2);g.lineTo(a+c*(i*.19+.15),b+d*.8);g.stroke()}});
q.bl.forEach(([a,b,c,d,ux,uy])=>{g.fillStyle='rgba(15,25,35,.6)';g.fillRect(a,b,c,d);g.fillStyle='#ffd166';const N=ux?c:d,P=ux?d:c;for(let s=0;s<N;s+=30){const u=(s+t*2)%N,X0=ux>0?u:ux<0?N-u:0,Y0=uy>0?u:uy<0?N-u:0;for(const j of[.25,.5,.75]){const X=ux?a+X0:a+P*j,Y=uy?b+Y0:b+P*j;g.beginPath();g.moveTo(X+ux*8,Y+uy*8);g.lineTo(X-ux*6-uy*7,Y-uy*6+ux*7);g.lineTo(X-ux*6+uy*7,Y-uy*6-ux*7);g.fill()}}});
q.sp.forEach(([a,b,c,d,ph])=>{const m=(t+ph)%120,on=m<66;g.fillStyle=on?'#e0566b':m>=108?'#f2a65a':'#2a3640';g.globalAlpha=on?1:.75;g.fillRect(a,b,c,d);g.globalAlpha=1;if(on){g.fillStyle='#fff';for(let x=a+8;x<a+c-4;x+=14)for(let y=b+8;y<b+d-4;y+=14){g.beginPath();g.moveTo(x-4,y+4);g.lineTo(x,y-5);g.lineTo(x+4,y+4);g.fill()}}});
q.pt.forEach(([a,b,c,d,k])=>{const on=op[k],r=16+Math.sin(t/8)*2;[[a,b,0],[c,d,1]].forEach(([x,y,i])=>{g.strokeStyle=on?DC[k]:'#3a4a55';g.lineWidth=4;g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.lineWidth=2;g.beginPath();g.arc(x,y,r*.55,t/10*(i?-1:1),t/10*(i?-1:1)+4);g.stroke()})});syms(q)}
function chr(x,y,col,al,p,pp,pl){const t=performance.now()/200,dx=p[0]-pp[0],dy=p[1]-pp[1],h=Math.hypot(dx,dy),ex=h>.3?dx/h:0,ey=h>.3?dy/h:.4,b=Math.sin(t+x/30)*1.5;
g.save();g.translate(x,y+b);g.globalAlpha=al;g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(0,R+3-b,R*.9,4,0,0,7);g.fill();
g.fillStyle=col;g.shadowColor=col;g.shadowBlur=pl?14:8;g.beginPath();g.arc(0,-2,R,Math.PI,0);g.lineTo(R,R-2);for(let i=0;i<4;i++){const q=R*.5;g.quadraticCurveTo(R-i*q-q/2,R+4+Math.sin(t*2+i+x)*2,R-(i+1)*q,R-2)}g.closePath();g.fill();g.shadowBlur=0;g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=2;g.stroke();
g.fillStyle='#fff';for(const s of[-1,1]){g.beginPath();g.arc(s*5+ex*2,-4+ey*2,3.6,0,7);g.fill()}
g.fillStyle='#10202b';for(const s of[-1,1]){g.beginPath();g.arc(s*5+ex*3,-4+ey*3,1.8,0,7);g.fill()}
if(pl)hat(HATS[pl===2?rhat:pl===3?pv.hat:SV.hat][1],col);
g.restore()}
const S={master:.8,music:.8,sfx:.8,musicOn:true,sfxOn:true,vib:true,lang:0};
let SV={d:{},a:[],skin:0,s:{},w:0,dy:0,wc:0,col:0,hat:0};try{const sd=JSON.parse(localStorage.getItem('eco1')||'{}');Object.assign(SV,sd);Object.assign(S,SV.s);if(sd.col===undefined&&sd.skin){SV.col=[0,1,2,3,4,11][sd.skin]||0;SV.hat=sd.skin}}catch(e){}
function sv(){try{localStorage.setItem('eco1',JSON.stringify(SV))}catch(e){}}
const LN=()=>(L[lv].t||20)*60;
const MS=['menu','diff','settings','credits','pause','skin','net','wait','gwait'];
const SX=i=>W/2-L[lv].ne*9.5+i*19;
function vol(){if(MG)MG.gain.value=S.musicOn?S.master*S.music*.8:0;SV.s=S;sv()}
function sw(s){state=s;fi=0;HV=[]}
function goMenu(){reset();if(co){if(host)send({t:'menu'});sw(host?'diff':'gwait')}else sw('menu')}
function pause(){if(co){leaveCo();return}prev=state;sw('pause')}
function delEco(){if(co)return;if((state==='ready'||state==='fail')&&ecos[sel]){ecos.splice(sel,1);sel=-1;sfx(200,.2,'sawtooth',.08)}}
const snd=()=>[{t:'lg',l:'Idioma'},{t:'sl',l:'Volume geral',k:'master'},{t:'sl',l:'Música',k:'music'},{t:'sl',l:'Efeitos',k:'sfx'},{t:'tg',l:'Música ligada',k:'musicOn'},{t:'tg',l:'Efeitos ligados',k:'sfxOn'},{t:'tg',l:'Vibração',k:'vib'}];
function items(){
if(state==='menu')return[{t:'b',l:'Jogar',f:()=>sw('diff')},{t:'b',l:'Jogar online',f:()=>{netMsg='';sw('net')}},{t:'b',l:'Conquistas',f:()=>sw('ach')},{t:'b',l:'Personagens',f:()=>{pv.col=SV.col;pv.hat=SV.hat;sw('skin')}},{t:'b',l:'Configurações',f:()=>sw('settings')},{t:'b',l:'Créditos',f:()=>sw('credits')}];
if(state==='settings')return[...snd(),{t:'b',l:'Tela cheia',f:fs},...(ip?[{t:'b',l:'Instalar app',f:()=>ip.prompt()}]:[]),{t:'b',l:'Voltar',f:()=>sw('menu')}];
if(state==='skin')return[{t:'cy',l:'Cor',k:'col'},{t:'cy',l:'Acessório',k:'hat'},{t:'b',l:'Voltar',f:()=>sw('menu')}];
if(state==='pause')return[{t:'b',l:'Continuar',f:()=>{state=prev}},...snd(),{t:'b',l:'Menu principal',f:goMenu}];
if(state==='diff')return[...(co?DN.slice(0,4):['Tutorial',...DN.slice(0,4)]).map((n,j)=>{const i=co?j+1:j;return{t:'b',l:n+': '+[1,...DS][i]+(i?' fases':' fase'),f:()=>{if(i){dsel=i-1;sw('lsel')}else newLevel(0)}}}),{t:'b',l:'Fase do dia',f:()=>{if(co)hostX('d');else{mkX('d');newLevel(XL)}}},{t:'b',l:'Modo infinito',f:()=>{if(co)hostX('i');else{mkX('i');newLevel(XL)}}},{t:'b',l:'Voltar',f:()=>co?leaveCo():sw('menu')}];
if(state==='net')return[{t:'b',l:'Criar sala',f:hostRoom},{t:'b',l:'Entrar na sala',f:askCode},{t:'b',l:'Voltar',f:()=>sw('menu')}];if(state==='wait')return[{t:'b',l:'Cancelar',f:leaveCo}];if(state==='gwait')return[{t:'b',l:'Sair',f:leaveCo}];
if(state==='credits')return[{t:'b',l:'Voltar',f:()=>sw('menu')}];
return[]}
const Y0=()=>state==='menu'?190:state==='diff'?115:state==='credits'?400:state==='net'||state==='wait'||state==='gwait'?260:state==='settings'||state==='pause'?92:105,RH=()=>state==='menu'?46:state==='settings'||state==='pause'?38:42;
function rowAt(x,y){const i=Math.floor((y-Y0())/RH());return x>=200&&x<=600&&i>=0&&i<items().length?i:-1}
function act(m){if(m.t==='tg'){S[m.k]=!S[m.k];vol();sfx(520,.08,'sine',.1)}else if(m.t==='lg'){lgo=1;lgi=S.lang}else if(m.t==='b')m.f()}
function menuKey(k){if(lgo){if(k==='arrowup'||k==='w')lgi=(lgi+4)%5;else if(k==='arrowdown'||k==='s')lgi=(lgi+1)%5;else if(k==='enter'||k===' ')setLang(lgi);else if(k==='escape')lgo=0;return}const it=items(),m=it[fi],lr=k==='arrowleft'||k==='a'?-1:k==='arrowright'||k==='d'?1:0;
if(k==='escape'||(k==='p'&&state==='pause')){if(state==='pause')state=prev;else if(state==='wait'||state==='gwait')leaveCo();else if(state!=='menu')sw('menu')}
else if(k==='arrowup'||k==='w')fi=(fi+it.length-1)%it.length;
else if(k==='arrowdown'||k==='s')fi=(fi+1)%it.length;
else if(m&&m.t==='cy'&&(lr||k==='enter'||k===' '))cyc(m,lr||1);else if(m&&m.t==='sl'&&lr){S[m.k]=Math.max(0,Math.min(1,S[m.k]+lr*.1));vol();sfx(660,.08,'sine',.1)}
else if(m&&(k==='enter'||k===' '||(m.t==='tg'&&lr)))act(m)}
function mpos(e){const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]}
cv.addEventListener('pointermove',e=>{let cur='default';const[x,y]=mpos(e);if(MS.includes(state)){const i=rowAt(x,y);if(i>=0){fi=i;cur='pointer'}}else if(state==='lsel'){for(let i=0;i<DS[dsel];i++){const X=90+(i%5)*125,Y=110+(i/5|0)*88;if(x>=X&&x<=X+110&&y>=Y&&y<=Y+76){fi=i;cur='pointer'}}}cv.style.cursor=cur});
cv.addEventListener('pointerdown',e=>{cv.focus();audio();const[x,y]=mpos(e);if(state==='lsel'){lclick(x,y);return}if(state==='ach'){sw('menu');return}
if(MS.includes(state)){if(lgo){const li=items().findIndex(m=>m.t==='lg'),y0=Y0()+li*RH()+RH()-8,i=Math.floor((y-y0-3)/30);if(x>=200&&x<=600&&i>=0&&i<LANGS.length)setLang(i);lgo=0;return}const i=rowAt(x,y);if(i<0)return;fi=i;const m=items()[i];
if(m.t==='sl'){if(x>=380&&x<=540){S[m.k]=(x-380)/160;vol();sfx(660,.08,'sine',.1)}}else if(m.t==='cy')cyc(m,x<400?-1:1);else act(m)}
else{if(state==='info'){state='ready';if(co)coReady()}if(y>=44&&y<=60)for(let i=0;i<L[lv].ne;i++)if(x>=SX(i)&&x<=SX(i)+16)sel=i;if(y<=56&&x>=W-64&&x<=W-12&&(state==='play'||state==='ready'))pause()}});
function drawMenu(){if(!MS.includes(state))return;
g.fillStyle='rgba(6,12,18,'+(state==='menu'?.5:state==='pause'?.88:.8)+')';g.fillRect(0,0,W,H);drawDeco();
const T={net:'Jogar online',wait:'Sala',gwait:'Conectado!',skin:'Personagens',diff:'Dificuldade',menu:'ECO',settings:'Configurações',credits:'Créditos',pause:'Jogo pausado'},big=state==='menu';
if(big)titleAnim();else txt(T[state],W/2,70,40,800,'#ffd166','center');
if(big)txt('Cada rodada volta como um fantasma que repete seus movimentos.',W/2,150,17,500,'#9fb4c1','center');
if(state==='net'){txt('Um jogador cria a sala e o outro entra com o código.',W/2,150,17,500,'#9fb4c1','center');if(netMsg)txt(netMsg,W/2,200,18,800,'#e0566b','center')}
if(state==='wait'){txt('Código da sala: '+code,W/2,150,34,800,'#dbe7ee','center');txt('Aguardando o outro jogador...',W/2,200,18,500,'#9fb4c1','center')}
if(state==='gwait')txt('Aguardando o anfitrião escolher a fase...',W/2,170,20,500,'#dbe7ee','center');
if(state==='credits')['Idealizado por Eduardo Zimmermann','Programação e design: Claude, da Anthropic','Música e sons: gerados no navegador','Obrigado por jogar!'].forEach((s,i)=>txt(s,W/2,170+i*34,19,500,'#dbe7ee','center'));
const h=RH();if(state==='skin'){chr(690,230,SKC(pv.col),1,[1,0],[0,0],3);txt('★ '+TS(),690,300,22,800,'#ffd166','center')}
items().forEach((m,i)=>{const y=Y0()+i*h,f=i===fi,c=y+(h-8)/2,hv=HV[i]=(HV[i]||0)+((f?1:0)-(HV[i]||0))*.22,ox=hv*7;
g.fillStyle=mixc('#14232d','#305061',hv);g.fillRect(200-ox,y,400+ox*2,h-8);g.fillStyle='#ffd166';g.fillRect(200-ox,y,hv*5,h-8);
if(hv>.05){g.strokeStyle='rgba(255,209,102,'+hv+')';g.lineWidth=2;g.strokeRect(200-ox,y,400+ox*2,h-8)}
if(m.t==='b')txt(m.l,W/2,c+6,19,800,'#dbe7ee','center');
else{if(m.t==='lg')txt(lgo?'▾':'▸',212,c+6,17,800,'#ffd166');txt(m.l,m.t==='lg'?234:216,c+6,17,500,'#dbe7ee');
if(m.t==='sl'){g.fillStyle='#0d1822';g.fillRect(380,c-4,160,8);g.fillStyle='#ffd166';g.fillRect(380,c-4,160*S[m.k],8);txt(Math.round(S[m.k]*100)+'%',588,c+5,14,500,'#9fb4c1','right')}
else if(m.t==='cy'){const a=m.k==='col'?COLS:HATS,e=a[pv[m.k]],lk=TS()<e[2];txt('◀ '+e[0]+(lk?' ('+e[2]+'★)':'')+' ▶',584,c+6,16,800,lk?'#e0566b':'#ffd166','right')}else if(m.t==='lg')txt(LANGS[S.lang],584,c+6,17,800,'#ffd166','right');else txt(S[m.k]?'Ligado':'Desligado',584,c+6,17,800,S[m.k]?'#5fd3a1':'#e0566b','right')}});if(lgo){const li=items().findIndex(m=>m.t==='lg'),y0=Y0()+li*h+h-8;g.fillStyle='#0d1822';g.fillRect(200,y0,400,LANGS.length*30+6);g.strokeStyle='#ffd166';g.lineWidth=2;g.strokeRect(200,y0,400,LANGS.length*30+6);LANGS.forEach((n,i)=>{if(i===lgi){g.fillStyle='#27404f';g.fillRect(202,y0+3+i*30,396,30)}txt((i===S.lang?'✓ ':'   ')+n,222,y0+24+i*30,17,i===S.lang?800:500,'#dbe7ee')})}}
let AC=null,MG=null,mci=0,nt=0;
function tone(f,t,d,ty,v,o){const s=AC.createOscillator(),a=AC.createGain();s.type=ty;s.frequency.value=f;a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(v,t+.01);a.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(a);a.connect(o||AC.destination);s.start(t);s.stop(t+d+.05)}
function sfx(f,d,ty,v,w){if(AC&&S.sfxOn&&!dmQ)tone(f,AC.currentTime+(w||0),d,ty,v*S.master*S.sfx*1.6)}
const MT=[[130.8,1,'sine',.3],[110,0,'triangle',.35],[146.8,2,'triangle',.25],[123.5,1,'sine',.4],[98,0,'sawtooth',.3],[110,0,'square',.2],[130.8,2,'sine',.3],[82.4,0,'sine',.45],[110,2,'triangle',.3],[146.8,1,'square',.25],[130.8,1,'triangle',.32]],IV=[[0,3,7],[0,4,7],[0,5,7]],PG=[0,8,3,10];
function sched(){while(nt<AC.currentTime+3){const[rt,q,wv,st]=MT[MTh],b=rt*2**(PG[mci%4]/12);tone(b,nt,st*8+.2,'sine',.18,MG);for(let i=0;i<8;i++)tone(b*2*2**(IV[q][i%3]/12)*(i%4===3?2:1),nt+i*st,st*1.8,wv,wv==='sawtooth'||wv==='square'?.025:.05,MG);nt+=8*st;mci++}}
function audio(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.connect(AC.destination);vol();nt=AC.currentTime+.1;sched();setInterval(sched,1000)}catch(e){AC=null}}else if(AC.state==='suspended')AC.resume()}
function echoSfx(){sfx(440,.25,'sine',.13);sfx(660,.25,'sine',.13,.09);sfx(990,.45,'sine',.11,.18)}
function fan(){[523,659,784,1047].forEach((f,i)=>sfx(f,.5,'triangle',.14,i*.12))}
function txt(s,x,y,size,w,col,al){s=TR(''+s);g.font=w+' '+size+'px '+F;g.fillStyle=col;g.textAlign=al||'left';g.fillText(s,x,y)}
function ov(title,lines){g.fillStyle='rgba(6,12,18,.86)';g.fillRect(0,0,W,H);
txt(title,W/2,170,56,800,'#ffd166','center');
lines.forEach((s,i)=>txt(s,W/2,230+i*34,19,500,'#dbe7ee','center'))}
function draw(){demoTick();
const q=L[lv];
bg();
for(const x of q.x2?[q.x,q.x2]:[q.x]){g.fillStyle='rgba(95,211,161,.16)';g.fillRect(x[0],x[1],x[2],x[3]);
g.strokeStyle='#5fd3a1';g.lineWidth=2;g.strokeRect(x[0],x[1],x[2],x[3]);
txt('saída',x[0]+x[2]/2,x[1]+x[3]/2+6,16,500,'#5fd3a1','center')}
walls();
q.d.forEach((r,k)=>{const c=DC[k];if(op[k]){g.strokeStyle=c;g.globalAlpha=.5;g.setLineDash([6,6]);g.lineWidth=2;g.strokeRect(r[0],r[1],r[2],r[3]);g.setLineDash([]);g.globalAlpha=1}else{g.fillStyle=c;g.fillRect(r[0],r[1],r[2],r[3])}});
q.p.forEach(([a,b,k],i)=>{const c=DC[k];g.strokeStyle=c;g.fillStyle=c;g.lineWidth=3;
if(pr[i]){g.globalAlpha=.35;g.beginPath();g.arc(a,b,30+(tick%40)/4,0,7);g.stroke();g.globalAlpha=1;g.beginPath();g.arc(a,b,20,0,7);g.fill()}
else{g.beginPath();g.arc(a,b,20,0,7);g.stroke()}});
mech();mech2();
[...ecos.map(e=>[e,0]),...oecos.map(e=>[e,1])].forEach(([e,o],i)=>{const col='hsl('+((o?330:190)+i*45)+' 80% 65%)';
g.strokeStyle=col;g.globalAlpha=.35;g.lineWidth=3;g.beginPath();
for(let k=Math.max(0,tick-50);k<=tick;k++){const p=epos(e,k);k===Math.max(0,tick-50)?g.moveTo(p[0],p[1]):g.lineTo(p[0],p[1])}
g.stroke();const p=epos(e,tick);
chr(p[0],p[1],col,.75,p,epos(e,Math.max(0,tick-4)),0)});
g.globalAlpha=1;
chr(px,py,SKC(),co&&myFin?.35:1,[px,py],[px-fx,py-fy],1);if(co&&rp)chr(rp[0],rp[1],rcol===SV.col?'#5fb4f2':SKC(rcol),1,rp,rpp||rp,2);drawBot();drawPS();
g.restore();vig();if((MS.includes(state))||state==='lsel'||state==='ach'){drawMenu();drawLsel();drawAch();drawToast();return}mini();const f=1-tick/LN();g.fillStyle=f<.2?'#e0566b':'#ffd166';g.fillRect(0,0,W*f,6);
txt(q.dn+' '+q.ix+'/'+q.tot+': '+q.n,16,32,16,800,'#dbe7ee');
txt('Rodada '+round+'   Ecos '+ecos.length+'   '+Math.ceil((LN()-tick)/60)+' s',W-52,32,16,500,'#dbe7ee','right');
for(let i=0;i<q.ne;i++){const x=SX(i),c='hsl('+(190+i*45)+' 80% 65%)',e=ecos[i];g.lineWidth=sel===i?3:1.5;g.strokeStyle=sel===i?'#fff':e?c:'#3a5262';g.fillStyle=c;g.globalAlpha=e?.55:0;g.fillRect(x,44,16,16);g.globalAlpha=1;g.strokeRect(x,44,16,16);txt(''+(i+1),x+8,56,10,800,e?'#fff':'#6f8794','center')}
g.strokeStyle='#dbe7ee';g.lineWidth=1.5;g.strokeRect(W-40,10,28,28);g.fillStyle='#dbe7ee';g.fillRect(W-32,17,4,14);g.fillRect(W-24,17,4,14);
if(state==='ready'){txt(q.h,W/2,H-22,16,500,'#9fb4c1','center');txt(co?'Aguardando o outro jogador...':'Mova-se para começar a rodada.',W/2,H-46,16,800,'#ffd166','center')}
drawMenu();drawInfo();drawEnd();drawDone();drawLsel();drawAch();touchUI();drawToast();drawCo();
if(state==='fail')ov('Tempo esgotado',['Espaço: guardar esta rodada como eco','D: descartar e tentar de novo']);
if(state==='win')ov('Nível concluído',[L[lv+1]&&(L[lv+1].dn===q.dn||lv===0)?'Espaço: próximo nível':'Espaço: continuar','★'.repeat(ls)+'☆'.repeat(3-ls)]);

}
reset();goMenu();capt();
let last=performance.now(),acc=0;
function loop(t){acc+=Math.min(t-last,100);last=t;while(acc>=1000/60){step();acc-=1000/60}draw();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
