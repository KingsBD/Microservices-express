import jwt, { VerifyOptions, SignOptions } from 'jsonwebtoken';
/**
 * @Description: Verify if the Token is valid
 * @param {String} sbToken
 */
const verifyToken = (sbToken: string) => {
  try {
    /* ====================   JWT Verify ===================== */
    const sbPublicKey = JSON.parse(`"${process.env.TOKEN_PUBLIC_KEY}"`);
    const obVerifyOptions: VerifyOptions = {
      algorithms: ['HS256'],
      maxAge: '24h',
    };
    jwt.verify(sbToken, sbPublicKey, obVerifyOptions);
  } catch (error) {
    throw new Error('Not authorized');
  }
};

/**
 * @Description: generate a Token
 */
const generateToken = () => {
  try {
    /*
			====================   JWT Signing =====================
		*/
    const sbPrivateKey = JSON.parse(`"${process.env.TOKEN_PRIVATE_KEY}"`);
    /* Payload */
    const obPayload = {
      application: 'skm',
    };
    const obSignOptions: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '24h',
    };
    const sbToken = jwt.sign(obPayload, sbPrivateKey, obSignOptions);
    return sbToken;
  } catch (error) {
    throw new Error('Error: The token could not be generated.');
  }
};

export { verifyToken, generateToken };
