import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';


@Module({
  imports: [AuthModule, BlogModule],
  providers: [PrismaService],
})
export class AppModule { }