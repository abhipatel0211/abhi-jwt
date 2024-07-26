const crypto = require("crypto");

const base64url = (source) => {
  return source
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const encode_jwt = (secret, id, payload, ttl) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const currentTime = Math.floor(Date.now() / 1000);
  const claims = {
    ...payload,
    sub: id,
    exp: ttl ? currentTime + ttl : undefined,
    iat: currentTime,
  };

  const headerBase64 = base64url(Buffer.from(JSON.stringify(header)));
  const claimsBase64 = base64url(Buffer.from(JSON.stringify(claims)));

  const signatureBase64 = base64url(
    crypto
      .createHmac("sha256", secret)
      .update(`${headerBase64}.${claimsBase64}`)
      .digest()
  );

  return `${headerBase64}.${claimsBase64}.${signatureBase64}`;
};

const decode_jwt = (secret, jwt) => {
  const [headerBase64, claimsBase64, signatureBase64] = jwt.split(".");

  if (!headerBase64 || !claimsBase64 || !signatureBase64) {
    throw new Error("Invalid JWT format");
  }

  const header = JSON.parse(
    Buffer.from(headerBase64, "base64").toString("utf-8")
  );
  const claims = JSON.parse(
    Buffer.from(claimsBase64, "base64").toString("utf-8")
  );

  const validSignatureBase64 = base64url(
    crypto
      .createHmac("sha256", secret)
      .update(`${headerBase64}.${claimsBase64}`)
      .digest()
  );

  if (signatureBase64 !== validSignatureBase64) {
    throw new Error("Invalid signature");
  }

  return {
    id: claims.sub,
    payload: claims,
    expires_at: new Date(claims.exp * 1000),
  };
};

const validate_jwt = (secret, jwt) => {
  try {
    const decoded = decode_jwt(secret, jwt);
    return decoded.expires_at > new Date();
  } catch {
    return false;
  }
};

module.exports = { encode_jwt, decode_jwt, validate_jwt };
