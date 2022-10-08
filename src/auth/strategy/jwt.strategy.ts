import { IPayloadToken } from './../interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from '../../database/database.service';
import { excludeField } from 'src/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private database: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: IPayloadToken) {
    const user = await this.database.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    // Tive que colocar esse if pq se não quebrava a aplicação qdo resetava o banco
    // Se utilizasse um token antigo
    if (user) excludeField(user, 'password');
    return user;
  }
}
