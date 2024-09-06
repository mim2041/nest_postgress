import { Prisma } from "@prisma/client";


export class Blog implements Prisma.BlogCreateInput{
    id: number;
    title: string;
    content: string;
    author: Prisma.UserCreateNestedOneWithoutBlogsInput;
    authorId?: number;
    isPublic: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}