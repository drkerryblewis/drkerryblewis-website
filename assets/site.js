var tourIdx = 1, tourTimer = null;
function tourShow(n){ tourIdx = n; document.querySelectorAll('.wh-slide').forEach(function(s2,i){ s2.style.display = (i===n-1 ? 'block' : 'none'); }); document.querySelectorAll('.wh-num').forEach(function(b,i){ b.classList.toggle('active', i===n-1); }); }
function tourNext(){ tourShow(tourIdx >= 7 ? 1 : tourIdx + 1); }
function tourStart(){ if(tourTimer) clearInterval(tourTimer); tourTimer = setInterval(tourNext, 6000); }
tourStart();
var heroEl = document.querySelector('.wh-hero');
if(heroEl){ heroEl.addEventListener('mouseenter', function(){ if(tourTimer) clearInterval(tourTimer); tourTimer = null; }); heroEl.addEventListener('mouseleave', tourStart); }
function whSearch(f){var q=f.q.value.trim();if(!q) return false;var found=false;try{found=window.find(q);}catch(e){}document.getElementById('wh-search-msg').textContent=found?'Found — highlighted on this page.':'No match on this page. Try About, Events, or Projects.';return false;}
function wlSubmit(f){var nm=document.getElementById('wl-name').value;var em=document.getElementById('wl-email').value;var un=document.getElementById('wl-user').value;if(!f.adult.checked){document.getElementById('wl-msg').textContent='Please confirm you are 18 or older.';return false;}var subject='Community Sign Up — '+un;var body='Name: '+nm+'\nEmail: '+em+'\nUsername wanted: '+un+'\n18 or older: Yes\n\nPlease sign me up for the Hollywood Chamber Community.';document.getElementById('wl-copy').value=body;document.getElementById('wl-gmail').href='https://mail.google.com/mail/?view=cm&to=the Contact Form on this site&su='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);document.getElementById('wl-fallback').style.display='block';document.getElementById('wl-msg').textContent='Thanks — if your email app did not open, use the Gmail link or Copy details below, then send them to the Contact Form on this site.';window.location.href='mailto:the Contact Form on this site?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);return false;}

        function makeLewisCard(){
          var n=document.getElementById('lc-name').value.trim();
          var e=document.getElementById('lc-email').value.trim();
          var u=document.getElementById('lc-user').value.trim();
          var ok=document.getElementById('lc-late').checked;
          var r=document.getElementById('lc-result');
          if(!n||!e||!u){r.style.display='block';r.innerHTML='<p>Please fill in your name, email, and username.</p>';return;}
          if(!ok){r.style.display='block';r.innerHTML='<p>Please check the late-charge understanding box.</p>';return;}
          var num='LEWIS-'+Math.floor(100000+Math.random()*900000);
          r.style.display='block';
          if(r.scrollIntoView){r.scrollIntoView();}
          r.innerHTML='<p><strong>Your Lewis Card request</strong></p><p>Name: '+n+'</p><p>Email: '+e+'</p><p>Username: '+u+'</p><p>Card: '+num+'</p><p>Cost: FREE. This is a signup request — your account will be confirmed by email. Real checkout and due-date tracking arrive in Phase 2.</p><p><a href="mailto:the Contact Form on this site?subject=Lewis%20Card%20Signup&body='+encodeURIComponent('Name: '+n+' | Email: '+e+' | Username: '+u+' | Card: '+num)+ '">Email my card details</a></p>';
        }
        

      (function () {
        (function () {
          var target = new Date('2026-11-03T09:00:00-08:00').getTime();
          function set(id, v) { var e = document.getElementById(id); if (e) e.textContent = (v < 10 ? '0' : '') + v; }
          function tick() {
            var d = target - Date.now(); if (d < 0) d = 0;
            set('cdD', Math.floor(d / 86400000));
            set('cdH', Math.floor(d / 3600000) % 24);
            set('cdM', Math.floor(d / 60000) % 60);
            set('cdS', Math.floor(d / 1000) % 60);
          }
          if (document.getElementById('cdD')) { tick(); setInterval(tick, 1000); }
        })();
        var currentPage = document.body.getAttribute('data-page') || 'home';
        var mainNav = document.getElementById('mainNav');
        var toggle = document.getElementById('navToggle');
        if (mainNav) { Array.prototype.forEach.call(mainNav.querySelectorAll('a'), function (a) {
          if (a.getAttribute('data-nav') === currentPage) { a.setAttribute('aria-current', 'page'); }
          else { a.removeAttribute('aria-current'); }
        }); }
        if (toggle && mainNav) { toggle.addEventListener('click', function () {
          var open = mainNav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        }); }
        if (location.hash) { var _el = document.getElementById(location.hash.replace('#', ''));
          if (_el) { setTimeout(function () { _el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60); } }

        // Reveal on scroll
        var revealEls = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
            });
          }, { threshold: 0.12 });
          revealEls.forEach(function (el) { io.observe(el); });
        } else {
          revealEls.forEach(function (el) { el.classList.add('in'); });
        }

        // Fox News ticker: duplicate the track once so the scroll loops seamlessly
        var tickerTrack = document.getElementById('tickerTrack');
        if (tickerTrack) { tickerTrack.innerHTML += tickerTrack.innerHTML; }


        // Days-remaining labels on the 2028 cycle cards
        Array.prototype.forEach.call(document.querySelectorAll('[data-days-to]'), function (el) {
          var days = Math.ceil((new Date(el.getAttribute('data-days-to')).getTime() - Date.now()) / 86400000);
          el.textContent = days > 0 ? days.toLocaleString('en-US') + ' days to go' : 'Today';
        });

        // Public comments board — starts empty; comments live on the board for this visit
        var commentForm = document.getElementById('commentForm');
        var commentBoard = document.getElementById('commentBoard');
        var commentCount = document.getElementById('commentCount');
        var formStatus = document.getElementById('formStatus');
        var postedCount = 0;
        if (commentForm && commentBoard) {
          commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = document.getElementById('cfName').value.trim();
            var hood = document.getElementById('cfHood').value;
            var text = document.getElementById('cfText').value.trim();
            if (!name || !hood || !text) {
              formStatus.textContent = 'Please add your name, choose your neighborhood, and write your comment.';
              return;
            }
            var empty = document.getElementById('boardEmpty');
            if (empty) { empty.remove(); }
            var card = document.createElement('article');
            card.className = 'comment-card';
            var meta = document.createElement('div');
            meta.className = 'comment-meta';
            var nameEl = document.createElement('span');
            nameEl.className = 'comment-name';
            nameEl.textContent = name;
            var hoodEl = document.createElement('span');
            hoodEl.className = 'comment-hood';
            hoodEl.textContent = hood;
            var whenEl = document.createElement('span');
            whenEl.className = 'comment-when';
            whenEl.textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            meta.appendChild(nameEl); meta.appendChild(hoodEl); meta.appendChild(whenEl);
            var bodyEl = document.createElement('p');
            bodyEl.className = 'comment-text';
            bodyEl.textContent = text;
            card.appendChild(meta); card.appendChild(bodyEl);
            commentBoard.insertBefore(card, commentBoard.firstChild);
            postedCount++;
            commentCount.textContent = '· ' + postedCount + (postedCount === 1 ? ' comment' : ' comments');
            commentForm.reset();
            formStatus.textContent = 'Posted — thank you. Your comment is on the board.';
          });
        }
      })();
    

(function(){
  var items=document.querySelectorAll('.watch-item');
  var box=document.getElementById('ev-slides');
  var dotsBox=document.getElementById('ev-dots');
  if(!items.length || !box) return;
  var slides=[];
  items.forEach(function(it, i){
    var slide=document.createElement('div');
    slide.className='ev-slide';
    slide.style.display='none';
    slide.style.textAlign='center';
    slide.innerHTML=it.innerHTML;
    box.appendChild(slide);
    slides.push(slide);
    var d=document.createElement('button');
    d.setAttribute('aria-label','Go to event '+(i+1));
    d.style.cssText='width:10px;height:10px;border-radius:50%;border:none;background:#555;cursor:pointer;padding:0;';
    d.addEventListener('click', function(){ show(i); restart(); });
    dotsBox.appendChild(d);
  });
  var idx=0, timer=null;
  function paint(){
    slides.forEach(function(s2, i){ s2.style.display = (i===idx) ? 'block' : 'none'; });
    Array.prototype.forEach.call(dotsBox.children, function(d, i){ d.style.background = (i===idx) ? '#ffc72c' : '#555'; });
  }
  function show(i){ idx=(i+slides.length)%slides.length; paint(); }
  function restart(){ if(timer) clearInterval(timer); timer=setInterval(function(){ show(idx+1); }, 5000); }
  document.getElementById('ev-prev').addEventListener('click', function(){ show(idx-1); restart(); });
  document.getElementById('ev-next').addEventListener('click', function(){ show(idx+1); restart(); });
  var rail=document.getElementById('event-slideshow');
  rail.addEventListener('mouseenter', function(){ if(timer) clearInterval(timer); timer=null; });
  rail.addEventListener('mouseleave', restart);
  show(0); restart();
})();


(function(){try{var a=localStorage.getItem('kl-terms-accepted');if(a==='1'){var g=document.getElementById('terms-gate');if(g){g.style.display='none';}}else{document.body.style.overflow='hidden';}}catch(e){}window.klAcceptTerms=function(){try{localStorage.setItem('kl-terms-accepted','1');}catch(e){}var g=document.getElementById('terms-gate');if(g){g.style.display='none';}document.body.style.overflow='';};window.klDeclineTerms=function(){window.location.href='https://www.google.com';};})();


(function(){
  var btn=document.getElementById('site-helper-btn');
  var panel=document.getElementById('site-helper-panel');
  var log=document.getElementById('site-helper-log');
  var form=document.getElementById('site-helper-form');
  var input=document.getElementById('site-helper-input');
  if(!btn||!panel||!log||!form||!input){return;}
  btn.addEventListener('click',function(){panel.style.display=(panel.style.display==='none'||panel.style.display==='')?'block':'none';if(panel.style.display==='block'){input.focus();}});
  function say(who,text,nav){
    var d=document.createElement('div');d.style.margin='0 0 12px';
    d.innerHTML='<p style="margin:0 0 2px;font-weight:800;font-size:12px;color:#ffc72c;">'+who+'</p><p style="margin:0;">'+text+'</p>';
    log.appendChild(d);
    if(nav){var b=document.createElement('button');b.type='button';b.textContent=nav.label;b.style.cssText='margin-top:6px;background:#1e6fd9;color:#fff;border:none;border-radius:999px;padding:7px 14px;font-size:13px;font-weight:800;cursor:pointer;';b.addEventListener('click',function(){var a=document.querySelector('a[data-nav="'+nav.view+'"]');if(a){a.click();}panel.style.display='none';window.scrollTo(0,0);});log.appendChild(b);}
    log.scrollTop=log.scrollHeight;
  }
  function answer(q){
    var t=(' '+q.toLowerCase()+' ');
    var has=function(){for(var i=0;i<arguments.length;i++){if(t.indexOf(arguments[i])!==-1){return true;}}return false;};
    if(has('live agent','live help','real person','human')){return {text:'Live Agent help is coming soon to Little Lewis. It is not live yet — there is no live chat here today. Until it launches, ask me anything here, or reach Dr. Kerry B. Lewis at the Contact Form on this site.',nav:null};}
    if(has('contact','email','reach','phone')){return {text:'You can reach Dr. Kerry B. Lewis through the Contact Form on this site. That address is also listed on this site for press and book orders.',nav:null};}
    if(has('council','meeting')){return {text:'That tab is now the Projects tab, with the Selma Avenue Elementary School Project inside it — a joint-use proposal with LAUSD, early talks only, no agreement and no dates yet.',nav:{label:'Open Projects',view:'council'}};}
    if(has('resource')){return {text:'A separate new Resources tab for all of California is on hold until Dr. Kerry B. Lewis names its content — it will not launch empty on November 1, 2026.',nav:null};}
    if(has('stay tuned','soon','something new','november 3','nov 3')){return {text:'The Stay Tuned tab has been removed from this site. The November 3, 2026 reveal it teased is no longer planned as a site tab.',nav:{label:'Open Home',view:'home'}};}
    if(has('congress','track congress')){return {text:'The Congress page has been removed from this site.',nav:null};}
    if(has('blog','macarthur','walk in my shoes','post')){return {text:'The News page closed on October 28, 2026, and the Lewis Idol page has been removed. Previous News posts are paused and are not currently on the site. An exclusive blog, WALK IN MY SHOES, is teased on the front page for Thursday, November 5, 2026, and is not live yet.',nav:{label:'Open Home',view:'home'}};}
    if(has('called 7','called seven')){return {text:'CALLED 7 is a horror mystery on the Books page. Chapters 1–4 are out now — read them free on the Books page.',nav:null};}
    if(has('dead end')){return {text:'DEAD END is listed on the Books page as coming in 2027, described as Dr. Kerry B. Lewis\u2019s first full book. No chapter text from it is published on this site.',nav:null};}
    if(has('book','make it or break it','jerking death','christmas room')){return {text:'The Books page is a bookstore shelf. MAKE IT OR BREAK IT has Chapters 1\u20134 published, and reading is free. The Books tab notice says the BOOK Tab is closing on November 15, 2026, and books move to Kindle from then. CALLED 7 Chapters 1–4 are out now, and DEAD END is listed as coming in 2027.',nav:null};}
    if(has('event','hollywood','showing','concert','show')){return {text:'Upcoming Events in Hollywood, CA, on the home page, lists 15 shows from October 24 to November 18, 2026, as theater playbills with a Now Showing slideshow above them. Dates and venues are listed on the page.',nav:{label:'Open Home Events',view:'home'}};}
    if(has('issue','issues')){return {text:'The Issues page has been removed from this site.',nav:null};}
    if(has('who','about','kerry','biography')){return {text:'The About page on this site describes Dr. Kerry B. Lewis as a business owner, author, and publisher based in Los Angeles. For the full About text, open the About page.',nav:{label:'Open About',view:'about'}};}
    if(has('term','privacy','accept','gate')){return {text:'Before entering this site, visitors accept its Terms of Use and Privacy Policy. The terms say this is a personal website, not a government website, governed by California law with disputes in Los Angeles County courts. The Privacy Policy is linked in the site footer.',nav:null};}
    if(has('waitlist','community','join','sign up')){return {text:'This site has a Sign Up section for the Hollywood Chamber Community on the home page. It asks for Name, Email, and Username, with a required 18+ checkbox. No ID is collected at signup, signups are requests for membership that Kerry approves before an account can sign in, and submissions go by email to the Contact Form on this site.',nav:{label:'Open Home Waitlist',view:'home'}};}
    return null;
  }
  function ask(q){
    if(!q){return;}
    say('You',q.replace(/</g,'&lt;'));
    var a=answer(q);
    if(a){say('Little Lewis',a.text,a.nav);}
    else{say('Little Lewis','I do not have a fixed answer for that one yet — but the site-only limit is gone, so keep asking. Try the About, Events, or Projects pages on drkerryblewis.org, or ask about Live Agent help, which is coming soon. You can also reach Dr. Kerry B. Lewis at the Contact Form on this site.',null);}
  }
  form.addEventListener('submit',function(e){e.preventDefault();var q=input.value.trim();input.value='';ask(q);});
  var chips=document.querySelectorAll('.sh-chip');
  for(var i=0;i<chips.length;i++){chips[i].addEventListener('click',function(){ask(this.getAttribute('data-q'));});}
})();


(function(){
  var b=document.getElementById('lc-btn');
  if(!b) return;
  b.addEventListener('click', function(){
    try{ if(typeof makeLewisCard==='function'){ makeLewisCard(); } }catch(err){
      var r=document.getElementById('lc-result');
      if(r){ r.style.display='block'; r.innerHTML='<p>Sorry, the card builder hit a problem. Please email your name, email, and username to <a href="mailto:the Contact Form on this site">the Contact Form on this site</a> with "Lewis Card" in the subject.</p>'; }
    }
  });
})();
