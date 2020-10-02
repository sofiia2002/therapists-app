# CALMSIE

## Wstęp

Witaj. Tu znajduje się aplikacja webowa, która prezentuje zwróconej z endpointu listy terapeutów. 
<br/><br/>
Za pomocą tej aplikacji możesz wyszukiwać terapeutów według ich specjalizacji oraz <strong>filtrować</strong> wyniki według:
<ul>
  <li>Specjalizacji terapeuty</li>
  <li>Języków, którymi posługuje się terapeuta</li>
  <li>Oceny terapeuty</li>
  <li>Przedziału cenowego konsultacji</li>
</ul>
<p>
Również można wyniki <strong>sortować</strong> według:  
</p>
<ul>
  <li>Ceny (rosnąco lub malejąco)</li> 
  <li>Oceny (rosnąco lub malejąco)</li> 
</ul>

## Zasady działania

### Renderowanie filtrów oraz sortowań

Przy tworzeniu aplikacji trzymałam się założenia, że nazwy kategorii filtrów są niezmienne, również, że z czasem listy opce filtrów 
odpowiedzialnych za specjalizacji oraz języki mogą różnić się od obecnych (po dodaniu lub wyrzuceniu doktorów do bazy danych ). 
Pozostałe listy opcje są statyczne.
<br><br>
Dlatego opcji kategorii specjalizacji oraz opcji kategorii wyboru języku dodawane są dynamicznie przy budowaniu strony: jest pobierana 
lista wszystkich doktorów oraz zostają wyciągnięte unikalne opcje z każdej kategorii filtrów, które są wykorzystywane do renderowania na stronie.
<br><br>

### Poszukiwanie oraz filtrowanie wyników

Aplikacja korzysta z routingu, wszystkie dane niezbędne do poszukiwanua są umieścione w ścieżce.
<br><br>
Zrobione to zostało po to, żeby przy odświeżaniu strony wszyskie filtry, tryby sortowania, poszukiwane hasło oraz numer strony z wynikami 
nie zostały stracone. Korzystanie ze ścieżki do przechowywania danych w danym przypadku pozwala latwo przerzucać między komponentami dane, 
podążać za zmianami filtrów bez konieczności tworzenia nowych funkcji które będą rządzić odświeżaniem pewnych komponentów, ładowaniem 
nowych danych itp. Również zmiana ścieżki w ciągu poszukiwania danych zapewnia lepszy user experience, można zobaczyć, że wszystko co 
zostało zaznaczone i odesłane faktycznie zostało zaaplikowane.
<br><br>
Default'owo oraz jeżeli poszukiwane hasło jest puste, pokazywane są wszystkie wyniki.

### Pobieranie danych

Dane pobierane są z serwera w momencie zmiany ścieżki (nie dotyczy przechowywanego numeru strony) lub odświeżania strony, co pozwala użytkownikowi 
zawsze mieć najnowszej informacji z bazy danych, takie rozwiązanie również pozwala przechowywać tylko dane po filtracji (niezbędne do prezentacji
wyników poszukiwania) i nie trzymać kopii "czystych" danych.

### Wyświetlanie wyników

Pobrane dane z serwera są filtrowane oraz sortowane w momencie otrzymania odpowiedzi z serwera ze strony frontend'u według danych w ścieżce.
<br><br>
Dane wyświetlane są w kolejnych stronach, wyświetlających pewną ilość wyników (ilość jest podana w kodzie, defaultowo jest równa 7) w każdej z nich.

### Kalendarz

Do tworzenia kalendarzu wykorzystałam biblioteki 'v-calendar'. 
<br><br>
Kalendarz wyświetla wszystkie dostępne dni konsultacji. 
Po kliknięciu na odpowiedni dzień wyświetlane są dostępne godzin konsultacji.

### Uruchomienie
```
npm i
npm run serve
```
