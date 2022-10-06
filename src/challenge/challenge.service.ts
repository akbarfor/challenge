import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid } from 'uuid';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Gender, Challenge } from './challenge.model';
import { GetChallengeStatusFilterDto } from './dto/get-challenge-filter.dto';


@Injectable()
export class ChallengeService {
    private challenge : Challenge[] = [];

    getAllChallenge(){
        return this.challenge;
    }

    getChallangeWithFilter(filterDto : GetChallengeStatusFilterDto) : Challenge[]{
        const {gender, search} = filterDto;
        
        let challenge = this.getAllChallenge();

        
        if(gender){
            challenge = challenge.filter((challenge) => challenge.gender === gender)
        }

        //seleksi untuk search
        if(search){
            challenge = challenge.filter((challenge) => {

                if(challenge.fullname.includes(search) 
                || challenge.moto.includes(search)){
                    return true;
                }
                
                return false;
            });
        }

        return challenge;


    }

    // CreateTask(createChlDto : CreateChlDto): Challenge{

    //     const{
    //         fullname, 
    //         moto, 
    //         cv, 
    //     } = createChlDto;
        
    //     const task : Challenge = {
    //         id:uuid(),
    //         fullname,
    //         moto,
    //         cv,
    //         gender: ChlStatus.PRIA
    //     };
    //     this.challenge.push(task);
    //     return task;
    // }
// }

createChallenge(createChallengeDto : CreateChallengeDto): Challenge{

    const{
        fullname, moto, cv
    } = createChallengeDto;
    
    const challenge : Challenge = {
        id:uuid(),
        fullname,
        moto,
        cv,
        gender: Gender.PRIA
    };
    this.challenge.push(challenge);
    return challenge;
}

getChallengeById(id: string) : Challenge{
    // return this.challenge.find((challenge) => challenge.id === id)

    const found = this.challenge.find((challenge) => challenge,id === id);
    if(!found){
        throw new NotFoundException('Task not found');
    }
    return found;
}

deleteChallenge(id:string) : void{
    const found = this.getChallengeById(id);
    this.challenge = this.challenge.filter((challenge) => challenge.id !== found.id)


    // this.challenge = this.challenge.filter((challenge) => challenge.id !== id);
}

updateChallengeStatus (id:string, gender: Gender, fullname:string, moto: string, cv: string){
    const challenge = this.getChallengeById(id);
    challenge.gender = gender;
    challenge.fullname = fullname;
    challenge.moto = moto;
    challenge.cv = cv;
    return challenge;
}

}