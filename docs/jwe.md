                      🔐 JWE (JSON Web Encryption)

          ┌────────────────────────────────────────┐
          │        payload (dados sensíveis)       │
          └────────────────────────────────────────┘
                            │
                            ▼ criptografa com:
                      🔑 chave pública (encrypt)
                            │
                            ▼
                   📦 token JWE (string)
                            │
                            ▼ descriptografa com:
                      🔐 chave privada (decrypt)
                            │
                            ▼
                   🔄 payload original
