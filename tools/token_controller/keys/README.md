# Token Controller Key Management

> ⚠️ **CRITICAL SECURITY NOTE**: Never commit RSA private keys (`private.pem`) or public keys (`public.pem`) to source control.

## RSA Keypair Generation Commands

To generate an RSA keypair for minting and verifying agent capability tokens:

```bash
# 1. Generate 2048-bit RSA Private Key
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048

# 2. Extract Public Key in PEM format
openssl rsa -pubout -in private.pem -out public.pem

# 3. Export as Environment Variables for Local Operations
export CONTROLLER_PRIVATE_KEY="$(cat private.pem)"
export CONTROLLER_PUBLIC_KEY="$(cat public.pem)"
```
