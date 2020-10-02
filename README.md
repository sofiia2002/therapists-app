# CALMSIE

## Wstęp

Witaj. Tu znajduje się aplikacja webowa, która prezentuje zwróconej j z endpointu listy terapeutów. 
<br/><br/>
Za pomocą tej aplikacji możesz filtrować wyniki według:
<ul>
 <li>Specjalizacji terapeutu</li>
 <li>Języków, którymi posługuje się terapeut</li>
 <li>Oceny terapeuta</li>
 <li>Przedziału cenowego konsultacji</li>
</ul>
Także można sortować wyniki według:
<ul>
  <li>Ceny (rosnąco lub malejąco)</li> 
  <li>Oceny (rosnąco lub malejąco)</li> 
</ul>
<br/>
Również można wyszukiwać wyniki według specjalizacji.
<br/><br/>
Aplikacja pozwala wybierać dowolnej opcji dla każdego z filtrów oraz aplikować jednocześnie kilka trybów sortowania wyników.
Zaaplikowane filtry można wyciśczyć za pomocą odpowiedniego przycisku.

## Zasady działania

### Renderowanie filtrów oraz sortowań

Przy tworzeniu danej aplikacji trzymałam się założenia, że kategorię filtrów są niezmienne, ale z czasem lista opcji specjaliyacji 
oraz języków może różnić się po dodawaniu doktorów do bazy danych lub ich wyrzuceniu z niej.
<br><br>
Dlatego inicjalizacja opcji specjalizacji oraz opcji wyboru języku są dodawane dynamicznie przy budowaniu strony: jest pobierana 
lista wszystkich doktorów oraz wyciągniecię unikalnych opcji każdego z filtrów, które są renderowane się na stronie. 
<br><br>
Opcji filtru ocen oraz wszystkiech sortowań są statyczne.

### Poszukiwanie oraz filtrowanie wyników

Aplikacja korzysta z routingu, wszystkie dane niezbędne do poszukiwanua są wskazane w ścieżce. 
<br><br>
Zrobione to zostało po to, żeby przy odświeżaniu strony wszyskie filtry, tryby sortowań, poszukiwane 
hasło oraz numer striny z wynikami nie były są tracone.
<br><br>
Poszukiwane hasło jest dodawane do ścieżki z moment kliknięcia przycisku Enter, a wszystkie fitry po
naoisnięciu przycisku "Apply". Podobie przy wyciścieniu filtrów (po nacisnięciu na "Clear") wszystkie
filtry oraz tryby sortowania są wyrzucane z ścieżki. 
<br><br>
Default'owo oraz jeżeli poszukiwane hasło jest puste, pokazywane są wszystkie wyniki.

### Pobieranie danych

Dane pobierane z serwera w momencie zmiany ścieżki (nie dotyczy opcji numeru strony) lub odświeżania strony 
(zabiezpieczenie przed dynamicznym dodawaniem danych do bazy danych, żeby użytkownik zawsze miał najnowszą wersje, 
to może być zmienione na pobiranie wyłącznie po odświeżeniu strony w przypadku gdy istnieje możliwość preciężenia 
serwera żądaniami). 

### Wyświetlanie wyników

Pobrane dane z serweru są filtrowane oraz sortowane w momencie otrzymania odpowiedzi z serwera ze strony front'u według 
zaaplikowanych użytkowniekiem na stronie, przeglądarka przechowuje tylko i wyłącznie wyniki obecnego poszukiwania i 
nie zawiera zbędnych danych.
<br><br>
Dane po podawane na stronę paczkami (według tego, na jakiej stronie znajduje się użytkowniek, oraz ile wyników zajdują 
się na jednej stronie).
<br><br>
Nie zwracając uwagi na to, że ścieżka zmienia się przy przejściu na następną lub poprzednią stronę, dane nie są pobierane
kolejny raz, odfiltrowane wyniki już są w pamieci, dlatego wynik jest po prostu obcinany w potrzebnym miejscu oraz oddawany
na renderowanie do kolejnego komponentu.

### Kalendarz

Do tworzenia kalendarzu została wykorzystana biblioteka 'v-calendar'. 
<br><br>
Kalendarz wyświetla wszystkie dostępne dni konsultacji w kalendarzu. 
<br><br>
Przy kliknięciu na odpowiedni dzień istnieje możliwość obejrzenia dostępnych godzin konsultacji.

### Uruchomienie
```
npm i
npm run serve
```

#### Z wyrazami szacunku, Levchenko Sonya
