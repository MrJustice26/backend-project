import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({summary: 'Create new comment.'})
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all comments.'})
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get comment by id.'})
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update comment by id.'})
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete comment by id.'})
  remove(@Param('id') id: number) {
    return this.commentService.remove(+id);
  }
}
