/**/_jsload2&&_jsload2('menu', 'x.object.extend(cd.prototype,{za:function(a,b){if(this.R)return t;this.P=a;this.Rl=b||s;this.Ha();var c=this,e=a.M.Ac;b&&b.K.of&&(e="pointer");this.R.style.cursor=e;this.Hd&&(this.Hd.style.cursor=e);x.V(document,"mousedown",function(){c.R&&c.aa()});x.V(this.R,"click",function(a){c.aa();oa(a)});e=this.m.cb;e||(e=a.cb);this.Rl?this.Rl.addEventListener("rightclick",function(a){c.R&&c.nJ(a)}):a.addEventListener("rightclickex",function(a){c.R&&(!a.yb&&!a.Fb)&&c.nJ(a)});for(var e=0,f=this.Da.length;e<f;e++)"menuitem"== this.Da[e].Pb&&this.Da[e].za(a,this),"divider"==this.Da[e].Pb&&(this.Je[this.Da[e].$j].U=Ib(this.R,"<div class=\'BMap_cmDivider\'></div>"));this.fs()},ob:function(){this.P&&(this.za(this.P,this.Rl),this.Vh&&(this.Vh=t,this.show()))},remove:function(){this.R&&(this.R.parentNode.removeChild(this.R),this.R=s);this.Hd&&(this.Hd.parentNode.removeChild(this.Hd),this.Hd=s);for(var a=0,b=this.Da.length;a<b;a++)"menuitem"==this.Da[a].Pb&&(this.Da[a].R=s);this.P=this.Rl=s},Ha:function(){this.R=Ib(this.P.cb,"<div unselectable=\'on\'></div>"); this.R.className="BMap_contextMenu";var a=this.R.style;a.font="12px "+J.fontFamily;9>x.ga.oa?this.Hd=Ib(this.P.cb,"<div class=\'BMap_cmShadow\'></div>"):a.wV=a.IP=a.WebkitBoxShadow="1px 2px 6px #666";return this.R},ks:function(a){if(a&&!("menuitem"!=a.Pb||""==a.nh||0>=a.mj)){for(var b=0,c=this.Da.length;b<c;b++)if(this.Da[b]===a)return;this.Da.push(a);this.Rf.push(a);this.P&&(a.za(this.P,this),x.U.ib(a.ed(),"BMap_cmLstItem"),1<this.Da.length?"menuitem"==this.Da[this.Da.length-2].Pb&&x.U.rc(this.Da[this.Da.length- 2].ed(),"BMap_cmLstItem"):"menuitem"==this.Da[0].Pb&&x.U.ib(this.Da[0].ed(),"BMap_cmFstItem"),this.fs())}},removeItem:function(a){if(a&&"menuitem"==a.Pb){for(var b=0,c=this.Da.length;b<c;b++)this.Da[b]===a&&(this.Da[b].remove(),this.Da.splice(b,1),c--);b=0;for(c=this.Rf.length;b<c;b++)this.Rf[b]===a&&(this.Rf[b].remove(),this.Rf.splice(b,1),c--);this.R&&(0<this.Da.length&&"menuitem"==this.Da[this.Da.length-1].Pb&&x.U.ib(this.Da[this.Da.length-1].ed(),"BMap_cmLstItem"),this.fs())}},YB:function(){this.Da.push({Pb:"divider", $j:this.Je.length});this.Je.push({U:s});this.R&&(this.Je[this.Je.length-1].U=Ib(this.R,"<div class=\'BMap_cmDivider\'></div>"),this.fs())},gF:function(a){if(this.Je[a]){this.Je[a].U&&this.Je[a].U.parentNode&&this.Je[a].U.parentNode.removeChild(this.Je[a].U);for(var b=0,c=this.Da.length;b<c;b++)this.Da[b]&&("divider"==this.Da[b].Pb&&this.Da[b].$j==a)&&(this.Da.splice(b,1),c--),this.Da[b]&&("divider"==this.Da[b].Pb&&this.Da[b].$j>a)&&this.Da[b].$j--;this.Je.splice(a,1);this.fs()}},va:function(a,b){this.R.style.left= a+"px";this.R.style.top=b+"px";this.Hd&&(this.Hd.style.left=a+1+"px",this.Hd.style.top=b+2+"px")},show:function(){if(this.Vh!=q&&0!=this.Rf.length){this.Vh=q;this.R&&(this.R.style.visibility="visible");this.Hd&&(this.Hd.style.visibility="visible");var a=new O("onopen");a.point=this.bx;a.pixel=this.As;this.dispatchEvent(a)}},aa:function(){if(this.Vh!=t){this.Vh=t;this.R&&(this.R.style.visibility="hidden");this.Hd&&(this.Hd.style.visibility="hidden");var a=new O("onclose");a.point=this.bx;a.pixel=this.As; this.dispatchEvent(a)}},O_:function(a){if(a&&(this.m.cursor=a,this.R&&(this.R.style.cursor=this.m.cursor),this.Hd))this.Hd.style.cursor=this.m.cursor},fs:function(){this.R&&this.Hd&&(this.Hd.style.width=this.R.offsetWidth+"px",this.Hd.style.height=this.R.offsetHeight+"px")},nJ:function(a){if(0!=this.Rf.length){this.As=a.ab;this.bx=this.P.sg(this.As);var b=this.ed().offsetHeight,c=this.ed().offsetWidth,e=a.ab.x,f=a.ab.y;a.ab.x+c>this.P.width&&(e=a.ab.x-c);a.ab.y+b>this.P.height&&(f=a.ab.y-b);this.va(e, f);this.show()}}});U(Xg,{addItem:Xg.ks,removeItem:Xg.removeItem,addSeparator:Xg.YB,removeSeparator:Xg.gF});x.object.extend(fd.prototype,{za:function(a,b){if(this.R)return t;this.P=a;this.Qh=b;b.ed()&&(this.Ha(),this.ha(),this.Th||(this.Th=q,this.disable()));return q},remove:function(){this.R&&(this.R.parentNode.removeChild(this.R),this.R=s);this.P=this.Qh=s},ob:function(){this.Qh&&this.P&&this.za(this.P,this.Qh)},Ha:function(){var a=this.m.Sm?"<div"+(this.m.id?" id=\'"+this.m.id+"\'":"")+" unselectable=\'on\'><div style=\'width: 17px;height: 17px;margin-right: 3px;display: inline-block;zoom: 1;*display: inline;vertical-align: middle;background: url("+ this.m.Sm+") no-repeat;\'></div><span style=\'vertical-align: middle;\'>"+this.nh+"</span></div>":"<div"+(this.m.id?" id=\'"+this.m.id+"\'":"")+" unselectable=\'on\'><span>"+this.nh+"</span></div>";this.R=Ib(this.Qh.ed(),a);this.m.Sm?(this.Gv=this.R.firstChild,this.as=this.R.lastChild):this.as=this.R;a=this.R.style;a.padding="2px 6px";a.margin="0 2px";a.fontSize="14px";a.MozUserSelect="none";a.lineHeight="17px";a.width=this.m.width+"px";this.Th?(a.color="#000",a.cursor="pointer"):(a.color="#aaa",a.cursor= this.P.M.Ac);return this.R},ha:function(){var a=this;x.V(this.R,"click",function(b){a.Th?a.Ez&&a.Ez.call&&a.Ez.call(a,a.Qh.bx,a.Qh.As,a.Qh.Rl):oa(b)});x.V(this.R,"mousedown",function(a){oa(a)});x.V(this.R,"mouseover",function(){a.Th&&(a.R.style.color="#6688cc")});x.V(this.R,"mouseout",function(){a.Th&&(a.R.style.color="#000")})},lu:function(a){a&&(this.nh=a+"",this.as&&(this.as.innerHTML="<span>"+this.nh+"</span>"))},Xb:function(a){a&&(this.m.Sm=a,this.Gv?this.Gv.style.background="url("+a+")":(this.R.innerHTML= "<div"+(this.m.id?" id=\'"+this.m.id+"\'":"")+" unselectable=\'on\'><div style=\'width: 17px;height: 17px;margin-right: 3px;display: inline-block;zoom: 1;*display: inline;vertical-align: middle;background: url("+this.m.Sm+") no-repeat;\'></div><span style=\'vertical-align: middle;\'>"+this.nh+"</span></div>",this.Gv=this.R.firstChild,this.as=this.R.lastChild))},enable:function(){this.Th=q;this.R&&(this.R.style.color="#000",this.R.style.cursor="pointer")},disable:function(){this.Th=t;this.R&&(this.R.style.color= "#aaa",this.R.style.cursor=this.P.M.Ac)}});U(Yg,{setIcon:Yg.Xb,setText:Yg.lu,enable:Yg.enable,disable:Yg.disable}); ');