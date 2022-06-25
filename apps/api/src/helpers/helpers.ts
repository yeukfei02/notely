import jwt from 'jsonwebtoken';

export const authorize = (token: string) => {
  let authorizeStatus = false;

  if (token) {
    const decoded = jwt.verify(token, process.env['JWT_SECRET']) as any;
    console.log('decoded = ', decoded);
    if (decoded && decoded.id && decoded.email) {
      authorizeStatus = true;
    }
  }

  return authorizeStatus;
};
