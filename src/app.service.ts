import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  multi():number{
    return 5*4;
  }
  getSomething(): string{
    return 'anothe hello';
  }
}
