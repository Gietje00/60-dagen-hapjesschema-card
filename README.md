# 60 Dagen Hapjesschema — Home Assistant

Een zelfstandige Nederlandse dashboardkaart voor Home Assistant, met een klikbaar 60-dagenoverzicht, een uitgelichte dagkaart en een verticale legenda. Geen helpers of extra integraties nodig.

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
De dagindeling is overgenomen van een door de gebruiker aangeleverde poster van *Mama Roos Kookt*. De iconen zijn eigen emoji/CSS-illustraties; dit is geen officiële uitgave van de maker van de poster. De kaart is geen persoonlijk voedingskundig of medisch advies; overleg bij twijfel, zeker rond allergenen, met een deskundige.

Versie: **1.0.0**. De kaart staat onder `dist/`; er is geen buildstap nodig.
