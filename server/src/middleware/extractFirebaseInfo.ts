import { logger } from 'firebase-functions';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';


// if (!admin.apps.length) {
//     admin.initializeApp();
// }

const extractFirebaseInfo = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Validating firebase token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            if (decodedToken) {
                res.locals.firebase = decodedToken;
                res.locals.fire_token = token;
                console.log(decodedToken, "decoded token name is firebase"  )
                console.log(token, "firebase_token")
            
                next();
            } else {
                logger.warn('Token invalid - Unauthorized');
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        } catch (error) {
            logger.error(error);
            return res.status(401).json({
                error,
                message: 'Unauthorized'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

export default extractFirebaseInfo;
