# CALMSIE

## Wstęp

<p>Witaj. Tu znajduje się aplikacja webowa, która prezentuje zwróconej z endpointu listy terapeutów. 
<br><br>
Za pomocą tej aplikacji możesz wyszukiwać terapeutów według ich specjalizacji oraz <strong>filtrować</strong> wyniki według:
</p>
<ul>
  <li>Specjalizacji terapeutu</li>
  <li>Języków, którymi posługuje się terapeut</li>
  <li>Oceny terapeuta</li>
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

Przy tworzeniu aplikacji trzymałam się założenia, że nazwy kategorii filtrów są niezmienne, również, że z czasem listy opcji filtrów 
odpowiedzialnych za specjalizacji oraz języki mogą różnić się od obecnych (po dodawaniu doktorów do bazy danych lub wyrzuceniu z niej). 
Pozostałe listy opcji są statyczne.
<br><br>
Dlatego opcji kategorii specjalizacji oraz opcji kategorii wyboru języku dodawane są dynamicznie przy budowaniu strony: jest pobierana 
lista wszystkich doktorów oraz wyciągniecię unikalnych opcji każdej z kategorii filtrów, które są renderowane na stronie. 
<br><br>

### Poszukiwanie oraz filtrowanie wyników

Aplikacja korzysta z routingu, wszystkie dane niezbędne do poszukiwanua są wskazane w ścieżce. 
<br><br>
Zrobione to zostało po to, żeby przy odświeżaniu strony wszyskie filtry, tryby sortowań, poszukiwane hasło oraz numer strony z wynikami 
nie zostały stracone. Korzystanie ze ścieżki do przechowywania danych w danym przypadku pozwala lekko przerzucać między komponentami dane, 
podążać za zmianami filtrów bez konieczności tworzenia nowych funkcji które będą rządzić odświeżaniem pewnych komponentów, ładowaniem 
nowych danych itp. Również zmiana ścieżki w ciągu poszukiwania danych zapewnia lepszy user experience, można zobaczyć, że wszystko co 
zaznaczyłeś i odesłałeś naprawdę zostało zaaplikowane.
<br><br>
Default'owo oraz jeżeli poszukiwane hasło jest puste, pokazywane są wszystkie wyniki.

### Pobieranie danych

Dane pobierane z serwera w momencie zmiany ścieżki (nie dotyczy opcji numeru strony) lub odświeżania strony, co pozwala użytkownikowi
zawsze mieć najnowszej informacji z bazy danych, takie rozwiązanie również pozwala przechowywać tylko niezbędną informację, nie ma potrzeby
przechowywać w pamięci kopię pobranych danych.

### Wyświetlanie wyników

Pobrane dane z serweru są filtrowane oraz sortowane w momencie otrzymania odpowiedzi z serwera ze strony front'u według danych w ścieżce, 
przeglądarka przechowuje tylko i wyłącznie wyniki obecnego poszukiwania.
<br><br>
Dane podawane na stronę paczkami (według tego, na jakiej stronie znajduje się użytkowniek, oraz ile wyników znajdują się na jednej stronie).

### Kalendarz

Do tworzenia kalendarzu wykorzystałam biblioteki 'v-calendar'. 
<br><br>
Kalendarz wyświetla wszystkie dostępne dni konsultacji w kalendarzu. 
Po kliknięciu na odpowiedni wyświetlane są dostępne godzin konsultacji.

### Uruchomienie
```
npm i
npm run serve
```
