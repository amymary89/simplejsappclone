let pokemonRepository = (function () {
  let e = [],
    t = document.querySelector("#modal-container");
  function n() {
    return e;
  }
  function i(t) {
    e.push(t);
  }
  function l(e) {
    return fetch(e.detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrlFront = t.sprites.front_default),
          (e.imageUrlBack = t.sprites.back_default),
          (e.types = t.types),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.abilities = t.abilities);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  let a = document.querySelector(".modal");
  function o(e) {
    pokemonRepository.loadDetails(e).then(function () {
      r(e);
    });
  }
  function r(e) {
    let t = document.querySelector(".modal-content"),
      n = document.querySelector(".modal-body"),
      i = document.querySelector(".modal-title"),
      l = document.querySelector(".modal-header"),
      o = document.querySelector(".modal-footer");
    (i.innerHTML = ""), (n.innerHTML = "");
    let r = document.createElement("h1");
    var s = e.name
      .split(" ")
      .map(e => e.charAt(0).toUpperCase() + e.slice(1))
      .join(" ");
    r.innerHTML = "Name: " + s;
    let d = document.querySelector(".close"),
      c = document.createElement("img");
    c.classList.add("modal-img"),
      (c.src = e.imageUrlFront),
      (c.alt = "Front image of " + e.name);
    let p = document.createElement("img");
    p.classList.add("modal-img"),
      (p.src = e.imageUrlBack),
      (p.alt = "Back image of " + e.name);
    let m = document.createElement("p"),
      u = [e.types[0].type.name];
    for (let h = 1; h < e.types.length; h++)
      u.push(", " + e.types[h].type.name);
    m.innerHTML = "Types: " + u.join("");
    let f = document.createElement("p");
    f.innerHTML = "Height: " + e.height;
    let g = document.createElement("p");
    g.innerHTML = "Weigth: " + e.weight;
    let y = document.createElement("p"),
      L = [e.abilities[0].ability.name];
    for (let b = 1; b < e.abilities.length; b++)
      L.push(", " + e.abilities[b].ability.name);
    (y.innerHTML = "Abilities: " + L.join("")),
      l.appendChild(i),
      i.appendChild(r),
      l.appendChild(d),
      n.appendChild(c),
      n.appendChild(p),
      n.appendChild(m),
      n.appendChild(f),
      n.appendChild(g),
      n.appendChild(y),
      t.appendChild(l),
      t.appendChild(n),
      t.appendChild(o),
      a.appendChild(t),
      a.classList.add("is-visible");
  }
  function s() {
    t.classList.remove("is-visible");
  }
  function o(e) {
    l(e).then(function () {
      r(e);
    });
  }
  return (
    window.addEventListener("keydown", e => {
      "Escape" === e.key && t.classList.contains("is-visible") && s();
    }),
    a.addEventListener("click", e => {
      e.target === t && s();
    }),
    {
      add: i,
      getAll: n,
      addListItem: function e(t) {
        let n = document.querySelector(".list-group"),
          i = document.createElement("li");
        i.classList.add("list-group-item"), n.appendChild(i);
        let l = document.createElement("button");
        (l.innerHTML = t.name),
          i.appendChild(l),
          l.classList.add("btn", "btn-success"),
          l.setAttribute("data-target", "#exampleModal"),
          l.setAttribute("data-toggle", "modal"),
          (function e(t, n) {
            t.addEventListener("click", function () {
              o(n);
            });
          })(l, t);
      },
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              i({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: l,
      showDetails: o,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
