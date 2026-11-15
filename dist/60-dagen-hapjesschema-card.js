/**
 * 60 Dagen Hapjesschema Card — standalone Lovelace dashboard card.
 * Eigen illustraties; geen afbeeldingen of broncode van derden ingebed.
 * Schema is handmatig overgenomen van een door de gebruiker aangeleverde poster.
 * v1.1.0
 */
(() => {
  'use strict';

  const VERSION = '1.1.0';
  const TYPE = 'hapjesschema-60-dagen-card';
  const FOOD = {
    pompoen:        { label: 'Pompoen',        color: '#f1a311', emoji: '🎃' },
    wortel:         { label: 'Wortel',         color: '#f7ad45', emoji: '🥕' },
    pastinaak:      { label: 'Pastinaak',      color: '#d6cfab', emoji: '🥔' },
    zoete_aardappel:{ label: 'Zoete aardappel',color: '#f08b15', emoji: '🍠' },
    courgette:      { label: 'Courgette',      color: '#277a4a', emoji: '🥒' },
    bloemkool:      { label: 'Bloemkool',      color: '#ede6d8', emoji: '🥦' },
    paprika:        { label: 'Paprika',        color: '#df5b55', emoji: '🫑' },
    sperziebonen:   { label: 'Sperziebonen',   color: '#6eaa34', emoji: '🫛' },
    broccoli:       { label: 'Broccoli',       color: '#528e36', emoji: '🥦' },
    mango:          { label: 'Mango',          color: '#f8b65a', emoji: '🥭' },
    banaan:         { label: 'Banaan',         color: '#ffdb34', emoji: '🍌' },
    perzik:         { label: 'Perzik',         color: '#e88a65', emoji: '🍑' },
    peer:           { label: 'Peer',           color: '#cdd05c', emoji: '🍐' },
    kiwi:           { label: 'Kiwi',           color: '#91ae48', emoji: '🥝' },
    avocado:        { label: 'Avocado',        color: '#576d45', emoji: '🥑' },
    galia_meloen:   { label: 'Galiameloen',    color: '#efdb92', emoji: '🍈' },
    blauwe_bessen:  { label: 'Blauwe bessen',  color: '#496ac0', emoji: '🫐' },
    ei:             { label: 'Gekookt en gepureerd ei', color: '#dfb083', emoji: '🥚' },
    pindakaas:      { label: 'Pindakaas zonder stukjes en zonder suiker', color: '#b7824f', emoji: '🥜' }
  };

  // Elk array-item is één dag. Van dag 37 af bestaat een dag uit twee aparte hapjes.
  // herhaalde productcodes = meerdere blokjes van hetzelfde product, volgens de bronposter.
  const DAYS = [
    [['pompoen']], [['pompoen']], [['pompoen']],
    [['wortel']], [['wortel']], [['wortel']],
    [['pastinaak']], [['pastinaak']], [['pastinaak']],
    [['zoete_aardappel']], [['zoete_aardappel']], [['zoete_aardappel']],
    [['courgette']], [['courgette']], [['courgette','courgette']],
    [['bloemkool','bloemkool']], [['bloemkool','bloemkool']], [['bloemkool','bloemkool']],
    [['pompoen','pompoen']], [['wortel','wortel']],
    [['pastinaak','pastinaak']], [['zoete_aardappel','zoete_aardappel']],
    [['courgette','courgette']], [['bloemkool','bloemkool']],
    [['paprika','paprika']], [['paprika','paprika']], [['paprika','paprika']],
    [['sperziebonen','sperziebonen']], [['sperziebonen','sperziebonen']],
    [['sperziebonen','sperziebonen','pindakaas']],
    [['broccoli','broccoli','pindakaas']], [['broccoli','broccoli','pindakaas']],
    [['broccoli','broccoli','ei']], [['paprika','paprika','ei']],
    [['sperziebonen','sperziebonen','ei']], [['broccoli','sperziebonen']],
    [['mango','mango'],['zoete_aardappel','pindakaas']],
    [['mango','mango'],['wortel','broccoli']],
    [['mango','mango'],['bloemkool','zoete_aardappel']],
    [['banaan','banaan'],['wortel','broccoli']],
    [['banaan','banaan'],['paprika','courgette']],
    [['banaan','banaan'],['pompoen','sperziebonen','ei']],
    [['perzik','perzik'],['paprika','courgette']],
    [['perzik','perzik'],['pompoen','sperziebonen','pindakaas']],
    [['perzik','perzik'],['wortel','paprika','zoete_aardappel']],
    [['peer','peer'],['courgette','sperziebonen','bloemkool','ei']],
    [['peer','peer'],['wortel','paprika','zoete_aardappel']],
    [['peer','peer'],['courgette','sperziebonen','bloemkool']],
    [['kiwi','kiwi'],['courgette','pompoen']],
    [['kiwi','kiwi'],['broccoli','wortel']],
    [['kiwi','kiwi'],['pastinaak','pompoen']],
    [['avocado','avocado'],['courgette','broccoli']],
    [['avocado','avocado'],['bloemkool','zoete_aardappel','pindakaas']],
    [['avocado','avocado'],['sperziebonen','pastinaak','ei']],
    [['galia_meloen','galia_meloen'],['pastinaak','wortel']],
    [['galia_meloen','galia_meloen'],['sperziebonen','pompoen']],
    [['galia_meloen','galia_meloen'],['pastinaak','wortel']],
    [['blauwe_bessen','blauwe_bessen'],['pastinaak','pompoen','courgette']],
    [['blauwe_bessen','blauwe_bessen'],['paprika','courgette','bloemkool']],
    [['blauwe_bessen','blauwe_bessen'],['pastinaak','courgette','pindakaas']]
  ];

  if (DAYS.length !== 60) throw new Error('Het schema moet exact 60 dagen bevatten');

  const LEGEND = ['wortel','pompoen','bloemkool','zoete_aardappel','pastinaak','paprika','sperziebonen','courgette','avocado','broccoli','galia_meloen','blauwe_bessen','perzik','mango','banaan','kiwi','peer','ei','pindakaas'];
  const isoToday = (timeZone) => {
    try {
      return new Intl.DateTimeFormat('sv-SE', { timeZone: timeZone || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    } catch (_) {
      return new Intl.DateTimeFormat('sv-SE').format(new Date());
    }
  };
  const validDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || '') && !Number.isNaN(new Date(`${s}T12:00:00Z`).getTime()) && new Date(`${s}T12:00:00Z`).toISOString().slice(0,10) === s;
  const daysBetween = (a, b) => {
    const utc = (s) => { const [y,m,d] = s.split('-').map(Number); return Date.UTC(y,m-1,d); };
    return Math.round((utc(b)-utc(a))/86400000);
  };
  const formatDate = (d) => validDate(d) ? new Intl.DateTimeFormat('nl-NL', {day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${d}T12:00:00Z`)) : 'Niet ingesteld';
  const escapeHTML = (s) => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Zelfgetekende rode paprika (geen emoji of externe afbeelding nodig).
  const redPepper = "<svg class=\"pepper-svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M30 19C20 12 10 17 8 29c-3 15 4 29 13 29 5 0 8-3 11-3s6 3 11 3c9 0 16-14 13-29-2-12-12-17-22-10Z\" fill=\"#dc342f\" stroke=\"#9a2126\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/><path d=\"M30 20C17 19 16 31 18 43c1 6 4 11 7 14\" fill=\"none\" stroke=\"#f57558\" stroke-width=\"5\" stroke-linecap=\"round\" opacity=\".75\"/><path d=\"M35 20c12 0 13 12 11 23-1 6-4 11-7 14\" fill=\"none\" stroke=\"#ac2729\" stroke-width=\"4\" stroke-linecap=\"round\" opacity=\".6\"/><path d=\"M32 22c-3-8-1-12 4-16\" fill=\"none\" stroke=\"#287d37\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M31 22c-7-8-13-8-17-6 6 6 11 8 17 6Zm1 0c7-8 14-8 19-6-7 6-13 8-19 6Z\" fill=\"#4f9b42\" stroke=\"#287d37\" stroke-width=\"2\" stroke-linejoin=\"round\"/></svg>";
  const icon = (key, size = 'small') => {
    const f = FOOD[key];
    if (key === 'paprika') return `<span class="food-icon ${size}" title="${escapeHTML(f.label)}" aria-hidden="true">${redPepper}</span>`;
    return `<span class="food-icon ${size}" title="${escapeHTML(f.label)}" style="--food-color:${f.color}" aria-hidden="true"><span class="cube"></span><span class="food-emoji">${f.emoji}</span></span>`;
  };
  const foodGroup = (meal) => {
    const unique = [];
    meal.forEach(k => { const found=unique.find(x=>x.key===k); if (found) found.count++; else unique.push({key:k,count:1}); });
    return unique;
  };
  const foodText = (meal) => foodGroup(meal).map(({key,count})=>`${count > 1 ? `${count} blokjes` : '1 blokje'} ${FOOD[key].label.toLowerCase()}`).join(', ');
  const smallIcons = (meal) => {
    const items = foodGroup(meal);
    return `<div class="mini-foods">${items.slice(0,2).map(({key,count}) => `<span class="mini-food">${icon(key)}${count>1?`<b class="count">${count}</b>`:''}</span>`).join('')}${items.length>2?`<span class="more-food">+${items.length-2}</span>`:''}</div>`;
  };

  const STYLE = `
    :host{display:block;font-family:var(--primary-font-family,Inter,Arial,sans-serif);color:var(--primary-text-color,#273026)}
    *{box-sizing:border-box}button,input{font:inherit}button{cursor:pointer}
    ha-card{display:block;background:var(--ha-card-background,var(--card-background-color,#fff));border-radius:var(--ha-card-border-radius,20px);padding:18px;overflow:hidden}
    .head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:15px}
    .brand{display:flex;align-items:center;gap:11px;min-width:0}.brand-mark{background:#e7f0d7;color:#466e2a;border-radius:14px;width:44px;height:44px;display:grid;place-items:center;font-size:25px}
    h2{font-size:18px;font-weight:750;margin:0;letter-spacing:-.4px}.sub{font-size:12px;opacity:.66;margin:3px 0 0}
    .today-button{border:1px solid var(--divider-color,#d7ddce);background:transparent;border-radius:12px;padding:9px 13px;color:inherit;white-space:nowrap}
    .today-button:hover{background:var(--secondary-background-color,#edf2eb)}
    .layout{display:grid;grid-template-columns:minmax(0,1.9fr) minmax(200px,.78fr) minmax(205px,.82fr);gap:14px;align-items:stretch}
    .layout.no-legend{grid-template-columns:minmax(0,2fr) minmax(210px,.85fr)}
    .layout.no-today{grid-template-columns:minmax(0,2fr) minmax(220px,.8fr)}
    .layout.only-grid{grid-template-columns:1fr}
    .panel{border:1px solid var(--divider-color,#e5e8df);border-radius:17px;padding:14px;background:var(--card-background-color,#fff);min-width:0}
    .panel-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px}.panel-head strong{font-size:13px}.panel-head small{font-size:11px;opacity:.65}
    .days-grid{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:7px}
    .day{min-width:0;border:1.5px solid var(--divider-color,#d5d9d2);background:var(--ha-card-background,#fff);color:inherit;border-radius:999px;aspect-ratio:1;position:relative;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1px;transition:transform .1s,border-color .1s;outline-offset:2px;padding:4px}
    .day:hover{transform:translateY(-2px);border-color:#8aa75e}.day.past{background:color-mix(in srgb,#ddeabe 47%,var(--card-background-color,#fff))}
    .day.is-today{border:3px solid #507e31;box-shadow:0 0 0 2px #e2efca}.day.selected{background:#edf4db;outline:2px solid #92b64e;outline-offset:1px}
    .day-number{font-size:11px;font-weight:750;line-height:1}.day.is-today .day-number{color:#35591d}
    .mini-foods{display:flex;gap:0;justify-content:center;align-items:center;max-width:100%;height:22px}.mini-foods:has(+ .mini-foods){height:17px}
    .mini-food{display:inline-flex;position:relative;min-width:0;margin-left:-1px}.more-food{font-size:9px;font-weight:800;white-space:nowrap;line-height:1;color:#517b37}.count{position:absolute;bottom:-4px;right:-3px;font-size:8px;border-radius:9px;line-height:1;background:white;color:#527534;padding:1px 2px}
    .day .mini-foods .food-icon{height:20px;width:20px}.day .mini-foods .food-emoji{font-size:13px}.day .food-rows{display:flex;flex-direction:column;align-items:center;gap:0;max-height:36px}
    .food-icon{position:relative;display:inline-flex;align-items:center;justify-content:center;width:27px;height:27px;flex:none}
    .food-icon .cube{width:75%;height:72%;border-radius:4px;background:var(--food-color);border:1px solid #0002;box-shadow:inset 2px 2px #fff7,inset -2px -2px #0002;transform:rotate(-7deg)}
    .food-icon .food-emoji{position:absolute;font-size:17px;line-height:1;filter:drop-shadow(0 1px 1px #0002)}.food-icon.big{width:43px;height:43px}.food-icon.big .food-emoji{font-size:28px}
    .pepper-svg{width:100%;height:100%;display:block;filter:drop-shadow(0 1px 1px #0002)}
    .note{font-size:12px;line-height:1.45;background:#f2f6e8;color:#536340;border-radius:12px;padding:10px;margin-top:12px}
    .hero{display:flex;align-items:center;gap:8px;background:linear-gradient(125deg,#4d7734,#79974a);border-radius:14px;padding:14px;color:white}
    .hero .cal{font-size:25px}.hero strong{font-size:20px}.hero small{display:block;opacity:.88;margin-top:2px}
    .hero.focus{background:linear-gradient(125deg,#6b8b4f,#a0ae62)}
    .detail-head{font-size:13px;font-weight:700;margin:13px 0 8px}.food-line{display:flex;align-items:center;gap:8px;margin:8px 0;min-width:0}.food-line .label{font-size:13px;line-height:1.2;overflow-wrap:anywhere;flex:1;min-width:0}.amount{font-size:10.5px;font-weight:700;margin-left:auto;flex:none;white-space:nowrap;background:#e7f0d7;color:#416a2a;border-radius:999px;padding:4px 6px}
    .food-icons{display:inline-flex;gap:1px;align-items:center;flex:none}.food-icons .food-icon{height:24px;width:24px}.food-icons .food-emoji{font-size:15px}
    .portion-note{font-size:11px;color:var(--secondary-text-color,#66715c);margin:-1px 0 11px}
    .meal{padding:10px;border-radius:13px;background:var(--secondary-background-color,#f7f8f3);margin-bottom:8px}.meal-title{font-size:12px;font-weight:750;color:var(--primary-text-color,#34442c);margin:0 0 6px}
    .allergen{margin-top:10px;padding:10px;border-radius:11px;background:#faf1df;font-size:12px;color:#6d5431;line-height:1.5}.allergen b{display:block;margin-bottom:3px}
    .legend .legend-list{display:flex;flex-direction:column;gap:8px;max-height:740px;overflow:auto}.legend-item{display:flex;align-items:center;gap:7px;font-size:11.5px;line-height:1.25}.legend-item span:last-child{min-width:0}
    .legend .food-icon{width:25px;height:25px}.legend .food-emoji{font-size:16px}
    .foot{display:flex;align-items:center;justify-content:space-between;gap:6px;opacity:.65;margin-top:11px;font-size:10px}.muted{opacity:.7;font-size:12px;line-height:1.5}
    @media(max-width:1200px){.layout{grid-template-columns:minmax(0,1.5fr) minmax(200px,1fr)}.layout .legend{grid-column:1 / -1}.legend .legend-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));max-height:none}.layout.no-legend{grid-template-columns:minmax(0,1.5fr) minmax(200px,1fr)}}
    @media(max-width:1100px){.days-grid{grid-template-columns:repeat(6,minmax(0,1fr));gap:6px}.day .mini-foods .food-icon{width:19px;height:19px}.day .mini-foods .food-emoji{font-size:12px}.day .mini-foods{height:18px}}
    @media(max-width:720px){ha-card{padding:12px}.layout,.layout.no-legend,.layout.no-today{grid-template-columns:1fr}.layout .legend{grid-column:auto}.days-grid{grid-template-columns:repeat(5,minmax(0,1fr));gap:5px}.day{padding:4px;aspect-ratio:auto;height:56px}.day-number{font-size:11px}.day .mini-foods .food-icon{width:21px;height:20px}.day .mini-foods .food-emoji{font-size:13px}.day .mini-foods{height:20px}.day .food-rows{max-height:38px}.legend .legend-list{grid-template-columns:repeat(2,minmax(0,1fr))}.head{flex-wrap:wrap}}
    @media(max-width:420px){.day{height:55px}.day .mini-foods .food-icon{width:19px;height:18px}.day .mini-foods .food-emoji{font-size:11px}.day .mini-foods{height:18px}.day .food-rows{max-height:36px}.legend .legend-list{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){.day{transition:none}}
  `;

  class HapjesschemaCard extends HTMLElement {
    static getStubConfig() {
      // Startdatum wordt bij aanmaken vastgelegd in dashboardconfiguratie.
      return { start_date: isoToday(), show_today: true, show_legend: true };
    }
    static getConfigElement() { return document.createElement('hapjesschema-60-dagen-editor'); }
    constructor() { super(); this.attachShadow({mode:'open'}); this._selectedDay=null; this._zone=null; this._today=''; this._timer=null; }
    setConfig(config) {
      if (config.start_date != null && !validDate(config.start_date)) throw new Error('start_date moet een datum zijn, bijvoorbeeld 2026-11-15');
      this._config = { show_today:true, show_legend:true, ...config };
      this._selectedDay=null;
      this._render();
    }
    set hass(hass) {
      const zone=hass?.config?.time_zone || null;
      if(zone !== this._zone){ this._zone=zone;this._render(); }
    }
    connectedCallback(){ if(!this._timer){this._timer=setInterval(()=>{if(this._today!==isoToday(this._zone))this._render();},30000);}this._render(); }
    disconnectedCallback(){if(this._timer){clearInterval(this._timer);this._timer=null;}}
    getCardSize(){return 8;}
    getGridOptions(){return { columns:12, min_columns:6, rows:8, min_rows:5 };}
    _render() {
      if (!this._config) return;
      const today = isoToday(this._zone); this._today=today;
      const start = this._config.start_date || today;
      const elapsed=daysBetween(start,today);
      const currentDay = Math.min(60, Math.max(1,elapsed+1));
      const before=elapsed<0, done=elapsed>=60;
      const viewing=this._selectedDay || currentDay;
      const showToday=this._config.show_today !== false;
      const showLegend=this._config.show_legend !== false;
      const layoutClass = !showToday && !showLegend?'only-grid':!showToday?'no-today':!showLegend?'no-legend':'';
      const meals=DAYS[viewing-1];
      const title=before?'Nog niet gestart':done?'Schema afgerond':`Dag ${currentDay} van 60`;
      const progress=before?'Startdatum ligt in de toekomst':done?'Alle 60 dagen voltooid':`${Math.round(currentDay/60*100)}% van het schema`;
      const intro=!this._config.start_date?'Vul bij de kaartinstellingen een startdatum in om deze voor alle apparaten vast te leggen.':'Je kunt op een dag klikken om de hapjes te bekijken.';
      const grid=DAYS.map((dayMeals,i)=>{
        const n=i+1, isToday=!before&&!done&&n===currentDay, past=!before&&n<currentDay;
        return `<button class="day ${past?'past':''} ${isToday?'is-today':''} ${viewing===n?'selected':''}" data-day="${n}" aria-label="Dag ${n}: ${dayMeals.map(foodText).join('; ')}${isToday?' (vandaag)':''}" aria-pressed="${viewing===n}"><span class="day-number">${n}</span><span class="food-rows">${dayMeals.map(smallIcons).join('')}</span></button>`;
      }).join('');
      const mealBlock = (meal,i) => {
        const items=foodGroup(meal);
        return `<div class="meal"><div class="meal-title">${meals.length>1?`Hapje ${i+1}`:'Op het menu'}</div>${items.map(({key,count})=>`<div class="food-line"><span class="food-icons" aria-hidden="true">${Array.from({length:count},()=>icon(key)).join('')}</span><span class="label">${escapeHTML(FOOD[key].label)}</span><span class="amount">${key==='ei'||key==='pindakaas'?'zie onder':`${count} ${count===1?'blokje':'blokjes'} · ${count*10} g`}</span></div>`).join('')}</div>`;
      };
      const hasEgg=meals.some(m=>m.includes('ei'));
      const hasPeanut=meals.some(m=>m.includes('pindakaas'));
      const allergenInfo = `${hasEgg?'<div><b>🥚 Ei (gekookt en gepureerd)</b>1e keer: 1 tl · 2e keer: 1 el · vanaf de 3e keer: 2 el</div>':''}${hasPeanut?'<div><b>🥜 Pindakaas zonder stukjes of suiker</b>1e keer: ½ tl · 2e keer: 1 tl · vanaf de 3e keer: 3 tl</div>':''}`;
      const card = `<style>${STYLE}</style><ha-card>
        <header class="head"><div class="brand"><div class="brand-mark">🥕</div><div><h2>60 dagen hapjesschema</h2><p class="sub">Startdatum: ${escapeHTML(formatDate(start))} · ${escapeHTML(progress)}</p></div></div>${this._selectedDay?'<button class="today-button" data-action="today">Terug naar vandaag</button>':''}</header>
        <div class="layout ${layoutClass}">
          <section class="panel"><div class="panel-head"><strong>60 dagen overzicht</strong><small>${escapeHTML(title)}</small></div><div class="days-grid">${grid}</div><div class="note">${escapeHTML(intro)} ${before?'Het schema begint op de ingestelde startdatum.':done?'Je kunt eerdere dagen nog bekijken.':viewing>=37?'Vanaf dag 37 zijn het twee hapjes per dag.':''}</div></section>
          ${showToday?`<section class="panel"><div class="hero ${viewing!==currentDay?'focus':''}"><span class="cal">📅</span><span><strong>${viewing===currentDay&&!before?'Vandaag':`Dag ${viewing}`}</strong><small>${before?'Vooruitblik':done?'Voltooid':viewing===currentDay?`Dag ${viewing}`:`Geselecteerd: dag ${viewing}`}</small></span></div><div class="detail-head">${viewing===currentDay&&!before?'Vandaag op het menu':`Menu dag ${viewing}`}</div><div class="portion-note">1 blokje = 10 gram</div>${meals.map(mealBlock).join('')}${allergenInfo?`<div class="allergen">${allergenInfo}</div>`:''}${viewing>=37?'<div class="note">Vanaf dag 37: twee hapjes per dag, volgens het schema.</div>':''}</section>`:''}
          ${showLegend?`<section class="panel legend"><div class="panel-head"><strong>Legenda</strong><small>1 blokje = 10 gram</small></div><div class="legend-list">${LEGEND.map(key=>`<div class="legend-item">${icon(key)}<span>${escapeHTML(FOOD[key].label)}</span></div>`).join('')}</div></section>`:''}
        </div><div class="foot"><span>Schema overgenomen uit de aangeleverde 60-dagenposter</span><span>v${VERSION}</span></div>
      </ha-card>`;
      this.shadowRoot.innerHTML=card;
      this.shadowRoot.querySelectorAll('[data-day]').forEach(button=>button.addEventListener('click',()=>{ this._selectedDay=Number(button.dataset.day);this._render(); }));
      this.shadowRoot.querySelector('[data-action="today"]')?.addEventListener('click',()=>{this._selectedDay=null;this._render();});
    }
  }

  class HapjesschemaEditor extends HTMLElement {
    constructor(){super();this.attachShadow({mode:'open'});}
    setConfig(config){ this._config={show_today:true,show_legend:true,...config};this._render(); }
    set hass(hass) {this._hass=hass;}
    _changed(part) {this._config={...this._config,...part};this.dispatchEvent(new CustomEvent('config-changed',{detail:{config:{...this._config}},bubbles:true,composed:true}));}
    _render(){if(!this._config)return;
      const date=this._config.start_date || isoToday(this._hass?.config?.time_zone);
      this.shadowRoot.innerHTML=`<style>:host{display:block} .f{display:flex;flex-direction:column;gap:14px;padding:10px 0;font-family:var(--primary-font-family,Arial,sans-serif)}label{font-size:14px;display:flex;flex-direction:column;gap:6px}input[type=date]{font:inherit;background:var(--card-background-color,#fff);color:var(--primary-text-color,#222);border:1px solid var(--divider-color,#bbb);padding:10px;border-radius:9px;max-width:250px}.cb{display:flex;gap:9px;flex-direction:row;align-items:center}.help{color:var(--secondary-text-color,#666);font-size:12px;line-height:1.4}</style><div class="f"><label>Startdatum van dag 1 <input id="date" type="date" value="${escapeHTML(date)}"></label><span class="help">Standaard begint de kaart op de dag waarop je hem toevoegt. Kies een eerdere datum om automatisch bij de juiste dag uit te komen.</span><label class="cb"><input id="today" type="checkbox" ${this._config.show_today!==false?'checked':''}>Vandaag-kaart tonen</label><label class="cb"><input id="legend" type="checkbox" ${this._config.show_legend!==false?'checked':''}>Verticale legenda tonen</label></div>`;
      this.shadowRoot.getElementById('date').addEventListener('change',e=>{if(validDate(e.target.value))this._changed({start_date:e.target.value});});
      this.shadowRoot.getElementById('today').addEventListener('change',e=>this._changed({show_today:e.target.checked}));
      this.shadowRoot.getElementById('legend').addEventListener('change',e=>this._changed({show_legend:e.target.checked}));
    }
  }

  if(!customElements.get(TYPE))customElements.define(TYPE,HapjesschemaCard);
  if(!customElements.get('hapjesschema-60-dagen-editor'))customElements.define('hapjesschema-60-dagen-editor',HapjesschemaEditor);
  window.customCards=window.customCards || [];
  if(!window.customCards.some(c=>c.type===TYPE))window.customCards.push({type:TYPE,name:'60 Dagen Hapjesschema',description:'Een automatisch 60-dagen hapjesschema met actuele dag, ingrediënten en verticale legenda.',preview:true});
  console.info(`%c60 Dagen Hapjesschema %cv${VERSION}`, 'color:#628b34;font-weight:bold;', 'color:inherit;');
})();