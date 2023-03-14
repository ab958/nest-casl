import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getHello(): any {
    return "helo world"
  }
 
  async getPic(): Promise<any> {
  }
}