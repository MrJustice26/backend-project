import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = new Post();
    post.title = createPostDto.title;
    post.body = createPostDto.body;
    post.creator = createPostDto.creator;
    return this.postRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOneBy({id});
  }

  update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = new Post();
    post.body = updatePostDto.body;
    post.title = updatePostDto.title;
    post.id = id;
    post.updatedAt = new Date().toISOString();
    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete({id});
  }
}
