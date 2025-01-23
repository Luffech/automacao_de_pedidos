const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();
client.setMaxListeners(20); 

let pedidos = {};

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message_create", async (message) => {
  const lowerCaseMessage = message.body.toLocaleLowerCase();
  const chatId = message.from;

  if (!pedidos[chatId]) {
    pedidos[chatId] = { estado: "inicio", itens: [] };
  }

  const estado = pedidos[chatId].estado;
  const tamanhos = { 1: "Pequeno", 2: "Médio", 3: "Grande" };
  const sabores = {
    1: "Mussarela",
    2: "Calabresa",
    3: "Portuguesa",
    4: "Frango com Catupiry",
    5: "Quatro Queijos",
  };

  if (/oi|olá|boa|bom/.test(lowerCaseMessage) && estado === "inicio") {
    await client.sendMessage(
      chatId,
      "Olá! Seja bem-vindo. Você gostaria de fazer um pedido?\n1. Sim\n2. Não"
    );
    pedidos[chatId].estado = "esperando_confirmacao";
  } else if (message.body === "1" && estado === "esperando_confirmacao") {
    await client.sendMessage(
      chatId,
      "Qual tamanho?\n1. Pequeno\n2. Médio\n3. Grande"
    );
    pedidos[chatId].estado = "esperando_tamanho";
  } else if (
    ["1", "2", "3"].includes(message.body) &&
    estado === "esperando_tamanho"
  ) {
    pedidos[chatId].itens.push({ tamanho: message.body });
    await client.sendMessage(
      chatId,
      "Qual sabor?\n1. Mussarela\n2. Calabresa\n3. Portuguesa\n4. Frango com Catupiry\n5. Quatro Queijos"
    );
    pedidos[chatId].estado = "esperando_sabor";
  } else if (
    ["1", "2", "3", "4", "5"].includes(message.body) &&
    estado === "esperando_sabor"
  ) {
    pedidos[chatId].itens[pedidos[chatId].itens.length - 1].sabor =
      message.body;
    let pedido = `Pizza ${
      tamanhos[pedidos[chatId].itens[pedidos[chatId].itens.length - 1].tamanho]
    } de ${
      sabores[pedidos[chatId].itens[pedidos[chatId].itens.length - 1].sabor]
    }`;
    await client.sendMessage(
      chatId,
      `Você pediu uma ${pedido}. Deseja outra pizza?\n1. Sim\n2. Não`
    );
    pedidos[chatId].estado = "esperando_outra_pizza";
  } else if (message.body === "1" && estado === "esperando_outra_pizza") {
    await client.sendMessage(
      chatId,
      "Qual tamanho?\n1. Pequeno\n2. Médio\n3. Grande"
    );
    pedidos[chatId].estado = "esperando_tamanho";
  } else if (message.body === "2" && estado === "esperando_outra_pizza") {
    let resumoPedido = pedidos[chatId].itens
      .map((p) => `Pizza ${tamanhos[p.tamanho]} de ${sabores[p.sabor]}`)
      .join("\n");
    await client.sendMessage(
      chatId,
      `Seu pedido:\n${resumoPedido}\nEstá correto?\n1. Sim\n2. Não`
    );
    pedidos[chatId].estado = "esperando_confirmacao_final";
  } else if (message.body === "1" && estado === "esperando_confirmacao_final") {
    await client.sendMessage(
      chatId,
      "Obrigado! Você será direcionado para um funcionário para escolher acompanhamentos e bebidas e finalizar o pagamento."
    );
    delete pedidos[chatId];
  } else if (message.body === "2" && estado === "esperando_confirmacao_final") {
    await client.sendMessage(
      chatId,
      "Qual parte do pedido está errada?\n1. Tamanho\n2. Sabor"
    );
    pedidos[chatId].estado = "esperando_correcao";
  } else if (
    ["1", "2"].includes(message.body) &&
    estado === "esperando_correcao"
  ) {
    if (message.body === "1") {
      await client.sendMessage(
        chatId,
        "Qual tamanho correto?\n1. Pequeno\n2. Médio\n3. Grande"
      );
      pedidos[chatId].estado = "corrigindo_tamanho";
    } else if (message.body === "2") {
      await client.sendMessage(
        chatId,
        "Qual sabor correto?\n1. Mussarela\n2. Calabresa\n3. Portuguesa\n4. Frango com Catupiry\n5. Quatro Queijos"
      );
      pedidos[chatId].estado = "corrigindo_sabor";
    }
  } else if (
    ["1", "2", "3"].includes(message.body) &&
    estado === "corrigindo_tamanho"
  ) {
    pedidos[chatId].itens[pedidos[chatId].itens.length - 1].tamanho =
      message.body;
    let novoResumoPedido = pedidos[chatId].itens
      .map((p) => `Pizza ${tamanhos[p.tamanho]} de ${sabores[p.sabor]}`)
      .join("\n");
    await client.sendMessage(
      chatId,
      `Seu pedido atualizado:\n${novoResumoPedido}\nEstá correto?\n1. Sim\n2. Não`
    );
    pedidos[chatId].estado = "esperando_confirmacao_final";
  } else if (
    ["1", "2", "3", "4", "5"].includes(message.body) &&
    estado === "corrigindo_sabor"
  ) {
    pedidos[chatId].itens[pedidos[chatId].itens.length - 1].sabor =
      message.body;
    let novoResumoPedido = pedidos[chatId].itens
      .map((p) => `Pizza ${tamanhos[p.tamanho]} de ${sabores[p.sabor]}`)
      .join("\n");
    await client.sendMessage(
      chatId,
      `Seu pedido atualizado:\n${novoResumoPedido}\nEstá correto?\n1. Sim\n2. Não`
    );
    pedidos[chatId].estado = "esperando_confirmacao_final";
  } else if (message.body === "2" && estado === "esperando_confirmacao") {
    await client.sendMessage(
      chatId,
      "Entendi, para outros assuntos além de pedidos, por favor, entre em contato com xxxxx-xxxxx."
    );
    delete pedidos[chatId];
  }
});

client.initialize();

