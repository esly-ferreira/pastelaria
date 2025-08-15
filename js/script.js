// =======================
// CURSOR SUAVE SEGUINDO O MOUSE
// =======================
(() => {
  const cursor = document.querySelector(".cursor");
  let mouseX = 0,
    mouseY = 0;
  let posX = 0,
    posY = 0;
  const speed = 0.1;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    cursor.style.left = `${posX}px`;
    cursor.style.top = `${posY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();

// =======================
// TROCA DE IMAGENS COM FADE
// =======================
(() => {
  const imagens = [
    "./imgs/goku.png",
    "./imgs/sasuke.png",
    "./imgs/naruto.png",
    "./imgs/picolo.png",
  ];
  let index = 0;
  const imgElement = document.getElementById("troca-img");

  setInterval(() => {
    imgElement.classList.add("hide"); // fade out
    setTimeout(() => {
      index = (index + 1) % imagens.length;
      imgElement.src = imagens[index];
      imgElement.classList.remove("hide"); // fade in
    }, 500);
  }, 5000);
})();

// =======================
// FUNDO COM MOVIMENTO PARALLAX
// =======================
(() => {
  const bgImg = document.querySelector(".bg-img");
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    bgImg.style.transform = `translate(${x}px, ${y}px)`;
  });
})();

// =======================
// CARRINHO DE COMPRAS
// =======================
(() => {
  const carrinho = {};
  const listaCarrinho = document.getElementById("lista-carrinho");
  const notificacao = document.getElementById("carrinho-notificacao");
  const barraPedido = document.getElementById("barra-pedido");
  const totalCarrinhoEl = document.getElementById("total-carrinho");

  const modalPedido = document.getElementById("modal-pedido");
  const enviarPedidoBtn = document.getElementById("enviar-pedido");
  const confirmarPedidoBtn = document.getElementById("confirmar-pedido");
  const cancelarPedidoBtn = document.getElementById("cancelar-pedido");

  const parsePreco = (str) =>
    parseFloat(str.replace("R$ ", "").replace(",", ".")) || 0;

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let totalGeral = 0;

    for (const [tipo, info] of Object.entries(carrinho)) {
      const precoNum = parsePreco(info.preco);
      const totalItem = precoNum * info.quantidade;
      totalGeral += totalItem;

      const li = document.createElement("li");
      li.innerHTML = `
        <span>${tipo} - ${info.preco}</span>
        <span>
          <button class="menos">-</button>
          ${info.quantidade}
          <button class="mais">+</button>
        </span>
      `;

      li.querySelector(".mais").addEventListener("click", () => {
        info.quantidade++;
        atualizarCarrinho();
      });

      li.querySelector(".menos").addEventListener("click", () => {
        info.quantidade--;
        if (info.quantidade <= 0) delete carrinho[tipo];
        atualizarCarrinho();
      });

      listaCarrinho.appendChild(li);
    }

    totalCarrinhoEl.textContent = `Total: R$ ${totalGeral
      .toFixed(2)
      .replace(".", ",")}`;

    const temItens = Object.keys(carrinho).length > 0;
    notificacao.style.display = temItens ? "block" : "none";
    barraPedido.style.display = temItens ? "flex" : "none";
  }

  // Adicionar item ao carrinho
  document.querySelectorAll(".bt-action-add").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pastelDiv = btn.closest(".pastel");
      const tipo = pastelDiv.querySelector(".tipo-pastel").innerText.trim();
      const preco = pastelDiv.querySelector(".preco").innerText.trim();

      if (!carrinho[tipo]) {
        carrinho[tipo] = { preco, quantidade: 1 };
      } else {
        carrinho[tipo].quantidade++;
      }
      atualizarCarrinho();
    });
  });

  // =======================
  // MODAL DO PEDIDO
  // =======================
  enviarPedidoBtn.addEventListener("click", () => {
    modalPedido.style.display = "block";
  });

  cancelarPedidoBtn.addEventListener("click", () => {
    modalPedido.style.display = "none";
  });

  confirmarPedidoBtn.addEventListener("click", () => {
    const endereco = document.getElementById("endereco").value.trim();
    const pagamento = document.getElementById("pagamento").value.trim();

    if (!endereco) {
      alert("Por favor, preencha o endereço!");
      return;
    }

    let mensagem = "Olá! Gostaria de pedir:\n";
    let totalGeral = 0;

    for (const [tipo, info] of Object.entries(carrinho)) {
      const precoNum = parsePreco(info.preco);
      const totalItem = precoNum * info.quantidade;
      totalGeral += totalItem;
      mensagem += `• ${info.quantidade}x ${tipo} - ${
        info.preco
      } | Total: R$ ${totalItem.toFixed(2).replace(".", ",")}\n`;
    }

    mensagem += `\nTotal Geral: R$ ${totalGeral
      .toFixed(2)
      .replace(".", ",")}\n`;
    mensagem += `Endereço: ${endereco}\n`;
    mensagem += `Pagamento: ${pagamento}`;

    const whatsappURL = `https://wa.me/5511958347430?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(whatsappURL, "_blank");

    // Limpa carrinho
    for (let key in carrinho) delete carrinho[key];
    atualizarCarrinho();
    modalPedido.style.display = "none";
  });
})();

document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // previne o comportamento padrão do href
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 150; // distância do topo
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // animação suave
      });
    }
  });
});