# CALMSIE

## Wstęp

Witaj. Tu znajduje się aplikacja webowa, która prezentuje zwróconą z endpointu listę terapeutów.

Za pomocą tej aplikacji możesz wyszukiwać terapeutów według ich specjalizacji oraz **filtrować** wyniki według:
* Specjalizacji terapeuty
* Języków, którymi posługuje się terapeuta
* Oceny terapeuty
* Przedziału cenowego konsultacji

Wyniki można również **sortować** według:
* Ceny (rosnąco lub malejąco)
* Oceny (rosnąco lub malejąco)

## Zasady działania

### Renderowanie filtrów oraz sortowań

Przy tworzeniu aplikacji trzymałam się założenia, że nazwy kategorii filtrów są niezmienne, oraz że z czasem listy opcji filtrów odpowiedzialnych za specjalizacji, oraz języki mogą różnić się od obecnych (po dodaniu lub wyrzuceniu lekarzy z bazy danych). Pozostałe listy opcji są statyczne.

Dlatego opcje kategorii specjalizacji, oraz opcje kategorii wyboru języka dodawane są dynamicznie przy budowaniu strony: pobierana jest lista wszystkich lekarzy oraz zostają wyciągnięte unikalne opcje z każdej kategorii filtrów, które są wykorzystywane do renderowania na stronie.

### Poszukiwanie oraz filtrowanie wyników

Aplikacja korzysta z routingu, wszystkie dane niezbędne do wyszukiwania są umieszczone w ścieżce.

Zrobione to zostało po to, żeby przy odświeżaniu strony wszyskie filtry, tryby sortowania, poszukiwane hasło oraz numer strony z wynikami nie zostały stracone. Korzystanie ze ścieżki do przechowywania danych w danym przypadku pozwala latwo przerzucać między komponentami dane, podążać za zmianami filtrów bez konieczności tworzenia nowych funkcji które będą rządzić odświeżaniem pewnych komponentów, ładowaniem nowych danych itp. Również zmiana ścieżki w ciągu poszukiwania danych zapewnia lepszy user experience, można zobaczyć, że wszystko co zostało zaznaczone i odesłane faktycznie zostało zaaplikowane.

Domyślnie, oraz jeżeli wyszukiwane hasło jest puste, pokazywane są wszystkie wyniki.

### Pobieranie danych

Dane pobierane są z serwera w momencie zmiany ścieżki (nie dotyczy przechowywanego numeru strony) lub odświeżania strony, co pozwala użytkownikowi zawsze mieć najnowsze informacje z bazy danych. Takie rozwiązanie również pozwala przechowywać tylko dane po filtrowaniu (niezbędne do prezentacji wyników wyszukiwania) i uniknąć trzymania kopii "czystych" danych.

### Wyświetlanie wyników

Pobrane dane z serwera są filtrowane oraz sortowane w momencie otrzymania odpowiedzi z serwera ze strony frontend'u według danych w ścieżce.

Dane wyświetlane są w kolejnych stronach, wyświetlających pewną ilość wyników (ilość jest podana w kodzie, defaultowo jest równa 7) w każdej z nich.

### Kalendarz

Do tworzenia kalendarza wykorzystałam bibliotekę 'v-calendar'.

Kalendarz wyświetla wszystkie dostępne dni konsultacji. Po kliknięciu na odpowiedni dzień wyświetlane są dostępne godziny konsultacji.

### Uruchomienie
```
npm i
npm run serve
```
