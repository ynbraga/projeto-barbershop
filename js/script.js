console.log("JS Conectado");

// Evento para aba do carrinho;
const cartIcon = document.getElementById("cartIcon");
const cartPainel = document.getElementById("cartPainel");
const closeCart = document.getElementById("closeCart");

cartIcon.addEventListener("click", () => {
  cartPainel.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartPainel.classList.remove("open");
});

// Evento para selecionar e mudar nome do botão;
const services = document.querySelectorAll(".btnService");
const cartServices = document.getElementById("cartServices");

let selectedServices = [];

// Alert ao clicar em produto similar
const conflicts = {
  Barba: ["Barba Terapia", "Cabelo e Barba"],
  "Barba Terapia": ["Cabelo e Barba", "Barba"],

  Cabelo: ["Cabelo e Barba", "Corte + Hidratação"],
  "Cabelo e Barba": ["Cabelo", "Barba", "Corte + Hidratação", "Barba Terapia"],
  "Corte + Hidratação": ["Cabelo", "Cabelo e Barba"],
};

services.forEach((service) => {
  service.addEventListener("click", () => {
    const name = service.dataset.service;
    const img = service.dataset.img;

    const exists = selectedServices.some((s) => s.name === name);

    // Validação de conflitos
    const hasConflict = selectedServices.some((s) =>
      conflicts[name]?.includes(s.name),
    );

    if (hasConflict) {
      alert("Combinação similares!");
      return;
    }

    if (exists) {
      selectedServices = selectedServices.filter((s) => s.name !== name);
      service.textContent = "Selecionar";
      service.classList.remove("selected");
    } else {
      selectedServices.push({ name, img });
      service.textContent = "Remover";
      service.classList.add("selected");
    }

    renderCart();
  });
});

// Função para exibir itens no carrinho;
function renderCart() {
  cartServices.innerHTML = "";

  if (selectedServices.length === 0) {
    cartServices.innerHTML = "<p>Nenhum serviço adicionado</p>";
    return;
  }

  selectedServices.forEach((service) => {
    console.log(service);
    const wrapper = document.createElement("div");
    wrapper.classList.add("cart-item");

    const img = document.createElement("img");
    img.src = service.img;
    img.alt = service.img;

    const name = document.createElement("p");
    name.textContent = service.name;

    wrapper.appendChild(img);
    wrapper.appendChild(name);
    cartServices.appendChild(wrapper);
  });
}

// Função para enviar pro whatsapp

const sendOrder = document.getElementById("sendOrder");
const nameCliente = document.getElementById("nameCliente");
const date = document.getElementById("date");

function generateWhatsappMessage() {
  const validateUser = nameCliente.value.trim();
  const validateDate = date.value.trim();

  if (validateUser.length === 0) {
    alert("Prencha o nome, por favor");
    return null;
  } else if (validateDate.length === 0);{
    alert("Preencha a data, por favor");
  }

  if (selectedServices.length === 0) {
    alert("Escolha pelo menos 1 serviço");
    return null;
  }

  let message =  `Olá! Me chamo ${validateUser}%0A`

  message += "Gostaria de agendar os seguintes serviços:%0A%0A"

  selectedServices.forEach((s) => {
    message += `${s.name}%0A`;
  });

  message += `%0APara a data: ${validateDate}`
  message += "%0AObrigado";
  return message;
}

sendOrder.addEventListener("click", () => {
  const message = generateWhatsappMessage();
  if (!message) return;

  const phone = "557998921906";
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");

  selectedServices = [];
  renderCart();
});

console.log(generateWhatsappMessage());
