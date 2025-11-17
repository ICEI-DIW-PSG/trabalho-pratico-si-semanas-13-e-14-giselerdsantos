document.addEventListener("DOMContentLoaded", function () {
  // Banner do carrossel
  const carouselContainer = document.getElementById("carousel-content");
  if (carouselContainer) {
    fetch("http://localhost:3001/banners")
      .then(res => res.json())
      .then(banners => {
        banners.forEach((item, index) => {
          const div = document.createElement("div");
          div.className = `carousel-item ${index === 0 ? "active" : ""}`;
          div.innerHTML = `
            <a href="detalhes.html?id=${item.id}">
              <img src="${item.imagem}" class="d-block w-100" alt="${item.titulo}">
            </a>
            <div class="carousel-caption d-none d-md-block">
              <h5>${item.titulo}</h5>
              <p>${item.descricao}</p>
            </div>
          `;
          carouselContainer.appendChild(div);
        });
      });
  }

  // Cards de artigos
  const containerCards = document.getElementById("container-cards");
  if (containerCards) {
    fetch("http://localhost:3001/artigos")
      .then(res => res.json())
      .then(dados => {
        dados.forEach(item => {
          const card = document.createElement("div");
          card.className = "bloco";
          card.innerHTML = `
            <img src="${item.imagem}" alt="${item.titulo}">
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
            <a href="detalhes.html?id=${item.id}" class="btn">LEIA MAIS</a>
          `;
          containerCards.appendChild(card);
        });
      });
  }

  // Formulário de cadastro
  const form = document.getElementById("form-cadastro");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value;

      if (!nome || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
      }

      fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, senha })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Erro ao cadastrar");
          }
          return res.json();
        })
        .then(data => {
          alert("Usuário cadastrado com sucesso!");
          form.reset();
        })
        .catch(err => {
          console.error("Erro ao cadastrar:", err);
          alert("Erro ao cadastrar usuário.");
        });
    });
  }
});

// Função de busca
function buscar(event) {
  event.preventDefault();

  const termo = document.getElementById("campo-pesquisa").value.toLowerCase();
  const container = document.getElementById("container-cards");

  fetch("http://localhost:3001/artigos")
    .then(res => res.json())
    .then(dados => {
      const resultados = dados.filter(item =>
        item.titulo.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo)
      );

      container.innerHTML = "";

      if (resultados.length === 0) {
        container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
      }

      resultados.forEach(item => {
        const card = document.createElement("div");
        card.className = "bloco";
        card.innerHTML = `
          <img src="${item.imagem}" alt="${item.titulo}">
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <a href="detalhes.html?id=${item.id}" class="btn">LEIA MAIS</a>
        `;
        container.appendChild(card);
      });
    });
}