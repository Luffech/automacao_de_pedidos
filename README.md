# Bot de Pedidos para WhatsApp  

Este projeto é um bot automatizado para pedidos via WhatsApp, desenvolvido com **Node.js** e **whatsapp-web.js**. Ele permite que clientes façam pedidos de pizza de forma interativa e eficiente.  

---

## **Funcionalidades**  
- **Geração de QR Code**: Autenticação rápida e fácil no WhatsApp Web.  
- **Gestão de Pedidos**: Controle dinâmico do estado dos pedidos.  
- **Interação em Tempo Real**: Responde automaticamente às mensagens e guia o cliente no processo de pedido.  
- **Confirmação e Correção de Pedidos**: Permite que o cliente confirme ou corrija detalhes do pedido antes de finalizar.  
- **Escalabilidade**: Suporte para múltiplos pedidos simultaneamente.  

---

## **Tecnologias Utilizadas**  
- **Node.js**: Plataforma de desenvolvimento.  
- **whatsapp-web.js**: Biblioteca para integração com o WhatsApp Web.  
- **qrcode-terminal**: Geração de QR Codes diretamente no terminal.  

---

## **Instalação**  

1. **Clone o repositório:**  
   ```bash  
   git clone https://github.com/seu-usuario/whatsapp-order-bot.git  
   cd whatsapp-order-bot  
Instale as dependências:

bash
Copiar
npm install whatsapp-web.js  
npm install qrcode-terminal  
Inicie o bot:

bash
Copiar
node bot.js  
Escaneie o QR Code gerado no terminal utilizando o WhatsApp Web.

Uso
Início da Conversa:
O bot cumprimenta o cliente e pergunta se ele deseja fazer um pedido.

Escolha de Tamanho e Sabor:
O cliente escolhe o tamanho e o sabor da pizza utilizando opções numéricas.

Resumo do Pedido:
O bot apresenta um resumo do pedido e pergunta se o cliente deseja adicionar mais itens.

Correção de Pedidos:
Caso necessário, o cliente pode corrigir os detalhes do pedido antes de finalizá-lo.
