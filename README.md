# 60 Dagen Hapjesschema — Home Assistant

Een zelfstandige Nederlandse dashboardkaart voor Home Assistant, met een klikbaar 60-dagenoverzicht, een uitgelichte dagkaart en een verticale legenda. Geen helpers of extra integraties nodig.

## Direct openen in Home Assistant

[![Open de repository direct in Home Assistant Marketplace](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=Gietje00&repository=60-dagen-hapjesschema-card&category=plugin)

Klik op de knop om deze dashboardkaart in jouw Home Assistant Marketplace te openen. Daar kun je de kaart toevoegen/downloaden. Gebruik je een oudere Home Assistant-versie met HACS? [Open de repository in HACS](https://my.home-assistant.io/redirect/hacs_repository/?owner=Gietje00&repository=60-dagen-hapjesschema-card&category=plugin).

## Functies
- Start standaard met **dag 1** zodra je de kaart via de grafische kaartkiezer toevoegt.
- Pas de startdatum via de grafische editor aan; de dag wordt automatisch berekend.
- Toon de ingrediënten en hoeveelheden voor iedere dag.
- Markeer de huidige dag en klik op andere dagen om vooruit of terug te kijken.
- Toon/verberg de Vandaag-kaart en de verticale legenda.
- Past zich aan aan telefoon, tablet en desktop; stopt na dag 60.

## Installatie via HACS
1. Open **HACS** → menu **⋮** → **Aangepaste repositories**.
2. Voeg `https://github.com/Gietje00/60-dagen-hapjesschema-card` toe als type **Dashboard**.
3. Open de repository in HACS en kies **Downloaden** of **Installeren**.
4. Herlaad Home Assistant in de browser.
5. Open je dashboard → **Bewerken** → **Kaart toevoegen** → **60 Dagen Hapjesschema**.
6. Stel indien gewenst de startdatum in bij de kaartinstellingen.

## YAML
Wanneer je de kaart via de kaartkiezer toevoegt, wordt de startdatum automatisch opgeslagen. Voor handmatige YAML leg je die zelf vast:

```yaml
type: custom:hapjesschema-60-dagen-card
start_date: '2026-10-13'
show_today: true
show_legend: true
```

**Opmerking:** bij handmatig invoeren zonder `start_date` neemt de kaart de huidige datum als tijdelijke standaard, waardoor hij bij iedere paginaweergave op dag 1 begint.

## Handmatige installatie
Plaats `dist/60-dagen-hapjesschema-card.js` in `/config/www/60-dagen-hapjesschema-card.js` en voeg bij Home Assistant dashboardbronnen een JavaScript-module toe met URL `/local/60-dagen-hapjesschema-card.js`.

## Bron en gebruik
De iconen zijn eigen emoji/CSS-illustraties. De kaart is geen persoonlijk voedingskundig of medisch advies; overleg bij twijfel, zeker rond allergenen, met een deskundige.

Versie: **1.0.0**. De kaart staat onder `dist/`; er is geen buildstap nodig.
