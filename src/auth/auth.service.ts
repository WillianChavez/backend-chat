import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  auth(user: string, password: string): boolean {

    return true;
  }
}
