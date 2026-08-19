curl -Ss --json \
'{
    "cep_origem": "96020360",
    "cep_destino": "01018020",
    "peso": 100000,
    "comprimento": 11,
    "altura": 17,
    "largura": 11, 
    "valor_seguro": 10,
    "quantidade": 1
}' localhost:3333/frete | jq .