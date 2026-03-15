import { FirestoreData } from '../firestore-data-model';
import { userService } from './user.service';
import { sessionService } from './session.service';
import * as bcrypt from 'bcrypt';

class AuthService {
  async signIn(credentials: any): Promise<{ user: FirestoreData.User; session: FirestoreData.Session } | null> {
    const user = await userService.getUserByEmail(credentials.email);

    if (user && await bcrypt.compare(credentials.password, user.password)) {
      const session = await sessionService.createSession(user.id);
      if (session) {
        return { user, session };
      }
    }

    return null;
  }

  async signOut(sessionToken: string): Promise<void> {
    await sessionService.deleteSession(sessionToken);
  }

  async getUserSession(req: any): Promise<any> {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const session = await sessionService.getSession(token);
      return session;
    }
    return null;
  }
}

export const authService = new AuthService();
