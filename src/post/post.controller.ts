import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UpdateLikePostDto } from './dto/update-like-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PageOptionsDto } from 'src/meta/dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Get all posts. You can use take and skip query params to paginate.',
  })
  @ApiQuery({ name: 'take', required: false, type: 'number' })
  @ApiQuery({ name: 'skip', required: false, type: 'number' })
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.postService.findAll(pageOptionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get post by id.' })
  findOne(@Param('id') id: number) {
    return this.postService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update post by id.' })
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete post by id.' })
  remove(@Param('id') id: number) {
    return this.postService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/like')
  @ApiOperation({ summary: 'Like post by id.' })
  like(@Param('id') id: number, @Body() updateLikePostDto: UpdateLikePostDto) {
    return this.postService.likePost(id, updateLikePostDto.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/unlike')
  @ApiOperation({ summary: 'Like post by id.' })
  unlike(
    @Param('id') id: number,
    @Body() UpdateLikePostDto: UpdateLikePostDto,
  ) {
    return this.postService.unlikePost(id, UpdateLikePostDto.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/comments')
  @ApiOperation({ summary: 'Get all comments by post id.' })
  getComments(@Param('id') id: number) {
    return this.postService.getComments(id);
  }
}
