import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomNotFoundException } from 'src/common/exceptions/custom-not-found.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) { }

    async getBlogs() {
        // filter only public blogs
        return this.prisma.blog.findMany({ where: { isPublic: true } });
    }

    async createBlog(data: any, userId: number) {
        return this.prisma.blog.create({
            data: { ...data, authorId: userId },
        });
    }

    async updateBlog(id: number, data: any, userId: number) {

        const blog = await this.prisma.blog.findUnique({ where: { id } });

        if (!blog) {
            throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
        }

        if (blog.authorId !== userId) {
            throw new HttpException('You are not authorized to update this blog', HttpStatus.UNAUTHORIZED);
        }

        return this.prisma.blog.updateMany({
            where: { id, authorId: userId },
            data,
        });
    }

    async deleteBlog(id: number, userId: number) {

        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) {
            throw new CustomNotFoundException(`Blog with ID ${id} not found`);
        }

        if (blog.authorId !== userId) {
            throw new Error('You are not authorized to delete this blog');
        }

        return this.prisma.blog.delete({ where: { id } });
    }

    async searchPublicBlogs(title: string) {
        console.log(title);
        return this.prisma.blog.findMany({
            where: { isPublic: true, title: { contains: title, mode: 'insensitive' } },
        });
    }

    async getBlog(id: number) {
        return this.prisma.blog.findUnique({ where: { id, isPublic: true } });
    }
}
