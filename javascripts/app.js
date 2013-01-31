(function(){"use strict";var e=typeof window!="undefined"?window:global;if(typeof e.require=="function")return;var t={},n={},r=function(e,t){return{}.hasOwnProperty.call(e,t)},i=function(e,t){var n=[],r,i;/^\.\.?(\/|$)/.test(t)?r=[e,t].join("/").split("/"):r=t.split("/");for(var s=0,o=r.length;s<o;s++)i=r[s],i===".."?n.pop():i!=="."&&i!==""&&n.push(i);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(n){var r=s(t),o=i(r,n);return e.require(o)}},u=function(e,t){var r={id:e,exports:{}};t(r.exports,o(e),r);var i=n[e]=r.exports;return i},a=function(e){var s=i(e,".");if(r(n,s))return n[s];if(r(t,s))return u(s,t[s]);var o=i(s,"./index");if(r(n,o))return n[o];if(r(t,o))return u(o,t[o]);throw new Error('Cannot find module "'+e+'"')},f=function(e){for(var n in e)r(e,n)&&(t[n]=e[n])};e.require=a,e.require.define=f,e.require.brunch=!0})(),window.require.define({"adapters/code_mash_adapter":function(e,t,n){var r;r=App.CodeMashSerializer.create(),r.configure(App.Session,{primaryKey:"SessionLookupId"}),r.configure(App.Speaker,{primaryKey:"LookupId"}),App.CodeMashAdapter=DS.RESTAdapter.extend({serializer:r}),App.CodeMashAdapter.configure("plurals",{session:"sessions.json",speaker:"speakers.json"})}}),window.moduleNames.push("adapters/code_mash_adapter"),window.require.define({"controllers/application":function(e,t,n){App.ApplicationController=Ember.Controller.extend()}}),window.moduleNames.push("controllers/application"),window.require.define({"controllers/days_controller":function(e,t,n){App.DaysIndexController=Ember.ArrayController.extend()}}),window.moduleNames.push("controllers/days_controller"),window.require.define({"controllers/index":function(e,t,n){App.IndexController=Ember.Controller.extend()}}),window.moduleNames.push("controllers/index"),window.require.define({"controllers/speaker_controller":function(e,t,n){App.SpeakerController=Ember.ObjectController.extend({loadedSessions:function(){return this.get("sessions").map(function(e){var t;return t=e.get("id").split("/").get("lastObject"),App.Session.find(t)})}.property("sessions")})}}),window.moduleNames.push("controllers/speaker_controller"),window.require.define({"helpers/pluralize":function(e,t,n){Ember.Handlebars.registerBoundHelper("pluralize",function(e,t){var n,r;return r="",e!=null&&e.get("firstObject.constructor")!=null&&(n=e.get("firstObject.constructor").toString().split(".").get("lastObject"),r=e.get("length")===1?n:""+n+"s",Ember.get(t,"hash.lowerCase")&&(r=r.toLowerCase())),r})}}),window.moduleNames.push("helpers/pluralize"),window.require.define({initialize:function(e,t,n){var r;window.App=Ember.Application.create(),t("initializers"),t("router"),r="models serializers adapters data helpers templates controllers views".w(),r.forEach(function(e){return window.moduleNames.filter(function(t){return(new RegExp("^"+e)).test(t)}).forEach(function(e){return t(e)})}),App.Store=DS.Store.extend({revision:11,adapter:App.CodeMashAdapter.create({namespace:"mashboard/data"})}),store.enabled?(App.set("localStorageEnabled",!0),App.set("savedSessions",App.SavedSessions.create())):App.set("localStorageEnabled",!1),App.initialize()}}),window.moduleNames.push("initialize"),window.require.define({initializers:function(e,t,n){Ember.Application.initializer({name:"setupData",initialize:function(e,t){var n,r,i,s=this;return App.deferReadiness(),r=App.Session.find({}),i=App.Speaker.find({}),n=App.Day.daysData.map(function(e){return App.Day.createRecord(e)}),r.then(function(){return r.forEach(function(e){return n.forEach(function(t){if(t.containsDate(e.get("start")))return t.get("sessions").pushObject(e)})}),i.then(function(){return e.optionsForType("days",{instantiate:!1,singleton:!0}),e.register("days","all",n),e.optionsForType("sessions",{instantiate:!1,singleton:!0}),e.register("sessions","all",r),e.optionsForType("speakers",{instantiate:!1,singleton:!0}),e.register("speakers","all",i),App.advanceReadiness()})})}}),Ember.Application.initializer({name:"injectData",after:"setupData",initialize:function(e){return e.injection("controller:application","days","days:all"),e.typeInjection("route","days","all:days"),e.injection("controller:application","sessions","sessions:all"),e.typeInjection("route","sessions","all:sessions"),e.injection("controller:application","speakers","speakers:all"),e.typeInjection("route","speakers","all:speakers")}})}}),window.moduleNames.push("initializers"),window.require.define({"models/day":function(e,t,n){App.Day=DS.Model.extend({date:DS.attr("date"),sessions:DS.hasMany("App.Session"),momentDate:function(){return moment.utc(this.get("date"))}.property("date"),weekDayLabel:function(){return this.get("momentDate").format("dddd")}.property("date"),shortWeekDayLabel:function(){return this.get("momentDate").format("ddd")}.property("date"),containsDate:function(e){var t;return t=this.get("momentDate"),moment(e).year()===t.year()&&moment(e).month()===t.month()&&moment(e).day()===t.day()},hours:function(){var e;return e=this.get("sessions").reduce(function(e,t){var n;return t.get("start")?(n=e.findProperty("hour",t.get("startMoment").hours()),n?n.get("sessions").pushObject(t):(n=App.Hour.createRecord({time:t.get("start")}),n.get("sessions").pushObject(t),e.pushObject(n)),e):e},[]),Ember.ArrayController.create({content:e,sortProperties:["hour"]})}.property("sessions")}),App.Day.reopenClass({daysData:[{id:"tuesday",date:"2013-01-08T00:00:00+00:00"},{id:"wednesday",date:"2013-01-09T00:00:00+00:00"},{id:"thursday",date:"2013-01-10T00:00:00+00:00"},{id:"friday",date:"2013-01-11T00:00:00+00:00"}]})}}),window.moduleNames.push("models/day"),window.require.define({"models/hour":function(e,t,n){App.Hour=DS.Model.extend({sessions:DS.hasMany("App.Session"),time:DS.attr("date"),timeMoment:function(){return moment(this.get("time"))}.property("time"),timeLabel:function(){return this.get("timeMoment").format("dddd, MMMM Do YYYY, h:mma")}.property("timeMoment"),shortTimeLabel:function(){return this.get("timeMoment").format("h:mma")}.property("timeMoment"),hour:function(){return this.get("timeMoment").hours()}.property("timeMoment")})}}),window.moduleNames.push("models/hour"),window.require.define({"models/saved_sessions":function(e,t,n){App.SavedSessions=Ember.Object.extend({sessionsUpdated:0,_savedSessionsKey:"savedSessionIds",_savedSessionSet:function(){var e;return(e=store.get(this._savedSessionsKey))?new Ember.Set(e):new Ember.Set},addSession:function(e){var t;return t=this._savedSessionSet(),t.add(e.get("id")),store.set("savedSessionIds",t.toArray()),this.incrementProperty("sessionsUpdated")},removeSession:function(e){var t;return t=this._savedSessionSet(),t.remove(e.get("id")),store.set("savedSessionIds",t.toArray()),this.incrementProperty("sessionsUpdated")},sessions:function(){var e;return e=store.get(this._savedSessionsKey),e==null?[]:Ember.ArrayController.create({content:store.get(this._savedSessionsKey).map(function(e){return App.Session.find(e)}),sortProperties:["start"]})}.property("sessionsUpdated")})}}),window.moduleNames.push("models/saved_sessions"),window.require.define({"models/session":function(e,t,n){App.Session=DS.Model.extend({title:DS.attr("string"),"abstract":DS.attr("string"),start:DS.attr("date"),end:DS.attr("date"),room:DS.attr("string"),difficulty:DS.attr("string"),speakerName:DS.attr("string"),technology:DS.attr("string"),uri:DS.attr("string"),eventType:DS.attr("string"),sessionLookupId:DS.attr("string"),speakerURI:DS.attr("string"),dateFomat:"h:mma",abstractCharacterLimit:150,difficultyLabelClass:function(){switch(this.get("difficulty")){case"Beginner":return"label-success";case"Intermediate":return"label-warning";case"Advanced":return"label-important";default:return""}}.property("difficulty"),dayLabel:function(){return moment(this.get("start")).format("dddd")}.property("start"),startMoment:function(){var e;return e=this.get("start"),Ember.isEmpty(e)?null:moment(e)}.property("start"),endMoment:function(){var e;return e=this.get("end"),Ember.isEmpty(e)?null:moment(e)}.property("end"),timeLabel:function(){var e;return e="",this.get("startMoment")&&(e+=this.get("startMoment").format(this.dateFomat)),this.get("endMoment")&&(e+=" - "+this.get("endMoment").format(this.dateFomat)+" "),e}.property("startMoment","endMoment"),length:function(){var e;return!this.get("startMoment")||!this.get("endMoment")?!1:e=this.get("endMoment").unix()-this.get("startMoment").unix()}.property("startMoment","endMoment"),lengthLabel:function(){return moment.duration(this.get("length"),"seconds").humanize()}.property("length"),speaker:function(){return App.Speaker.find(this.get("speakerURI").split("/").get("lastObject"))}.property("speakerURI"),shortenedAbstract:function(){var e;return(e=this.get("abstract"))!=null?e.slice(0,this.abstractCharacterLimit):void 0}.property("abstract"),hasMoreAbstract:function(){return this.get("abstract.length")>this.abstractCharacterLimit}.property("abstract"),hasAbstract:function(){return!Ember.isEmpty(this.get("abstract"))}.property("abstract"),isSaved:function(){return App.get("savedSessions.sessions").contains(this)}.property("App.savedSessions.sessions","App.savedSessions.sessionsUpdated")})}}),window.moduleNames.push("models/session"),window.require.define({"models/speaker":function(e,t,n){App.Speaker=DS.Model.extend({name:DS.attr("string"),biography:DS.attr("string"),speakerURI:DS.attr("string"),twitterHandle:DS.attr("string"),blogURL:DS.attr("string"),lookupId:DS.attr("string"),sessions:DS.hasMany("App.Session"),twitterUserName:function(){var e;return(e=this.get("twitterHandle"))!=null?e.replace(/^@/,""):void 0}.property("twitterHandle"),twitterURL:function(){return"http://twitter.com/"+this.get("twitterUserName")}.property("twitterUserName"),avatarURL:function(){return this.get("hasTwitterHandle")?"http://avatars.io/twitter/"+this.get("twitterUserName"):"images/codemash_bw.png"}.property("twitterUserName","hasTwitterHandle"),mediumAvatarURL:function(){return this.get("hasTwitterHandle")?"http://avatars.io/twitter/"+this.get("twitterUserName")+"?size=medium":"images/codemash_bw_medium.png"}.property("twitterUserName","hasTwitterHandle"),hasTwitterHandle:function(){return!Ember.isEmpty(this.get("twitterHandle"))}.property("twitterHandle")})}}),window.moduleNames.push("models/speaker"),window.require.define({router:function(e,t,n){App.Router.map(function(){return this.route("my_mashboard"),this.route("all"),this.resource("days"),this.resource("day",{path:"/days/:day_id"}),this.resource("sessions"),this.resource("session",{path:"/sessions/:session_id"}),this.resource("speakers"),this.resource("speaker",{path:"/speakers/:speaker_id"})}),App.AllRoute=Ember.Route.extend({setupController:function(e){return e.set("days",this.controllerFor("application").get("days"))}}),App.IndexRoute=Ember.Route.extend({redirect:function(){var e,t,n;return n=new Date,t=this.controllerFor("application").get("days"),e=t.find(function(e){return e.containsDate(n)}),e&&!App.get("redirected")?(App.set("redirected",!0),this.transitionTo("day",e)):this.transitionTo("all")},setupController:function(e,t){return e.set("days",this.controllerFor("application").get("days"))}}),App.DayRoute=Ember.Route.extend({exit:function(){return App.set("currentDay",null)},setupController:function(e,t){return App.set("currentDay",t),e.set("content",t)}}),App.SpeakerRoute=Ember.Route.extend({model:function(e){var t;return t=this.controllerFor("application").get("speakers"),t.findProperty("id",e.speaker_id)}}),App.MyMashboardRoute=Ember.Route.extend({model:function(){return App.get("savedSessions.sessions")},setupController:function(e,t){return e.set("sessions",t)}})}}),window.moduleNames.push("router"),window.require.define({"serializers/code_mash_serializer":function(e,t,n){App.CodeMashSerializer=DS.JSONSerializer.extend({extractMany:function(e,t,n,r){return n===App.Session?this._super(e,{"sessions.json":t},n,r):n===App.Speaker?this._super(e,{"speakers.json":t},n,r):this._super(e,t,n,r)},keyForAttributeName:function(e,t){var n;return n=t[0].toUpperCase(),""+n+t.slice(1)}})}}),window.moduleNames.push("serializers/code_mash_serializer"),window.require.define({"templates/all":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function c(e,t){var n="",i,s;return t.buffer.push("\n  "),i={},s={},i=r.view.call(e,"App.DayView",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+"\n"),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f=this.escapeExpression,l=this;return u={},a={},u=r.each.call(n,"days",{hash:u,inverse:l.noop,fn:l.program(1,c,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n"),o})}}),window.moduleNames.push("templates/all"),window.require.define({"templates/application":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function p(e,t){t.buffer.push("\n        Mashboard\n      ")}function d(e,t){var n="",i,s;return t.buffer.push('\n            <span aria-hidden="true" data-icon="&#xe000;"></span>\n            <span class="screen-reader-text">My Mashboard</span>\n            <span class="badge">\n              '),i={},s={},i=r._triageMustache.call(e,"App.savedSessions.sessions.length",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"\n            </span>\n          "),n}function v(e,t){var n="",i,s;return t.buffer.push("\n        "),i={},s={},s.contentBinding="STRING",i.contentBinding="this",s.tagName="STRING",i.tagName="li",s.classNames="STRING",i.classNames="day-label",i=r.view.call(e,"App.DayListItemView",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"\n      "),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f,l=this.escapeExpression,c=this,h=r.helperMissing;return s.buffer.push('<div class="container">\n  <div class="navbar clearfix">\n    <div class="navbar-inner">\n      '),u={},a={},a["class"]="STRING",u["class"]="brand",f=r.linkTo,u=f?f.call(n,"index",{hash:u,inverse:c.noop,fn:c.program(1,p,s),contexts:[n],types:["ID"],hashTypes:a,data:s}):h.call(n,"linkTo","index",{hash:u,inverse:c.noop,fn:c.program(1,p,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n      <ul class="nav">\n        <li>\n          '),u={},a={},a["class"]="STRING",u["class"]="my-mashboard-button",f=r.linkTo,u=f?f.call(n,"my_mashboard",{hash:u,inverse:c.noop,fn:c.program(3,d,s),contexts:[n],types:["ID"],hashTypes:a,data:s}):h.call(n,"linkTo","my_mashboard",{hash:u,inverse:c.noop,fn:c.program(3,d,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <section class="row-fluid row-fluid-first">\n    <div class="span12">\n      <ul class="nav nav-pills">\n      '),u={},a={},u=r.each.call(n,"days",{hash:u,inverse:c.noop,fn:c.program(5,v,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n      </ul>\n    </div>\n  </section>\n\n  "),u={},a={},u=r._triageMustache.call(n,"outlet",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+'\n\n  <footer>\n  <span class="sparkbox-icon" aria-hidden="true" data-icon="&#xe001;"></span>\n  <p class="footer-text">Powered by <a href="http://seesparkbox.com/" class="footer-link">Sparkbox</a></p>\n  <p class="footer-text">Created for Codemash 2013</p>\n  </footer>\n</div>\n'),o})}}),window.moduleNames.push("templates/application"),window.require.define({"templates/day":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function h(e,t){var n="",i,s,o;return t.buffer.push('\n  <div class="hour">\n    <div class="alert">\n        '),i={},s={},i=r._triageMustache.call(e,"sessions.length",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+" "),i={},s={},s.lowerCase="BOOLEAN",i.lowerCase=!0,o=r.pluralize,i=o?o.call(e,"sessions",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}):l.call(e,"pluralize","sessions",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+" starting at\n        "),i={},s={},i=r._triageMustache.call(e,"shortTimeLabel",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+"\n    </div>\n  </div>\n  "),i={},s={},s.titleOnly="BOOLEAN",i.titleOnly=!0,i=r.view.call(e,"App.SessionsView",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+"\n"),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f=this.escapeExpression,l=r.helperMissing,c=this;return u={},a={},u=r.each.call(n,"hours",{hash:u,inverse:c.noop,fn:c.program(1,h,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n"),o})}}),window.moduleNames.push("templates/day"),window.require.define({"templates/day_list_item":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function p(e,t){var n="",i,s;return t.buffer.push('\n  <span class="short-day">'),i={},s={},i=r._triageMustache.call(e,"shortWeekDayLabel",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+'</span>\n  <span class="long-day">'),i={},s={},i=r._triageMustache.call(e,"weekDayLabel",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"</span>\n"),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f,l=this.escapeExpression,c=this,h=r.helperMissing;return u={},a={},a.classNames="STRING",u.classNames="day-link",f=r.linkTo,u=f?f.call(n,"day","",{hash:u,inverse:c.noop,fn:c.program(1,p,s),contexts:[n,n],types:["STRING","ID"],hashTypes:a,data:s}):h.call(n,"linkTo","day","",{hash:u,inverse:c.noop,fn:c.program(1,p,s),contexts:[n,n],types:["STRING","ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n"),o})}}),window.moduleNames.push("templates/day_list_item"),window.require.define({"templates/grouped_sessions":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function p(e,t){var n="",i,s;return t.buffer.push("\n    "),i={},s={},i=r.view.call(e,"App.SessionView",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"\n  "),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f,l=this.escapeExpression,c=r.helperMissing,h=this;return s.buffer.push('<section>\n  <span>\n    <div class="alert alert-info clearfix">\n      <span class="pull-right">\n        Showing <strong>'),u={},a={},u=r._triageMustache.call(n,"sessions.length",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+"</strong> "),u={},a={},f=r.pluralize,u=f?f.call(n,"sessions",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}):c.call(n,"pluralize","sessions",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+"\n      </span>\n    </div>\n  </span>\n  "),u={},a={},u=r.each.call(n,"sessions",{hash:u,inverse:h.noop,fn:h.program(1,p,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n</section>\n"),o})}}),window.moduleNames.push("templates/grouped_sessions"),window.require.define({"templates/index":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f=this.escapeExpression;return s.buffer.push('\n<section class="row-fluid row-fluid-second">\n  '),u={},a={},u=r._triageMustache.call(n,"outlet",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(f(u)+"\n</section>\n"),o})}}),window.moduleNames.push("templates/index"),window.require.define({"templates/my_mashboard":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f,l=this.escapeExpression,c=r.helperMissing;return s.buffer.push('<div class="alert alert-info">\n  <span class="pull-right">\n    '),u={},a={},u=r._triageMustache.call(n,"sessions.length",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+" Saved "),u={},a={},f=r.pluralize,u=f?f.call(n,"sessions",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}):c.call(n,"pluralize","sessions",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+'\n  </span>\n  <div class="clearfix"></div>\n</div>\n'),u={},a={},u=r.view.call(n,"App.SavedSessionsView",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+"\n"),o})}}),window.moduleNames.push("templates/my_mashboard"),window.require.define({"templates/saved_session":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function c(e,t){var n="",i,s;return t.buffer.push("\n  "),i={},s={},s.collapseAbstract="BOOLEAN",i.collapseAbstract=!0,i=r.view.call(e,"App.SessionView",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+"\n"),n}function h(e,t){var n="",i,s;return t.buffer.push('\n  <div class="alert alert-warning">\n    Removed '),i={},s={},i=r._triageMustache.call(e,"title",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+' <a href="#" class="undo-mashboard"'),i={},s={},s.target="STRING",i.target="view",i=r.action.call(e,"undoRemoveSession","",{hash:i,contexts:[e,e],types:["ID","ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+">undo</a>\n  </div>\n"),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f=this.escapeExpression,l=this;return u={},a={},u=r["if"].call(n,"view.isSaved",{hash:u,inverse:l.program(3,h,s),fn:l.program(1,c,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n"),o})}}),window.moduleNames.push("templates/saved_session"),window.require.define({"templates/saved_sessions":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function c(e,t){var n="",i,s;return t.buffer.push("\n  "),i={},s={},i=r.view.call(e,"App.SavedSessionView",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+"\n"),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f=this.escapeExpression,l=this;return u={},a={},u=r.each.call(n,"sessions",{hash:u,inverse:l.noop,fn:l.program(1,c,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n"),o})}}),window.moduleNames.push("templates/saved_sessions"),window.require.define({"templates/session":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function p(e,t){var n="",i,s;return t.buffer.push('\n        <span class="label">'),i={},s={},i=r._triageMustache.call(e,"technology",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"</span>\n      "),n}function d(e,t){var n="",i,s;return t.buffer.push('\n        <h3 class="session-title">'),i={},s={},i=r._triageMustache.call(e,"title",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"</h3>\n      "),n}function v(e,t){var n="",i,s;return t.buffer.push("\n          <img "),i={},s={},s.src="STRING",i.src="speaker.avatarURL",i=r.bindAttr.call(e,{hash:i,contexts:[],types:[],hashTypes:s,data:t}),t.buffer.push(l(i)+' class="img-circle\n          speaker-avatar-small">\n          <span class="speaker-name-small">'),i={},s={},i=r._triageMustache.call(e,"speakerName",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"</span>\n        "),n}function m(e,t){var n="",i,s;return t.buffer.push('\n        <table class="table table-condensed session-info-table">\n          <tbody>\n            <tr>\n              <td>Room</td><td>'),i={},s={},i=r._triageMustache.call(e,"room",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"</td>\n            </tr>\n            <tr>\n              <td>Time</td><td>"),i={},s={},i=r._triageMustache.call(e,"dayLabel",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+" at "),i={},s={},i=r._triageMustache.call(e,"timeLabel",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"</td>\n            </tr>\n            "),i={},s={},i=r["if"].call(e,"length",{hash:i,inverse:c.noop,fn:c.program(8,g,t),contexts:[e],types:["ID"],hashTypes:s,data:t}),(i||i===0)&&t.buffer.push(i),t.buffer.push("\n          </tbody>\n        </table>\n        "),i={},s={},i=r["if"].call(e,"hasAbstract",{hash:i,inverse:c.noop,fn:c.program(10,y,t),contexts:[e],types:["ID"],hashTypes:s,data:t}),(i||i===0)&&t.buffer.push(i),t.buffer.push("\n      "),n}function g(e,t){var n="",i,s;return t.buffer.push("\n              <tr>\n                <td>Length</td><td>"),i={},s={},i=r._triageMustache.call(e,"lengthLabel",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"</td>\n              </tr>\n            "),n}function y(e,t){var n="",i,s;return t.buffer.push('\n          <p class="session-abstract">\n            '),i={},s={},i=r["if"].call(e,"view.collapseAbstract",{hash:i,inverse:c.program(19,T,t),fn:c.program(11,b,t),contexts:[e],types:["ID"],hashTypes:s,data:t}),(i||i===0)&&t.buffer.push(i),t.buffer.push("\n          </p>\n        "),n}function b(e,t){var n="",i,s;return t.buffer.push("\n              "),i={},s={},i=r["if"].call(e,"view.showAbstract",{hash:i,inverse:c.program(14,E,t),fn:c.program(12,w,t),contexts:[e],types:["ID"],hashTypes:s,data:t}),(i||i===0)&&t.buffer.push(i),t.buffer.push("\n            "),n}function w(e,t){var n="",i,s;return t.buffer.push("\n                  "),i={},s={},i=r._triageMustache.call(e,"abstract",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+'\n                <a href="#" class="hide-session-info" '),i={},s={},s.target="STRING",i.target="view",i=r.action.call(e,"clickedShowAbstract",{hash:i,contexts:[e],types:["STRING"],hashTypes:s,data:t}),t.buffer.push(l(i)+">\n                  hide\n                </a>\n              "),n}function E(e,t){var n="",i,s;return t.buffer.push("\n                "),i={},s={},i=r._triageMustache.call(e,"shortenedAbstract",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)),i={},s={},i=r["if"].call(e,"hasMoreAbstract",{hash:i,inverse:c.noop,fn:c.program(15,S,t),contexts:[e],types:["ID"],hashTypes:s,data:t}),(i||i===0)&&t.buffer.push(i),t.buffer.push("\n                "),i={},s={},i=r["if"].call(e,"hasMoreAbstract",{hash:i,inverse:c.noop,fn:c.program(17,x,t),contexts:[e],types:["ID"],hashTypes:s,data:t}),(i||i===0)&&t.buffer.push(i),t.buffer.push("\n              "),n}function S(e,t){t.buffer.push("...")}function x(e,t){var n="",i,s;return t.buffer.push('\n                  <a href="#" class="more-session-info" '),i={},s={},s.target="STRING",i.target="view",i=r.action.call(e,"clickedShowAbstract",{hash:i,contexts:[e],types:["STRING"],hashTypes:s,data:t}),t.buffer.push(l(i)+">\n                    more\n                  </a>\n                "),n}function T(e,t){var n="",i,s;return t.buffer.push("\n              "),i={},s={},i=r._triageMustache.call(e,"abstract",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"\n            "),n}function N(e,t){t.buffer.push('\n          <span aria-hidden="true" data-icon="&#xe000;"></span>\n          <span class="screen-reader-text">Remove from My Mashboard</span>\n        ')}function C(e,t){t.buffer.push('\n          <span aria-hidden="true" data-icon="&#xe000;"></span>\n          <span class="screen-reader-text">Add to My Mashboard</span>\n        ')}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f,l=this.escapeExpression,c=this,h=r.helperMissing;return s.buffer.push('<div class="well">\n  <div class="row-fluid">\n    <span class="span8">\n      <span class="label">'),u={},a={},u=r._triageMustache.call(n,"difficulty",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+"</span>\n      "),u={},a={},u=r["if"].call(n,"technology",{hash:u,inverse:c.noop,fn:c.program(1,p,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n      <span class="label">'),u={},a={},u=r._triageMustache.call(n,"eventType",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+"</span>\n      "),u={},a={},a["class"]="STRING",u["class"]="session-title",f=r.linkTo,u=f?f.call(n,"session","",{hash:u,inverse:c.noop,fn:c.program(3,d,s),contexts:[n,n],types:["STRING","ID"],hashTypes:a,data:s}):h.call(n,"linkTo","session","",{hash:u,inverse:c.noop,fn:c.program(3,d,s),contexts:[n,n],types:["STRING","ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n      <div>\n        "),u={},a={},a["class"]="STRING",u["class"]="speaker-profile-thumbnail",f=r.linkTo,u=f?f.call(n,"speaker","speaker",{hash:u,inverse:c.noop,fn:c.program(5,v,s),contexts:[n,n],types:["STRING","ID"],hashTypes:a,data:s}):h.call(n,"linkTo","speaker","speaker",{hash:u,inverse:c.noop,fn:c.program(5,v,s),contexts:[n,n],types:["STRING","ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n      </div>\n      "),u={},a={},u=r.unless.call(n,"view.titleOnly",{hash:u,inverse:c.noop,fn:c.program(7,m,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n    </span>\n    <span class="session-buttons span4 mashboard-button">\n      <a href="#" '),u={},a={},a.target="STRING",u.target="view",u=r.action.call(n,"toggleSavedSession",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+"\n        "),u={},a={},a["class"]="STRING",u["class"]=":btn isSaved::btn-primary",u=r.bindAttr.call(n,{hash:u,contexts:[],types:[],hashTypes:a,data:s}),s.buffer.push(l(u)+">\n        "),u={},a={},u=r["if"].call(n,"isSaved",{hash:u,inverse:c.program(23,C,s),fn:c.program(21,N,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n      </a>\n    </span>\n  </div>\n  <div class="clearfix"></div>\n</div>\n'),o})}}),window.moduleNames.push("templates/session"),window.require.define({"templates/session_labels":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function c(e,t){var n="",i,s;return t.buffer.push('\n  <span class="label">'),i={},s={},i=r._triageMustache.call(e,"technology",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+"</span>\n"),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f=this.escapeExpression,l=this;return s.buffer.push('<span class="label">'),u={},a={},u=r._triageMustache.call(n,"difficulty",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(f(u)+"</span>\n"),u={},a={},u=r["if"].call(n,"technology",{hash:u,inverse:l.noop,fn:l.program(1,c,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n<span class="label">'),u={},a={},u=r._triageMustache.call(n,"eventType",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(f(u)+"</span>\n"),o})}}),window.moduleNames.push("templates/session_labels"),window.require.define({"templates/sessions":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function c(e,t){var n="",i,s;return t.buffer.push("\n  "),i={},s={},s.classNames="STRING",i.classNames="session-detail",s.titleOnlyBinding="STRING",i.titleOnlyBinding="view.titleOnly",i=r.view.call(e,"App.SessionView",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(f(i)+"\n"),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f=this.escapeExpression,l=this;return u={},a={},u=r.each.call(n,"sessions",{hash:u,inverse:l.noop,fn:l.program(1,c,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n"),o})}}),window.moduleNames.push("templates/sessions"),window.require.define({"templates/speaker":function(e,t,n){n.exports=Ember.TEMPLATES[n.id.replace("templates/","")]=Ember.Handlebars.template(function(t,n,r,i,s){function p(e,t){var n="",i,s;return t.buffer.push("\n      <div>\n        <a "),i={},s={},s.href="STRING",i.href="twitterURL",i=r.bindAttr.call(e,{hash:i,contexts:[],types:[],hashTypes:s,data:t}),t.buffer.push(l(i)+' class="twitter-user-name">\n          @'),i={},s={},i=r._triageMustache.call(e,"twitterUserName",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"\n        </a>\n      </div>\n    "),n}function d(e,t){var n="",i,s,o;return t.buffer.push("\n      <li>\n        "),i={},s={},i=r.template.call(e,"session_labels",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"\n        "),i={},s={},s["class"]="STRING",i["class"]="session-link",o=r.linkTo,i=o?o.call(e,"session","",{hash:i,inverse:c.noop,fn:c.program(4,v,t),contexts:[e,e],types:["STRING","ID"],hashTypes:s,data:t}):h.call(e,"linkTo","session","",{hash:i,inverse:c.noop,fn:c.program(4,v,t),contexts:[e,e],types:["STRING","ID"],hashTypes:s,data:t}),(i||i===0)&&t.buffer.push(i),t.buffer.push("\n      </li>\n    "),n}function v(e,t){var n="",i,s;return t.buffer.push("\n          "),i={},s={},i=r._triageMustache.call(e,"title",{hash:i,contexts:[e],types:["ID"],hashTypes:s,data:t}),t.buffer.push(l(i)+"\n        "),n}r=r||Ember.Handlebars.helpers,s=s||{};var o="",u,a,f,l=this.escapeExpression,c=this,h=r.helperMissing;return s.buffer.push('<div class="speaker-detail">\n  <div class="row-fluid">\n    <img '),u={},a={},a.src="STRING",u.src="mediumAvatarURL",u=r.bindAttr.call(n,{hash:u,contexts:[],types:[],hashTypes:a,data:s}),s.buffer.push(l(u)+' class="img-circle pull-left speaker-avatar-medium">\n    <h1 class="speaker-name">'),u={},a={},u=r._triageMustache.call(n,"name",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+"</h1>\n    "),u={},a={},u=r["if"].call(n,"hasTwitterHandle",{hash:u,inverse:c.noop,fn:c.program(1,p,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n  </div>\n  <div class="row-fluid">\n  <p class="speaker-bio">\n   '),u={},a={},u=r._triageMustache.call(n,"biography",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+'\n  </p>\n  <ul class="speaker-nav nav-list">\n    <li class="nav-header">Speaking in '),u={},a={},u=r._triageMustache.call(n,"loadedSessions.length",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+" "),u={},a={},f=r.pluralize,u=f?f.call(n,"loadedSessions",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}):h.call(n,"pluralize","loadedSessions",{hash:u,contexts:[n],types:["ID"],hashTypes:a,data:s}),s.buffer.push(l(u)+"</li>\n    "),u={},a={},u=r.each.call(n,"loadedSessions",{hash:u,inverse:c.noop,fn:c.program(3,d,s),contexts:[n],types:["ID"],hashTypes:a,data:s}),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n  </ul>\n  </div>\n</div>"),o})}}),window.moduleNames.push("templates/speaker"),window.require.define({"views/application":function(e,t,n){App.ApplicationView=Ember.View.extend({classNames:"content"})}}),window.moduleNames.push("views/application"),window.require.define({"views/day":function(e,t,n){App.DayView=Ember.View.extend({templateName:"day"})}}),window.moduleNames.push("views/day"),window.require.define({"views/day_list_item":function(e,t,n){App.DayListItemView=Ember.View.extend({classNameBindings:["isActive:active"],templateName:"day_list_item",isActive:function(){return App.get("currentDay")===this.get("content")}.property("App.currentDay")})}}),window.moduleNames.push("views/day_list_item"),window.require.define({"views/grouped_sessions":function(e,t,n){App.GroupedSessionsView=Ember.View.extend({templateName:"grouped_sessions"})}}),window.moduleNames.push("views/grouped_sessions"),window.require.define({"views/saved_session":function(e,t,n){App.SavedSessionView=Ember.View.extend({undid:!1,undoCount:0,templateName:"saved_session",undoRemoveSession:function(){var e;return e=this.get("context"),App.get("savedSessions").addSession(e),this.set("undid",!0),this.incrementProperty("undoCount")},isSaved:function(){return this.get("context.isSaved")}.property("context.isSaved","undoCount","undid")})}}),window.moduleNames.push("views/saved_session"),window.require.define({"views/saved_sessions":function(e,t,n){App.SavedSessionsView=Ember.View.extend({templateName:"saved_sessions"})}}),window.moduleNames.push("views/saved_sessions"),window.require.define({"views/session":function(e,t,n){App.SessionView=Ember.View.extend({templateName:"session",showAbstract:!1,clickedShowAbstract:function(){return this.toggleProperty("showAbstract")},toggleSavedSession:function(){var e,t;return t=this.get("context"),e=App.get("savedSessions"),t.get("isSaved")?e.removeSession(t):e.addSession(t)}})}}),window.moduleNames.push("views/session"),window.require.define({"views/sessions":function(e,t,n){App.SessionsView=Ember.View.extend({templateName:"sessions"})}}),window.moduleNames.push("views/sessions"),window.require.define({"views/speaker":function(e,t,n){App.SpeakerView=Ember.View.extend()}}),window.moduleNames.push("views/speaker")