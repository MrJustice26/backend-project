import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllPostQueryDto } from './dto/get-all-post-query.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly userService: UserService
  ) {}

  async create(createPostDto: CreatePostDto) {

    const user = await this.userService.findOne(createPostDto.creator);
    if(!user){
      return new BadRequestException('User not found')
    }

    const post = new Post();
    post.title = createPostDto.title;
    post.body = createPostDto.body;
    post.creator = createPostDto.creator;
    post.comments = [];

    this.userService.addPostToUser(createPostDto.creator, post);
    return this.postRepository.save(post);
  }

  findAll(getAllPostQueryDto: GetAllPostQueryDto): Promise<Post[]> {
    const DEFAULT_OFFSET = 0;
    const DEFAULT_LIMIT = 15;

    let limit = DEFAULT_LIMIT
    let offset = DEFAULT_OFFSET
    if(getAllPostQueryDto?.limit !== undefined) {
      limit = getAllPostQueryDto.limit;
    }
    if(getAllPostQueryDto?.offset !== undefined) {
      offset = getAllPostQueryDto.offset;
    }
    return this.postRepository.find({relations: ['comments', 'creator'], skip: offset, take: limit});
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: {id},
      relations: ['comments', 'creator']
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOneBy({id});
    if(!post){
      new BadRequestException('Post not found');
    }

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
