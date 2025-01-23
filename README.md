Bot de Pedidos para Whatsapp
Este projeto é um bot de pedidos automatizado para WhatsApp, desenvolvido utilizando Node.js e whatsapp-web.js. O bot permite que os clientes façam pedidos de pizza de forma interativa e eficiente.

Funcionalidades
Geração de QR Code: Autenticação fácil no WhatsApp Web.
Gestão de Pedidos: Gerencia o estado dos pedidos, permitindo interações dinâmicas.
Interação em Tempo Real: Responde a mensagens e guia o cliente através do processo de pedido.
Confirmação e Correção de Pedidos: Permite que os clientes confirmem ou corrijam detalhes do pedido.
Escalabilidade: Configurado para lidar com múltiplos pedidos simultâneos.
Tecnologias Utilizadas
Node.js: Plataforma de desenvolvimento.
whatsapp-web.js: Integração com o WhatsApp Web.
qrcode-terminal: Geração de QR Codes no terminal.
Instalação
Clone o repositório:

git clone https://github.com/seu-usuario/whatsapp-order-bot.git
cd whatsapp-order-bot
Instale as dependências:

npm install whatsapp-web.js
npm install qrcode-terminal
Inicie o bot:

node bot.js
Escaneie o QR Code gerado no terminal com o WhatsApp Web.

Uso
Início da Conversa: O bot saúda o cliente e pergunta se ele gostaria de fazer um pedido.
Escolha de Tamanho e Sabor: O cliente escolhe o tamanho e o sabor da pizza através de opções numéricas.
Resumo do Pedido: O bot fornece um resumo do pedido e pergunta se o cliente deseja adicionar mais itens.
Correção de Pedidos: Se necessário, o cliente pode corrigir o tamanho ou o sabor da pizza antes de finalizar o pedido.
Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Espero que isso ajude! Se precisar de mais alguma coisa, estou à disposição.
