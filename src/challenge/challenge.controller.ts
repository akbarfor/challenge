import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import {   Challenge, Gender } from './challenge.model';
import { ChallengeService } from './challenge.service';
import { GetChallengeStatusFilterDto } from './dto/get-challenge-filter.dto';
import { updateChallangeStatusDto } from './dto/update-challange.dto';

@Controller('challenge')
export class ChallengeController {
    constructor(private challengeService : ChallengeService){

    }

    // @Get()
    // getAllTask() : Challenge[]{
    //     return this.challengeService.getAllChl();
    // }

    @Get()
    getChallenge(@Query() filterDto : GetChallengeStatusFilterDto) : Challenge[] {
        if(Object.keys(filterDto).length){
            return this.challengeService.getChallangeWithFilter(filterDto);
        }else{
            return this.challengeService.getAllChallenge();
        }
    }

    @Delete('/:id')
    deleteChallange(@Param('id') id : string) : void{
        return this.challengeService.deleteChallenge(id);
    }

    @Patch('/:id')
    updateChallengeStatus(  @Param('id')id:string,
        // @Body('gender')gender:Gender,
        // @Body('fullname')fullname:string,
        // @Body('moto')moto:string,
        // @Body('cv')cv:string): Challenge{
        //     return this.challengeService.updateChallengeStatus(id, gender,fullname,moto,cv)
      
        @Body() updateChallangeStatusDto: updateChallangeStatusDto) : Challenge{
            const {gender, fullname, moto, cv} = updateChallangeStatusDto;
            return this.challengeService.updateChallengeStatus(id, gender, fullname, moto, cv);
        }
        
    
    @Post()
    createChallenge(@Body() createChalllengeDto : CreateChallengeDto) : Challenge{
        return this.challengeService.createChallenge(createChalllengeDto);
    }

    @Get('/:id')
    getChallengeById(@Param('id')id : string) : Challenge{
        return this.challengeService.getChallengeById(id);
    }

}


