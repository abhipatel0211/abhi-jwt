
# abhi-jwt

A simple Node.js utility for creating, decoding, and validating JSON Web Tokens (JWTs) using HMAC SHA-256.

## Installation

To install the package, run:

```bash
npm install abhi-jwt
```
OR
```bash
npm i abhi-jwt
```

## Usage

### Encode a JWT

```javascript
const { encode_jwt } = require('abhi-jwt');

const secret = 'your-256-bit-secret';
const id = 'user-id';
const payload = { name: 'John Doe' };
const ttl = 3600; // time to live in seconds

const token = encode_jwt(secret, id, payload, ttl);
console.log('JWT:', token);
```

### Decode a JWT

```javascript
const { decode_jwt } = require('abhi-jwt');

const token = 'your-jwt-token';

try {
  const decoded = decode_jwt(secret, token);
  console.log('Decoded JWT:', decoded);
} catch (error) {
  console.error('Error decoding JWT:', error.message);
}
```

### Validate a JWT

```javascript
const { validate_jwt } = require('abhi-jwt');

const token = 'your-jwt-token';

const isValid = validate_jwt(secret, token);
console.log('Is JWT valid?', isValid);
```

## API

- **`encode_jwt(secret, id, payload, ttl)`**: Creates a JWT.
- **`decode_jwt(secret, jwt)`**: Decodes and verifies a JWT.
- **`validate_jwt(secret, jwt)`**: Checks if a JWT is valid and not expired.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.


### Summary:

- **Installation**: Explains how to install the package.
- **Usage**: Provides examples of how to use the functions.
- **API**: Describes the available functions.
- **License**: References the Apache License 2.0 and directs users to the `LICENSE` file for full details.
