// jwt.test.js
const { encode_jwt, decode_jwt, validate_jwt } = require("./index");

describe("JWT Functions", () => {
  const secret = "supersecret";
  const userId = "user123";
  const payload = { role: "admin" };
  const ttl = 3600;

  let jwt;

  beforeAll(() => {
    jwt = encode_jwt(secret, userId, payload, ttl);
  });

  test("encode_jwt should create a valid JWT", () => {
    expect(jwt).toBeDefined();
    expect(typeof jwt).toBe("string");
    expect(jwt.split(".")).toHaveLength(3);
  });

  test("decode_jwt should decode the JWT correctly", () => {
    const decoded = decode_jwt(secret, jwt);
    expect(decoded.id).toBe(userId);
    expect(decoded.payload.role).toBe(payload.role);
    expect(decoded.payload.iat).toBeDefined();
    expect(decoded.expires_at).toBeInstanceOf(Date);
  });

  test("decode_jwt should throw an error for an invalid JWT", () => {
    const invalidJwt = jwt + "invalid";
    expect(() => decode_jwt(secret, invalidJwt)).toThrow("Invalid signature");
  });

  test("validate_jwt should return true for a valid JWT", () => {
    const isValid = validate_jwt(secret, jwt);
    expect(isValid).toBe(true);
  });

  test("validate_jwt should return false for an expired JWT", () => {
    const expiredJwt = encode_jwt(secret, userId, payload, -1);
    const isValid = validate_jwt(secret, expiredJwt);
    expect(isValid).toBe(false);
  });

  test("validate_jwt should return false for an invalid JWT", () => {
    const invalidJwt = jwt + "invalid";
    const isValid = validate_jwt(secret, invalidJwt);
    expect(isValid).toBe(false);
  });
});
