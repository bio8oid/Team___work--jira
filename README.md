# WDP Projekt Zespołowy

Projekt grupowy tworzony w celach szkoleniowych. Tematem jest witryna sklepu tworzona na podstawie szablonów PSD załączonych do dokumentacji, oraz nauka pracy zespołowej.

| KURSANTÓW | PROWADZĄCYCH |
| --------- | ------------ |
|           |              |
| 4         | 4            |

DO UZUPEŁNIENIA

[LINK DO AKTUALNEJ WERSJI PROJEKTU](https://kodilla-wdp-1905-03.netlify.com/)

DO UZUPEŁNIENIA

## Inicjacja projektu

Po sklonowaniu projektu, zainstaluj wymagane paczki komendą `npm install`.

Teraz możesz zacząć pracę, korzystając z przygotowanych zadania `npm run watch`.

Wszystkie potrzebne do pracy pliki źródłowe znajdują się w folderze `src/`.

## NPM Scripts

Dostępne są 3 główne skrypty przyspieszające pracę:

- `build`: na bazie plików z folderu `src` buduje project w folderze `dist`
- `watch`: odpala `browser-sync`, obserwuje zmiany w folderze `src` i przebudowuje projekt
- `code-quality`: skrypt dokonuje automatycznego formatowania plików w folderze `src/`
  zgodnie z przyjętą konwencją formatowania kodu i sprawdza błędy w JS.

## Git Hooks

Projekt korzysta z Git Hooks - możliwości uruchamiania skryptów w reakcji na wybrane zdarzenia programu Git.

Za każdym razem gdy wykonasz komendę `git commit` zostanie uruchomiony skrypt `code-quality`
dla plików, które zostały wybrane do za-commit'owania.

## Konwencje i dobre praktyki

_Do uruchamiania sliderów opartych na FLICKITY w projekcie, został dodany plik sliders.js, natomiast opcje do pożądanego zachowania własnych implementacji dodajemy do pliku app.js bez usuwania istniejących już tam ustawień do innych sekcji witryny ;)_

**KODILLA moduł 22.1. Code review**

Pamiętaj, że code review nie jest szukaniem winnego ani atakiem na drugą osobę. Staraj się pisać tak, jak Ty chcesz żeby pisano do Ciebie. Staraj się nie wydawać poleceń, np. "zmień to na...", tylko chociaż czasem zadać pytanie czy podać sugestię, np. "Czy nie byłoby lepiej zmienić nazwę tej zmiennej na... żeby była podobna do innych?", albo "Ja bym raczej unikał takiego zapisu, bo to może być nieczytelne dla innych. Myślę, że lepiej będzie...".

Obrażanie się na uzasadniony code review, nie jest aż takie profesjonalne...podobnie jak robienie z grupowego projektu prywatnego folwarku :)
