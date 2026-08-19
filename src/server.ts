import { app } from "./app.js";

// Define a função assíncrona responsável por inicializar o servidor
const start = async () => {
  try {
    // Inicia o servidor HTTP escutando na porta 3333
    app.listen(3333, () => {
      // Exibe uma mensagem no console confirmando a execução do servidor
      console.log(`Server is running on port: 3333`);
    });
  } catch (error) {
    // Captura qualquer erro ocorrido durante a inicialização e exibe no console
    console.error(error);
    // Encerra a aplicação com código de falha (1) caso ocorra um erro fatal
    process.exit(1);
  }
};

// Executa a função para ligar o servidor
start();

