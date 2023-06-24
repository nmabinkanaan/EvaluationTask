import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  Testing():number{
    return this.appService.multi();
  }
  @Get('/something')
  getSomething(): string{
    return this.appService.getSomething();
  }
  
}
