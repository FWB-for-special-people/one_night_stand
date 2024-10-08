export const sharedPosts = [
  {
    id: 1,
    user: 'Anna Kowalska',
    image: 'js4.png',
    text: 'JS Life Hack: Używaj destrukturyzacji obiektów, aby szybko wyciągnąć wartości z obiektów. To skróci Twój kod i poprawi czytelność! Dzięki destrukturyzacji obiektów możesz uzyskać dostęp do wartości w prostszy sposób, co sprawia, że kod jest bardziej czytelny i mniej podatny na błędy. W praktyce oznacza to, że możesz szybciej edytować obiekty i lepiej zarządzać danymi w swojej aplikacji. Dobrze jest też używać destrukturyzacji w połączeniu z innymi nowoczesnymi funkcjami ES6, aby zwiększyć wydajność pracy.',
    dateAdded: '2024-10-01 09:10',
    category: 'JavaScript',
  },
  {
    id: 2,
    user: 'Tomasz Nowak',
    image: 'js1.jpg',
    text: 'React Tip: Zawsze używaj kluczy (`key`) dla elementów renderowanych w pętli. To pomoże Reactowi efektywnie zarządzać aktualizacjami DOM. Dzięki kluczom, React może szybko zidentyfikować, które elementy zmieniły się w trakcie renderowania. Używanie kluczy zapobiega niepotrzebnemu renderowaniu komponentów i poprawia wydajność aplikacji, szczególnie w dużych projektach, gdzie liczba renderowanych elementów dynamicznie się zmienia.',
    dateAdded: '2024-10-02 12:45',
    category: 'React',
  },
  {
    id: 3,
    user: 'Katarzyna Wiśniewska',
    image: 'js6.jpg',
    text: 'TypeScript Tip: Używaj unii typów (`|`), aby zdefiniować zmienne mogące przyjmować różne typy. To zwiększa elastyczność i bezpieczeństwo kodu! Dzięki unii typów, możemy uniknąć błędów typowania i tworzyć bardziej elastyczne funkcje, które działają na różnych typach danych. TypeScript sprawdza poprawność unii typów, dzięki czemu łatwiej unikać błędów na etapie kompilacji. Jest to szczególnie przydatne w złożonych aplikacjach z wieloma typami danych.',
    dateAdded: '2024-10-03 11:00',
    category: 'TypeScript',
  },
  {
    id: 4,
    user: 'Marek Zieliński',
    image: 'js5.jpg',
    text: 'JS Tip: Skorzystaj z operatora `??` (nullish coalescing), aby ustawić domyślną wartość, gdy zmienna jest `null` lub `undefined`. Ten operator jest idealny do obsługi wartości, które mogą być nieokreślone. Operator `??` działa podobnie jak `||`, ale różni się tym, że `??` bierze pod uwagę tylko wartości `null` i `undefined`, co jest bardziej precyzyjne w wielu przypadkach, takich jak liczby lub wartości logiczne.',
    dateAdded: '2024-10-04 14:30',
    category: 'JavaScript',
  },
  {
    id: 5,
    user: 'Joanna Kaczmarek',
    image: 'js3.jpg',
    text: 'React Life Hack: Używaj `React.memo`, aby zapobiec niepotrzebnemu renderowaniu komponentów, które nie zmieniają się między renderami. `React.memo` może znacznie poprawić wydajność aplikacji, szczególnie tam, gdzie mamy duże komponenty lub złożone struktury danych. Stosowanie `React.memo` pozwala na oszczędzanie zasobów systemowych, co przekłada się na lepsze działanie aplikacji, zwłaszcza w warunkach dużej ilości użytkowników.',
    dateAdded: '2024-10-05 16:20',
    category: 'React',
  },
  {
    id: 6,
    user: 'Grzegorz Dąbrowski',
    image: 'js7.png',
    text: 'TypeScript Tip: Używaj typu `unknown` zamiast `any` dla zmiennych o nieznanym typie. `unknown` wymusza dodatkową weryfikację, zanim coś zrobisz z wartością. To pozwala na lepszą kontrolę nad bezpieczeństwem kodu, ponieważ `any` może prowadzić do nieoczekiwanych błędów. TypeScript z typem `unknown` daje pewność, że kod jest bardziej bezpieczny, a wartości są sprawdzane przed ich użyciem, co zmniejsza liczbę błędów w aplikacji.',
    dateAdded: '2024-10-06 09:50',
    category: 'TypeScript',
  },
  {
    id: 7,
    user: 'Magdalena Woźniak',
    image: 'js10.jpg',
    text: 'JS Tip: Użyj `Array.from()` do szybkiego konwertowania obiektów iterowalnych, jak `NodeList`, na tablice. `Array.from()` upraszcza proces konwersji danych na tablice, co otwiera szerokie możliwości manipulowania danymi za pomocą metod takich jak `map`, `filter`, czy `reduce`. Jest to funkcja przydatna w sytuacjach, gdy chcemy szybko i efektywnie przetworzyć dane pobrane z DOM lub zewnętrznych źródeł.',
    dateAdded: '2024-10-07 11:40',
    category: 'JavaScript',
  },
  {
    id: 8,
    user: 'Paweł Zając',
    image: 'js8.jpg',
    text: 'React Tip: Zawsze używaj stanu w komponentach funkcyjnych za pomocą `useState` zamiast zarządzania stanem w konstruktorze w komponentach klasowych. Hooki, takie jak `useState`, upraszczają zarządzanie stanem i sprawiają, że komponenty są bardziej modularne. Użycie funkcji funkcyjnych zamiast klasowych w React jest aktualnym standardem, który ułatwia tworzenie bardziej elastycznych i łatwych w utrzymaniu aplikacji.',
    dateAdded: '2024-10-08 17:25',
    category: 'React',
  },
  {
    id: 9,
    user: 'Janina Pawlak',
    image: 'js9.jpg',
    text: 'TypeScript Tip: Użyj `Partial<Type>` do tworzenia wersji obiektów, w których wszystkie pola są opcjonalne. Świetne dla pracy z formularzami! `Partial` pozwala na tworzenie elastycznych obiektów, które można wypełniać stopniowo, co jest bardzo przydatne przy zarządzaniu danymi wejściowymi od użytkowników. To narzędzie ułatwia pracę z dużymi obiektami, których wszystkie właściwości nie muszą być zdefiniowane na etapie tworzenia.',
    dateAdded: '2024-10-09 15:15',
    category: 'TypeScript',
  },
  {
    id: 10,
    user: 'Łukasz Grabowski',
    image: 'js2.jpg',
    text: 'JS Tip: Skorzystaj z funkcji `reduce()` do agregowania wartości w tablicy. Idealne dla sumowania liczb lub łączenia obiektów. `Reduce` pozwala na zredukowanie tablicy do jednej wartości poprzez wykonywanie operacji na każdym jej elemencie, co czyni ją wszechstronnym narzędziem do przetwarzania danych. Jest to funkcja nieoceniona w pracy z dużymi zbiorami danych, gdy musimy przeprowadzać bardziej zaawansowane operacje na tablicach.',
    dateAdded: '2024-10-10 12:30',
    category: 'JavaScript',
  },
  {
    id: 21,
    user: 'Łukasz Grabowski',
    image: 'js2.jpg',
    text: 'Next.JS Tip: Next.js oferuje potężne funkcje takie jak automatyczne renderowanie po stronie serwera (SSR), co poprawia wydajność aplikacji. Dodatkowo, Next.js ma wbudowane wsparcie dla statycznego generowania stron (SSG), co sprawia, że Twoje aplikacje ładują się szybciej i lepiej indeksują w wyszukiwarkach. Next.js upraszcza również proces budowania stron dzięki prostej konfiguracji i wbudowanemu routerowi, co przyspiesza tworzenie aplikacji na dużą skalę.',
    dateAdded: '2024-10-10 12:30',
    category: 'Next.js',
  },
];
