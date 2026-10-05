// Three-way progress merge: preserve remote edits unless this device changed that leaf.
// Arrays use stable curriculum indices. Deletions and false values remain meaningful.
(function(root){
  'use strict';
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const object=v=>v!==null && typeof v==='object';
  const copy=v=>v===undefined?undefined:JSON.parse(JSON.stringify(v));
  function merge(base,local,remote,path='') {
    if(same(base,local)) return copy(remote);
    // An unanswered new array slot is not an explicit undo of another device's answer.
    if(base===undefined&&local===false&&remote===true)return true;
    if(local===undefined) return undefined;
    if(path.endsWith('.best') && typeof local==='number' && typeof remote==='number') return Math.max(local,remote);
    if(!object(local)|| !object(remote)) return copy(local);
    const result=copy(remote);
    for(const key of new Set([...Object.keys(base||{}),...Object.keys(local)])) {
      if(['__proto__','constructor','prototype'].includes(key)) continue;
      const value=merge(base?.[key],local[key],remote[key],path+'.'+key);
      if(value===undefined) delete result[key]; else result[key]=value;
    }
    return result;
  }
  root.StudyCloudMerge={merge,same};
  if(typeof module!=='undefined') module.exports=root.StudyCloudMerge;
})(typeof window==='undefined'?globalThis:window);
