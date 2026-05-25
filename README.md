# ubr3m.github.io
## Pastaba dėl failų dydžio

Kai kurių Kepler.gl žemėlapių eksportuoti failai buvo labai dideli, todėl jų nepavyko įkelti į GitHub įprastu būdu. 1 ir 3 žemėlapiai buvo suspausti į `.gz` formatą.

Pagrindinis `map_1.html` ir `map_3.html` failas atidaro atitinkamo žemėlapio `index.html` failą. Tada `index.html` naršyklėje automatiškai įkelia suspaustą `.html.gz` failą, jį išpakuoja naudojant `pako` biblioteką ir parodo Kepler.gl žemėlapį. Kol žemėlapis kraunamas, puslapyje rodomas tekstas „Kraunamas žemėlapis...“.

2 praktinio darbo antram žemėlapiui buvo pasirinktas ArcGIS Online, nes geoportal nepriėmė per didelio failo.