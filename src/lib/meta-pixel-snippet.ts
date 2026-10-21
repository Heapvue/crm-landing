// Builds the inline Meta base code for app/layout.tsx. Self-contained (no imports) so tests can run it.
// The snippet loads the pixel and sends the first PageView only on the production hosts, or when
// ?meta_debug=1 has been used in this browser session. lib/meta-events.ts applies the same rule.
export function buildMetaPixelSnippet(options: { pixelId: string; hosts: string[]; debugKey: string }) {
    const { pixelId, hosts, debugKey } = options;
    return `(function(){
var on=false;
try{
var q=new URLSearchParams(location.search).get('meta_debug');
if(q==='1')sessionStorage.setItem(${JSON.stringify(debugKey)},'1');
if(q==='0')sessionStorage.removeItem(${JSON.stringify(debugKey)});
on=q!=='0'&&sessionStorage.getItem(${JSON.stringify(debugKey)})==='1';
}catch(e){}
if(!on&&${JSON.stringify(hosts)}.indexOf(location.hostname)<0)return;
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(pixelId)});
fbq('track', 'PageView');
})();`;
}
