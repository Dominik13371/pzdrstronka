(function() {
  const liczbaElement = document.getElementById('liczba'),
    wynikElement = document.getElementById('wynik').lastChild,
    jednostkiZElement = document.getElementById('jednostkiA'),
    jednostkiNaElement = document.getElementById('jednostkiB'),
    polaWyboruElement = document.querySelector('#polaWyboru');
  
  let konwertuj = debounce(konwerterJednostek, 1000);
  
  liczbaElement.addEventListener('input', konwertuj, false);
  polaWyboruElement.addEventListener('change', konwerterJednostek, false);
  
  function konwerterJednostek() {
    const liczbaUzytkownika = Number(liczbaElement.value);

    if (sprawdzPoprawnosc(liczbaUzytkownika)) {
      wypiszWynik(obliczJednostki(liczbaUzytkownika, pobierzJednostke(jednostkiZElement), pobierzJednostke(jednostkiNaElement)));
    } else {
      wypiszWynik();
    }
  }

  function sprawdzPoprawnosc(liczba) {
    return !Number.isNaN(liczba);
  }

  function wypiszWynik(wynik) {
    if (wynik) {
      wynikElement.textContent = liczbaElement.value + pobierzJednostke(jednostkiZElement) + " = " + wynik + pobierzJednostke(jednostkiNaElement);
    } else {
      wynikElement.textContent = "Niewłaściwy format!";
    }
  }

  function pobierzJednostke(listaWyboru) {
    const wartosc = listaWyboru.options[listaWyboru.selectedIndex].value;
    return wartosc;
  }

  function obliczJednostki(liczba, jednostka1, jednostka2) {
    const obliczone = liczba / ustawProporcje(jednostka1) * ustawProporcje(jednostka2);
    return Number(obliczone.toPrecision(5));
  }

  function ustawProporcje(jednostka) {
    let proporcja;
    switch (jednostka) {
      case 'km':
        proporcja = 0.001;
        break;
      case 'm':
        proporcja = 1;
        break;
      case 'dm':
        proporcja = 10;
        break;
      case 'cm':
        proporcja = 100;
        break;
      case 'mm':
        proporcja = 1000;
        break;
      default:
        return alert("Brak jednostki!");
    }
    return proporcja;
  }
 
 function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
})();