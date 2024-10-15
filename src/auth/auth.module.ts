import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    forwardRef(() =>UserModule),
    JwtModule.register({
      secret:process.env.SECRET_KEY || "defult",
      signOptions:{expiresIn:"1h"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
