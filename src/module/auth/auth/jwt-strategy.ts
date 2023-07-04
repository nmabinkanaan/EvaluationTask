import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        //as we said there is npothing from 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'sdfghjknm2345678ioujghfdvcx@#$%^&*()thfbcv',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name,
      tenant: 'Noufk',
    };
  }
}