$wnd.jsme.runAsyncCallback10('var R7="data-selenium-id";x(253,241,{});function S7(){S7=z;T7=new fz("dragend",new U7)}function V7(a){a.a.cancelBubble=!0;ux(a.a)}function U7(){}x(254,253,{},U7);_.fe=function(){V7(this)};_.ie=function(){return T7};var T7;function W7(){W7=z;X7=new fz("dragenter",new Y7)}function Y7(){}x(255,253,{},Y7);_.fe=function(){V7(this)};_.ie=function(){return X7};var X7;function Z7(){Z7=z;$7=new fz("dragover",new a8)}function a8(){}x(256,253,{},a8);_.fe=function(){V7(this)};_.ie=function(){return $7};var $7;\nfunction b8(){b8=z;c8=new fz("drop",new d8)}function d8(){}x(257,253,{},d8);_.fe=function(a){var b,c,d,e;this.a.cancelBubble=!0;ux(this.a);d=(this.a.dataTransfer||null).files;e=0;a:for(;e<d.length;++e){if(0<a.a.d&&e>=a.a.d)break a;b=d[e];c=new FileReader;e8(c,a.a.b);1==a.a.c&&c.readAsText(b)}0==d.length&&(b=(this.a.dataTransfer||null).getData(ul),a.a.b.a.a.d.ob[Pl]=null!=b?b:n)};_.ie=function(){return c8};var c8;function f8(a,b,c){EA(!a.lb?a.lb=new RA(a):a.lb,c,b)}\nfunction g8(){this.ob=qx("file");this.ob[$h]="gwt-FileUpload"}x(381,362,Mm,g8);_.Be=function(a){zD(this,a)};function h8(a){var b=tx(ri);nr(gl,UZ(b));this.ob=b;this.b=new n0(this.ob);this.ob[$h]="gwt-HTML";m0(this.b,a,!0);v0(this)}x(385,386,Mm,h8);function i8(a,b){var c,d;c=tx(Il);d=tx(tl);d[xh]=a.a.a;d.style[Ql]=a.b.a;var e=(uC(),vC(d));c.appendChild(e);tC(a.d,c);LD(a,b,d)}function j8(){GE.call(this);this.a=(JE(),QE);this.b=(RE(),UE);this.e[Vh]=Ec;this.e[Uh]=Ec}x(434,378,Wm,j8);\n_.We=function(a){var b;b=sx(a.ob);(a=PD(this,a))&&this.d.removeChild(sx(b));return a};function k8(a){try{a.s=!1;var b,c,d;d=a.gb;c=a._;d||(a.ob.style[Rl]=Ti,a._=!1,a.hf());b=a.ob;b.style[cj]=0+(hy(),wk);b.style[Dl]=Fc;q2(a,VY(Fx($doc)+(Ex()-nx(a.ob,Zj)>>1),0),VY(Gx($doc)+(Dx()-nx(a.ob,Yj)>>1),0));d||((a._=c)?(a.ob.style[ci]=Jk,a.ob.style[Rl]=Sl,Ys(a.fb,200)):a.ob.style[Rl]=Sl)}finally{a.s=!0}}function l8(a,b){var c;c=(new g1(a)).wd.ig();c.ob.setAttribute(R7,"jsa_clipboard/button/"+b);return c}\nfunction m8(a){var b;b=l8("Close (ESC)","close");vD(b,new n8(a),(lz(),lz(),mz));return b}\nfunction o8(){d2();var a,b,c,d,e;C2.call(this,(V2(),W2),null,!0);this.tj();this.cb=!0;this.ob.setAttribute(R7,"jsa_clipboard/window");this.U=!0;a=new h8(this.e);this.d=new aG;this.d.ob.setAttribute(R7,"jsa_clipboard/text_area");pD(this.d,Pc);mD(this.d,Pc);V1(this,"400px");e=new j8;e.ob.style[Si]=Pc;e.e[Vh]=10;c=(JE(),KE);e.a=c;i8(e,a);i8(e,this.d);this.c=new YE;this.c.e[Vh]=20;for(b=this.rj(),c=0,d=b.length;c<d;++c)a=b[c],VE(this.c,a);i8(e,this.c);i2(this,e);s2(this,!1);vD(this.d,new p8(this),(Gz(),\nGz(),Hz));this.sj()}x(790,791,ZY,o8);_.rj=function(){return A(mG,o,50,[m8(this)])};_.sj=function(){var a=this.d;a.ob.readOnly=!0;var b=qD(a.ob)+"-readonly";lD(a.Je(),b,!0)};_.tj=function(){U2(this.H.b,"Copy")};_.hf=function(){B2(this);this.ob.style[Xl]=Tc};_.c=null;_.d=null;_.e="Press Ctrl-C (Command-C on Mac) or right click (Option-click on Mac) on the selected text to copy it, then paste into another program.";function p8(a){this.a=a}x(793,1,{},p8);\n_.qe=function(a){27==(a.a.keyCode||0)&&k2(this.a,!1)};_.a=null;function n8(a){this.a=a}x(794,1,{},n8);_.le=function(){k2(this.a,!1)};_.a=null;function q8(a){this.a=a}x(795,1,{},q8);\n_.Td=function(){rD(this.a.d.ob,!0);EE(this.a.d,!0);var a=this.a.d,b;b=ox(a.ob,Pl).length;if(0<b&&a.jb){if(0>b)throw new qS("Length must be a positive integer. Length: "+b);if(b>ox(a.ob,Pl).length)throw new qS("From Index: 0  To Index: "+b+"  Text Length: "+ox(a.ob,Pl).length);var a=a.ob,c=0;try{var d=a.createTextRange(),e=a.value.substr(c,b).match(/(\\r\\n)/gi);null!=e&&(b-=e.length);var f=a.value.substring(0,c).match(/(\\r\\n)/gi);null!=f&&(c-=f.length);d.collapse(!0);d.moveStart("character",c);d.moveEnd("character",\nb);d.select()}catch(g){}}};_.a=null;function r8(a){var b;b=l8(a.a,"accept");vD(b,new s8(a),(lz(),lz(),mz));return b}function t8(a){a.e="Paste the text to import into the text area below.";a.a="Accept";U2(a.H.b,"Paste")}function u8(a){d2();o8.call(this);this.b=a}x(797,790,ZY,u8);_.rj=function(){return A(mG,o,50,[r8(this),m8(this)])};_.sj=function(){mD(this.d,"150px")};_.tj=function(){t8(this)};_.hf=function(){B2(this);this.ob.style[Xl]=Tc;$w((Xw(),Yw),new v8(this))};_.a=null;_.b=null;\nfunction w8(a){d2();u8.call(this,a)}x(796,797,ZY,w8);_.rj=function(){var a;return A(mG,o,50,[r8(this),(a=new g8,a.ob.setAttribute(R7,"jsa_clipboard/button/browse_upload"),vD(a,new x8(this),(g_(),g_(),h_)),a),m8(this)])};_.sj=function(){mD(this.d,"150px");var a=new y8(this),b=this.d;f8(b,new z8,(W7(),W7(),X7));f8(b,new A8,(S7(),S7(),T7));f8(b,new B8,(Z7(),Z7(),$7));f8(b,new C8(a),(b8(),b8(),c8))};_.tj=function(){t8(this);this.e+=" Or drag and drop a file on it."};function x8(a){this.a=a}\nx(798,1,{},x8);_.ke=function(a){var b,c;b=new FileReader;a=(c=a.a.srcElement,c.files[0]);D8(b,new E8(this));b.readAsText(a)};_.a=null;function E8(a){this.a=a}x(799,1,{},E8);_.uj=function(a){YF(this.a.a.d,a)};_.a=null;x(802,1,{});x(801,802,{});_.b=null;_.c=1;_.d=-1;function y8(a){this.a=a;this.b=new F8(this);this.c=this.d=1}x(800,801,{},y8);_.a=null;function F8(a){this.a=a}x(803,1,{},F8);_.uj=function(a){this.a.a.d.ob[Pl]=null!=a?a:n};_.a=null;function s8(a){this.a=a}x(807,1,{},s8);\n_.le=function(){if(this.a.b){var a=this.a.b,b;b=new qJ(a.a,0,ox(this.a.d.ob,Pl));TP(a.a.a,b.a)}k2(this.a,!1)};_.a=null;function v8(a){this.a=a}x(808,1,{},v8);_.Td=function(){rD(this.a.d.ob,!0);EE(this.a.d,!0)};_.a=null;x(809,1,mn);_.ce=function(){var a,b;a=new G8(this.a);void 0!=$wnd.FileReader?b=new w8(a):b=new u8(a);X1(b);k8(b)};function G8(a){this.a=a}x(810,1,{},G8);_.a=null;x(811,1,mn);\n_.ce=function(){var a;a=new o8;var b=this.a,c,d;YF(a.d,b);c=(d=NS(b,"\\r\\n|\\r|\\n|\\n\\r"),d.length);1>=c&&(c=~~(b.length/16));mD(a.d,20*(10>c+1?c+1:10)+wk);$w((Xw(),Yw),new q8(a));X1(a);k8(a)};function D8(a,b){a.onload=function(a){b.uj(a.target.result)}}function e8(a,b){a.onloadend=function(a){b.uj(a.target.result)}}function C8(a){this.a=a}x(818,1,{},C8);_.a=null;function z8(){}x(819,1,{},z8);function A8(){}x(820,1,{},A8);function B8(){}x(821,1,{},B8);Z(802);Z(801);Z(818);Z(819);Z(820);Z(821);Z(253);\nZ(255);Z(254);Z(256);Z(257);Z(790);Z(797);Z(796);Z(810);Z(793);Z(794);Z(795);Z(807);Z(808);Z(798);Z(799);Z(800);Z(803);Z(385);Z(434);Z(381);U(XY)(10);\n//@ sourceURL=10.js\n')