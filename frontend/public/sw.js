if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const o=e=>c(e,i),r={module:{uri:i},exports:t,require:o};s[i]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(a(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Rk1AV_1gpag-cG-vCqOtH/_buildManifest.js",revision:"6bc85e4173f018d75053fc848b309795"},{url:"/_next/static/Rk1AV_1gpag-cG-vCqOtH/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0c428ae2-3715bf17787d89fa.js",revision:"3715bf17787d89fa"},{url:"/_next/static/chunks/1a48c3c1-57b09a5c44fe3233.js",revision:"57b09a5c44fe3233"},{url:"/_next/static/chunks/1bfc9850-5dfd3d6e07cdd3c9.js",revision:"5dfd3d6e07cdd3c9"},{url:"/_next/static/chunks/249.5ec9e62df29169ab.js",revision:"5ec9e62df29169ab"},{url:"/_next/static/chunks/252f366e-79a993ef61fb41ad.js",revision:"79a993ef61fb41ad"},{url:"/_next/static/chunks/453-e36cc61fa5e0fa65.js",revision:"e36cc61fa5e0fa65"},{url:"/_next/static/chunks/698.16ba223dac9a3b3e.js",revision:"16ba223dac9a3b3e"},{url:"/_next/static/chunks/770-ef3736c7e3d77e40.js",revision:"ef3736c7e3d77e40"},{url:"/_next/static/chunks/78e521c3-12abaef2e7f452c2.js",revision:"12abaef2e7f452c2"},{url:"/_next/static/chunks/814c6784-ba4683768cce9d34.js",revision:"ba4683768cce9d34"},{url:"/_next/static/chunks/887-9733e932b3bcd0d9.js",revision:"9733e932b3bcd0d9"},{url:"/_next/static/chunks/902-11c559e6095c397c.js",revision:"11c559e6095c397c"},{url:"/_next/static/chunks/ae51ba48-4babae9c6b7d942b.js",revision:"4babae9c6b7d942b"},{url:"/_next/static/chunks/bee240a3-1ad89c2e3e5a9cc6.js",revision:"1ad89c2e3e5a9cc6"},{url:"/_next/static/chunks/d0c16330-6a9807743714224a.js",revision:"6a9807743714224a"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-e842d726cb62249f.js",revision:"e842d726cb62249f"},{url:"/_next/static/chunks/pages/404-d01c4f4668b80645.js",revision:"d01c4f4668b80645"},{url:"/_next/static/chunks/pages/_app-842f72d5382dd922.js",revision:"842f72d5382dd922"},{url:"/_next/static/chunks/pages/_error-f170ec85fda4fc04.js",revision:"f170ec85fda4fc04"},{url:"/_next/static/chunks/pages/album-b2b7437565f9954c.js",revision:"b2b7437565f9954c"},{url:"/_next/static/chunks/pages/album/%5BalbumId%5D-775a139ea7bba8ca.js",revision:"775a139ea7bba8ca"},{url:"/_next/static/chunks/pages/form-de7b84945d54d850.js",revision:"de7b84945d54d850"},{url:"/_next/static/chunks/pages/index-f696cc27eef027d0.js",revision:"f696cc27eef027d0"},{url:"/_next/static/chunks/pages/login-a809ea0c17f98cd7.js",revision:"a809ea0c17f98cd7"},{url:"/_next/static/chunks/pages/oauth-8bc155a8f463e0a1.js",revision:"8bc155a8f463e0a1"},{url:"/_next/static/chunks/pages/signup-a50e811ff38a635b.js",revision:"a50e811ff38a635b"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-433dcd2bbdcaf8b1.js",revision:"433dcd2bbdcaf8b1"},{url:"/_next/static/css/9f9de094e82fd93e.css",revision:"9f9de094e82fd93e"},{url:"/album.png",revision:"52f969cb18387994abd573fd9b8b65d1"},{url:"/defaultProfile.svg",revision:"307f85e9f71336aa665bdc684a599047"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/fonts/HSBombaram2.1.ttf",revision:"cdaf4e56372078e32c29b3a52648abf1"},{url:"/fonts/NotoSansKR-Bold.otf",revision:"301b54495f59794b03e047cabaf4b112"},{url:"/fonts/NotoSansKR-Medium.otf",revision:"3905cc7bd4a48b061b3d2477bf421235"},{url:"/fonts/NotoSansKR-Regular.otf",revision:"e5b5d37d379c1020aecfdfda0cffdb95"},{url:"/fonts/RIDIBatang.otf",revision:"d6425aff7a6c668739ea0383aed74b38"},{url:"/icons/apple-touch-icon-114x114.png",revision:"41c9dcb01c5b63bfd50f9db3ca90f833"},{url:"/icons/apple-touch-icon-120x120.png",revision:"d75c2ee3d9c128648afb1c3bc3bdbbdb"},{url:"/icons/apple-touch-icon-144x144.png",revision:"6e4bf7955b4f9d8d7df640a4d33b7598"},{url:"/icons/apple-touch-icon-152x152.png",revision:"be62e13dd0a6d3852a1a51a580b87e31"},{url:"/icons/apple-touch-icon-57x57.png",revision:"7f6e83afc1fc8ae6956f32370b2f6483"},{url:"/icons/apple-touch-icon-60x60.png",revision:"f4210c3105351a2c18e93ce679660310"},{url:"/icons/apple-touch-icon-72x72.png",revision:"eb9d6d7a982d7e23008d1fb9a6a21858"},{url:"/icons/apple-touch-icon-76x76.png",revision:"4a4c5c54025817c515cab68a8b3bf9fa"},{url:"/icons/code.txt",revision:"eebb453803092450b0d6471aa91be26d"},{url:"/icons/favicon-128.png",revision:"15e3c8e0b0d60c5f6be33bbed103cf6d"},{url:"/icons/favicon-16x16.png",revision:"751aeaca731bbf7a441b373e3313673f"},{url:"/icons/favicon-196x196.png",revision:"e5239734cd2a781370951fd2212f9a38"},{url:"/icons/favicon-32x32.png",revision:"13c26dc6e84645dca7e171d0f6218280"},{url:"/icons/favicon-512x512.png",revision:"5cb151f32c624c20e30c6ef9f1f5a376"},{url:"/icons/favicon-96x96.png",revision:"e68988833c670f7f609eeedf24819a52"},{url:"/icons/favicon.ico",revision:"25e7e1915e8053bc527283099b7e8a03"},{url:"/icons/ipad_splash.png",revision:"0251e1032638fb848a902283d54515af"},{url:"/icons/ipadpro1_splash.png",revision:"0f3287ee17cb49e75ae81be0a36908ae"},{url:"/icons/ipadpro2_splash.png",revision:"3875b1fbe38ab1c6d83273b48a94c5f5"},{url:"/icons/ipadpro3_splash.png",revision:"b6e9b33977aeaa107b0990883824ba02"},{url:"/icons/iphone5_splash.png",revision:"dcb51c5af498c4d434d39a5973f39356"},{url:"/icons/iphone6_splash.png",revision:"63634ecad68df46ea1b42b65ddd5ae25"},{url:"/icons/iphoneplus_splash.png",revision:"b8c2c440923251257f018549c21c58e4"},{url:"/icons/iphonex_splash.png",revision:"378060c32338d551e2524f309d2abb89"},{url:"/icons/iphonexr_splash.png",revision:"f4f76f016e23b95ce6cfdaeb9fe98ad0"},{url:"/icons/iphonexsmax_splash.png",revision:"570dd88015a5a6597fd8c52fb9f66341"},{url:"/icons/mstile-144x144.png",revision:"6e4bf7955b4f9d8d7df640a4d33b7598"},{url:"/icons/mstile-150x150.png",revision:"604a02ab1fc90b997b1f948af92ece23"},{url:"/icons/mstile-310x150.png",revision:"4848c5b07f48c800e2048bb6380afd8a"},{url:"/icons/mstile-310x310.png",revision:"47893d3ca1adc7a261b5418044fce621"},{url:"/icons/mstile-70x70.png",revision:"abdd0cfc7cc15636d0debe1d08793a79"},{url:"/logIn/kakao-login.png",revision:"0e5dbfea301e18e558da8c800ebe6769"},{url:"/manifest.json",revision:"5e4c17d9ac6562e1397929b8d4727602"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
