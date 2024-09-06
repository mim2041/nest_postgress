import { Controller, Post, Get, Delete, Param, Body, UseGuards, Query, Request, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Get()
    getBlogs() {
        return this.blogService.getBlogs();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() body: any, @Request() req) {
        return this.blogService.createBlog(body, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any, @Request() req) {
        return this.blogService.updateBlog(+id, body, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string, @Request() req) {
        return this.blogService.deleteBlog(+id, req.user.id);
    }

    @Get('search')
    search(@Query('title') title: string) {
        return this.blogService.searchPublicBlogs(title);
    }

    @Get(':id')
    getPublicBlog(@Param('id') id: string) {
        return this.blogService.getBlog(+id);
    }
}
